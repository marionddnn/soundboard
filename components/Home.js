import { View, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


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
        </View>
    );
  };

export default Home;