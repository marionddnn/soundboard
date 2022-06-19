import { View, Button, Text, Linking, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { addAuth } from "./authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
    const navigation = useNavigation();
    const [code, setCode] = React.useState("");
    const [enter, setEnter] = React.useState(false);
    const dispatch = useDispatch();

    function redirectToFreeSound() {
        let url = "https://freesound.org/apiv2/oauth2/authorize/?client_id=FvKhzzSJMOLJVoRtxlvh&response_type=code";
        Linking.openURL(url);
        setEnter(true);
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
        .then(response => dispatch(addAuth(response.data.access_token)))
        .then(navigation.navigate('Sampler'));
    }

    return (
        <View style={{flexDirection : "column", justifyContent:"center", alignItems:"center", marginTop : "5%"}}>
            <Text style={{marginBottom : "2%"}}> You need to get a code to download sounds on freesound : </Text>
            <Button title="Get code" onPress={redirectToFreeSound}/>
            <TextInput
            onChangeText={setCode}
            value ={code}
            style={{backgroundColor:"#fff", width : "100%", padding : "1%"}}
            placeholder="Paste the code"/>
            <Button color="#1DA878" title="Validate and go to sampler" onPress={addCodeAuth}/> 
        </View>
    );
  };

export default Login;