import { View, Button, Text, Linking, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";


const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={{flexDirection : "column", justifyContent:"center", alignItems:"center"}}>
            <Text> Welcome ! </Text>
            <Button title="See my sampler" onPress={() => 
                (navigation.navigate({
                    name :"Sampler"
                }))}>
            </Button>
            <Button title="Download new sounds" onPress={() =>  (navigation.navigate({
                    name :"Login"
                }))}/>
        </View>
    );
  };

export default Home;