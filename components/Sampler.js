import { View, ScrollView, Pressable } from "react-native";
import { NavigationModify } from "./Navigation";
import { useNavigation } from "@react-navigation/native";


const Sampler = () => {
    let color = "grey";
    const navigation = useNavigation();

    const openModify = () => {
        
    }

    return (
        <View style={{flexDirection : "row", flexWrap : "wrap"}}>
            {[...Array(15)].map((i, el) => (
                 <Pressable
                 onPress={() => {openModify, navigation.navigate({
                    name :"Modify"
                })} //onLongPress = pressage long
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
                    {height : "31vw", width : "31vw", margin : "1.1vw"}
                  ]}
                 ></Pressable>
            ))}
        </View>
    );
  };

export default Sampler;