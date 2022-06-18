import { View, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Sampler = () => {
    const navigation = useNavigation();

    return (
        <View style={{flexDirection : "row", flexWrap : "wrap", justifyContent:"center"}}>
            {[...Array(15)].map((i, el) => (
                 <Pressable
                 onLongPress={() => navigation.navigate({ //stock in store the current pad
                    name :"Modify",
                  })
                  }
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