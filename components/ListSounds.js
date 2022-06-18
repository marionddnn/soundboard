import { View, Button, Text, ScrollView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteSoundToList, listSelector } from "./listSlice";
import { Audio } from 'expo-av';
import React from "react";
import { useEffect, useState } from "react";
import * as FS from "expo-file-system";
import { addSoundToSampler } from "./samplerSlice";

const ListSounds = () => {
    const list = useSelector(listSelector);
    const dispatch = useDispatch();
    const [sound, setSound] = React.useState();

    async function playSoundLocal(item){

        const { sound } = await Audio.Sound.createAsync(
            item.src
         );
         setSound(sound);
         await sound.playAsync(); 
    }

    async function playSoundUri(item){
       const { sound } = await Audio.Sound.createAsync(
            {uri : item.uri}
         );
         setSound(sound);
         await sound.playAsync(); 
    }

    async function playSound(item) {
       
        item.uri  ? playSoundUri(item) : playSoundLocal(item);
        console.log('Loading Sound');
    }

    const chooseSound = (item) => {
        let obj = item.src ? {id : item.id, src : item.src} : {id : item.id, uri : item.uri};
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
        <ScrollView>
        <FlatList
            data={list}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
            <View style={{  padding : "4%" }}>
                <Text style={{  padding : "2%", marginRight : "1%", backgroundColor: "#FFF" }}>Nom : {item.name}</Text>
                <Text style={{  padding : "2%", marginRight : "1%", backgroundColor: "#FFF" }}>id : {item.id}</Text>
                <Text style={{  padding : "2%", marginRight : "1%", backgroundColor: "#FFF" }}>username : {item.username}</Text>
                <View style={{  padding : "4%" }}>
                    <Text style={{  marginRight : "1%", borderStyle : "solid", borderColor : "black", borderTopWidth : 1, backgroundColor: "grey", padding : "0.2%" }}> Tags </Text>
                    {[...item.tags].map((tag) => { 
                        return (<Text style={{  marginRight : "1%", border : "1px solid tranparent", backgroundColor: "lightgrey", padding : "1%" }}>- {tag}</Text>);
                    })}
                </View>
                <Button color="#A81816" onPress={()=> {deleteSound(item)}} title="delete this sound"/>
                <View>
                    <Button color="#1677A8" title="Play Sound" onPress={()=>{playSound(item)}} />
                    <Button color="#1DA878" title="choose this sound" onPress={()=>{chooseSound(item)}}/>
                </View>
            </View>
            }
        />
     </ScrollView>
    );
  };

export default ListSounds;