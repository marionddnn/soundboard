import { View, Button, Text, Linking, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { addAuth } from "./authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";


const Home = () => {
    const navigation = useNavigation();
    const [code, setCode] = React.useState("");
    const dispatch = useDispatch();
    const [resp, setResp] = React.useState();

    function redirectToFreeSound() {
        let url = "https://freesound.org/apiv2/oauth2/authorize/?client_id=FvKhzzSJMOLJVoRtxlvh&response_type=code";
        Linking.openURL(url);
    }

    async function addCodeAuth() {
        await axios.post(`https://freesound.org/apiv2/oauth2/access_token/`, 
        {}, 
        { 
            params: 
            {
                client_id : "FvKhzzSJMOLJVoRtxlvh",
                client_secret : "7yIIC44NakzVpJCMw5lgGNUX9XAmL7BlrBWB6XNl",
                grant_type : "authorization_code",
                code : code
            }
        })
        .then(response => dispatch(addAuth(response.data.access_token)));
    }

    return (
        <View style={{flexDirection : "column", justifyContent:"center", alignItems:"center"}}>
            <Text> Welcome ! </Text>
            <Button title="See my sampler" onPress={() => 
                (navigation.navigate({
                    name :"Sampler"
                }))}>
            </Button>
            <Button title="Authenticate to download sounds" onPress={redirectToFreeSound}/>
            <TextInput
            onChangeText={setCode}
            value ={code}
            style={{backgroundColor:"#fff", width : "100%", padding : "1%"}}
            placeholder="Enter the code after authentication"/>
            <Button title="Valider le code" onPress={addCodeAuth}/>
        </View>
    );
  };

export default Home;