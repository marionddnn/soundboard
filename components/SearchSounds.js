import { View, Text, Button, FlatList, TextInput, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addSoundToList } from "./listSlice";
import { Audio } from 'expo-av';
import React from "react";



const Search = () => {
    const baseUrl = "https://freesound.org/apiv2/search/text/?query=";
    const token = "7yIIC44NakzVpJCMw5lgGNUX9XAmL7BlrBWB6XNl";
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [sound, setSound] = React.useState();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const getSound= () => {
        const sounds =  Audio.Sound.createAsync(
        { uri: baseUrl + search + token },
        { shouldPlay: true }
      );
    }

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
        dispatch(addSoundToList(item));
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