import { View, Text, Button, FlatList, TextInput, Pressable, PermissionsAndroid, ScrollView, Linking } from "react-native";
import { useState } from "react";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addSoundToList } from "./listSlice";
import { Audio } from 'expo-av';
import React from "react";
import * as FS from "expo-file-system";
import { authSelector} from "./authSlice";
import { useSelector } from "react-redux";

const Search = () => {

    FS.makeDirectoryAsync(FS.documentDirectory + "Sounds");
  

    const baseUrl = "https://freesound.org/apiv2/search/text/?query=";
    const token = "7yIIC44NakzVpJCMw5lgGNUX9XAmL7BlrBWB6XNl";
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [sound, setSound] = React.useState();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const auth = useSelector(authSelector);

    async function playSound(id) {
      let r = await (await fetch("https://freesound.org/apiv2/sounds/"+ id + "/?token=" + token)).json();
      const uri = r.previews["preview-hq-mp3"];
      console.log(auth);
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

    async function addSound (item) {
      let r = await (await fetch("https://freesound.org/apiv2/sounds/"+ item.id + "/?token=" + token)).json();
      //console.log(r);
      console.log("auth" + auth);
        const {uri} = await FS.downloadAsync(
          r.download,
          FS.documentDirectory + "Sounds/" + item.id + ".wav",
          {
            headers : { 'Authorization': 'Bearer ' + auth }
          }
        );
        
        const fileInfo = await FS.getInfoAsync(FS.documentDirectory + "Sounds/" + item.id + ".wav");
        const newItem = {...item, uri : fileInfo.uri};
        dispatch(addSoundToList(newItem));
    }

    return (
      <ScrollView>
      <TextInput
        onSubmitEditing={research}
        onChangeText={setSearch}
        style={{backgroundColor:"#fff", width : "100%", margin : "1%"}}
        value ={search}
        placeholder="Search on freesound"/>
        <Button color="#1DA878" onPress={research} title="Search"></Button>
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
                <Button color="#1677A8" title="Play Sound" onPress={()=>{playSound(item.id)}}/>
                </Pressable>
               
            </View>
        }
        >
        </FlatList>
      </ScrollView>
      
    );
  };

export default Search;