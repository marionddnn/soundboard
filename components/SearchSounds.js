import { View, Text, Button, FlatList, TextInput, Pressable, PermissionsAndroid, ScrollView, Linking } from "react-native";
import { useState } from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addSoundToList } from "./listSlice";
import { Audio } from 'expo-av';
import React from "react";
import * as FS from "expo-file-system";



const Search = () => {
    
    FS.makeDirectoryAsync(FS.documentDirectory + "Sounds");
    const baseUrl = "https://freesound.org/apiv2/search/text/?query=";
    const token = "7yIIC44NakzVpJCMw5lgGNUX9XAmL7BlrBWB6XNl";
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [sound, setSound] = React.useState();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    async function playSound(id) {
      let r = await (await fetch("https://freesound.org/apiv2/sounds/"+ id + "/?token=" + token)).json();
      const uri = r.previews["preview-hq-mp3"];
      const { sound } = await Audio.Sound.createAsync(
          { uri : uri },
          { shouldPlay: true }
      );
      setSound(sound);
      await sound.playAsync(); 
    }

    React.useEffect(() => {
      return sound
        ? () => {
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);


    const research = async () => {
      let searchSound = await (await fetch(baseUrl + search + "&token=" + token)).json();
      setResults(searchSound);
    }

    const addSound = async (item) => {
      
      let r = await (await fetch("https://freesound.org/apiv2/sounds/"+ item.id + "/?token=" + token)).json();
       
        const downloadResumable = FS.createDownloadResumable(
          r.download,
          FS.documentDirectory + "Sounds/" + item.id + ".wav",
          {},
          callback
        );

        try {
          const { uri } = await downloadResumable.downloadAsync();
        } catch (e) {
          console.error(e);
        }
        
        try {
          await downloadResumable.pauseAsync();
          AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
        } catch (e) {
          console.error(e);
        }
        
        try {
          const { uri } = await downloadResumable.resumeAsync();

        } catch (e) {
          console.error(e);
        }

        const callback = downloadProgress => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          this.setState({
            downloadProgress: progress,
          });
        };
        
        const fileInfo = await FS.getInfoAsync(FS.documentDirectory + "Sounds/" + item.id + ".wav");
        const newItem = {...item, uri : fileInfo.uri};
        dispatch(addSoundToList(newItem));
          console.log(newItem);
    }

    return (
      <ScrollView style={{ flexDirection: "column" }}>
      <TextInput
        onSubmitEditing={research}
        onChangeText={setSearch}
        style={{backgroundColor:"#fff", width : "100%", margin : "1%"}}
        value ={search}
        placeholder="Recherchez un son sur freesound"/>
        <Button onPress={research} title="Rechercher"></Button>
        <FlatList data={results.results}  keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
            <View>
                <Pressable style={{ backgroundColor: "white", padding : "1%", borderBottom : "1px dotted black"}} onPress={() => 
                (addSound(item),
                    navigation.navigate({
                        name :"ListSounds"
                    })
                )}>
                <Text style={{  marginRight : "1%" }}>Nom : {item.name}</Text>
                <Text style={{  marginRight : "1%" }}>id : {item.id}</Text>
                <Button title="Play Sound" onPress={()=>{playSound(item.id)}}/>
                </Pressable>
               
            </View>
        }
        >
        </FlatList>
      </ScrollView>
      
    );
  };

export default Search;