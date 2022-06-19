import { View, Button, Text, ScrollView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteSoundToList, listSelector } from "./listSlice";
import { Audio } from 'expo-av';
import React from "react";
import { useEffect, useState } from "react";
import * as FS from "expo-file-system";
import { addSoundToSampler, samplerSelector } from "./samplerSlice";
import { useNavigation } from "@react-navigation/native";

const ListSounds = () => {
    const list = useSelector(listSelector);
    const dispatch = useDispatch();
    const [sound, setSound] = React.useState();
    const sampler = useSelector(samplerSelector);
    const actual = sampler.currentModify;
    const navigation = useNavigation();

    async function playSound(item) {
        // local sounds needs a require to be played : there are two distinct properties to separate them (item.uri for downloaded sounds / item.src for local sounds)
        let src = item.uri  ? {uri : item.uri}  : item.src;
        const { sound } = await Audio.Sound.createAsync(
           src
        );
        setSound(sound);
        await sound.playAsync(); 
    }

    const chooseSound = (item) => {
        let obj = item.src ? {id : actual, src : item.src} : {id : actual, uri : item.uri};
        dispatch(addSoundToSampler(obj));
    }
        
    const deleteSound = (item) => {
        dispatch(deleteSoundToList(item));
    }

    React.useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);

    return (
        <View>
        <Text> My list </Text>
        {/* display sound's list */}
        <FlatList
            data={list}
            ListHeaderComponent={
                <ScrollView>
                </ScrollView>
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
            <View style={{  padding : "4%" }}>
                <Text style={{  padding : "2%", marginRight : "1%", backgroundColor: "#FFF" }}>Nom : {item.name}</Text>
                <Text style={{  padding : "2%", marginRight : "1%", backgroundColor: "#FFF" }}>id : {item.id}</Text>
                <Text style={{  padding : "2%", marginRight : "1%", backgroundColor: "#FFF" }}>username : {item.username}</Text>
                <View style={{  padding : "4%" }}>
                    <Text style={{  marginRight : "1%", borderStyle : "solid", borderColor : "black", borderTopWidth : 1, backgroundColor: "grey", padding : "0.2%" }}> Tags </Text>
                    {//loop on the sound's tags and display them
                    [...item.tags].map((tag, nb) => { 
                        return (<Text key={nb} style={{  marginRight : "1%", backgroundColor: "lightgrey", padding : "1%" }}>- {tag}</Text>);
                    })}
                </View>
                <Button color="#A81816" onPress={()=> {deleteSound(item)}} title="delete this sound"/>
                <View>
                    <Button color="#1677A8" title="Play Sound" onPress={()=>{playSound(item)}} />
                    <Button color="#1DA878" title="Choose this sound"  onPress={() => (chooseSound(item),
                        navigation.navigate({
                            name :"Sampler"
                        })
                    )}/>
                </View>
            </View>
            }
        />
     </View>
    );
  };

export default ListSounds;