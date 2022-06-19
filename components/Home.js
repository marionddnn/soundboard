import { View, Button, Text, Linking, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import * as FS from "expo-file-system";


const Home = () => {
    const navigation = useNavigation();

    async function createDir(){
        const dirExist = await FS.getInfoAsync(FS.documentDirectory + "Sounds");
        if(dirExist.exists === false){
          FS.makeDirectoryAsync(FS.documentDirectory + "Sounds");
        }
    }

    React.useEffect(() => {
        createDir();
      }, []);

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