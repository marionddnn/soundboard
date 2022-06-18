import { View, ScrollView, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentModify, samplerSelector } from "./samplerSlice";
import { Audio } from 'expo-av';

const Sampler = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const sampler = useSelector(samplerSelector);
    const [sound, setSound] = React.useState();

    function setCurrent (el) {
      dispatch(setCurrentModify(el));
    }

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

    function playMySound(el){
      if(sound){
        sound.unloadAsync();
        }
      let current = sampler.samplers[el];
      current.uri  ? playSoundUri(current) : playSoundLocal(current);
      console.log('Loading Sound');
    }

    return (
        <View style={{flexDirection : "row", flexWrap : "wrap", justifyContent:"center"}}>
            {[...Array(15)].map((i, el) => (
                 <Pressable
                 onLongPress={() => (setCurrent(el),
                  navigation.navigate({ //stock in store the current pad
                    name :"Modify",
                  }))
                  }
                  onPress={()=>playMySound(el)}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? parseInt(el) % 2 ? "#1677A8" : "orange"
                        : "lightgrey",
                      border: pressed
                        ? "1px solid black"
                        : "none"
                    },
                    {height : 150, width : "30%", margin : 1} 
                    //issue to fix : rem, vw & vh doesn't work on real android device 
                  ]
                }
                 ></Pressable>
            ))}
        </View>
    );
  };

export default Sampler;