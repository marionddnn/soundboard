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

    async function stopSound(){
      if(sound){
        await sound.unloadAsync();
      }
    }

    async function playMySound(el){
    stopSound();
    let current = sampler.samplers[el];
    let src =  current.uri  ? {uri : current.uri}  : current.src;
    const { sound } = await Audio.Sound.createAsync(
      src
    );
    setSound(sound);
    await sound.playAsync(); 
    console.log('Loading Sound');
    }

    function returnColor(el) {
      let colorArray = ["#B64ED9", "#1677A8", "#E67157", "#E6CA44", "#E64A6C", "#F04F42", "#1677A8", "#E6B245", "#E64A6C", "#86BFF0", "#61E6B6", "#E67157", "#B64ED9", "#E64790", "#86BFF0"]
      return colorArray[el];
    }

    return (
        <View style={{flexDirection : "row", flexWrap : "wrap", justifyContent:"center"}}>
            {[...Array(15)].map((i, el) => (
                 <Pressable
                 key={el}
                 onLongPress={() => (setCurrent(el),
                  navigation.navigate({ 
                    name :"Modify",
                  }))
                  }
                  onPress={()=>playMySound(el)}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? returnColor(el)
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