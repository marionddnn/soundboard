import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Sampler = () => {
    let color = "grey";
    const navigation = useNavigation();

    return (
        <View style={{flexDirection : "row", flexWrap : "wrap", justifyContent:"center"}}>
            {[...Array(15)].map((i, el) => (
                 <Pressable
                 onLongPress={() => navigation.navigate({
                    name :"Modify",
                  })
                  }
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? 'white'
                        : color,
                      border: pressed
                        ? "1px solid black"
                        : "none"
                    },
                    {height : 150, width : "30%", margin : 1} 
                    //issue to fix : rem, vw & vh doesn't work on real android device 
                  ]}
                 ></Pressable>
            ))}
        </View>
    );
  };

export default Sampler;