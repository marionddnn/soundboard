import { View, Button, Text, ScrollView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteSoundToList, listSelector } from "./listSlice";
import { Audio } from 'expo-av';
import React from "react";
import { useEffect, useState } from "react";
import * as FS from "expo-file-system";

const ListSounds = () => {
    const list = useSelector(listSelector);
    const dispatch = useDispatch();
    const [sound, setSound] = React.useState();

    async function playSound(item) {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('../src/clap_2.wav')
        );
        setSound(sound);
        await sound.playAsync(); }

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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
            <View>
                <Text style={{  marginRight : "1%" }}>Nom : {item.name}</Text>
                <Text style={{  marginRight : "1%" }}>id : {item.id}</Text>
                <Text style={{  marginRight : "1%" }}>username : {item.username}</Text>
                <View>
                    <Text style={{  marginRight : "1%", borderTop : "3px solid black", backgroundColor: "lightgrey", padding : "0.2%" }}> Tags </Text>
                    {[...item.tags].map((tag) => { 
                        return (<Text style={{  marginRight : "1%", border : "1px solid tranparent", backgroundColor: "lightgrey", padding : "0.2%" }}>{tag}</Text>);
                    })}
                </View>
                <Button onPress={()=> {deleteSound(item)}} title="supprimer ce son"></Button>
                <View>
                    <Button title="Play Sound" onPress={()=>{playSound(item)}} />
                </View>
            </View>
            }
        />
     </ScrollView>
    );
  };

export default ListSounds;