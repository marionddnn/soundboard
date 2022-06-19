import { View, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Modify = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={{fontSize : 24, color : "grey", textAlign : "center", marginTop : "5%"}}> Change my sample </Text>
            <View style={{flexDirection : "row", flexWrap : "wrap", justifyContent:"space-around", marginTop : "5%"}}>
                <View>
                    <Text style={{color : "#1677A8", fontSize : 18, textAlign : "center", marginBottom : "3%"}}> new sample </Text>
                    <Button title="record a sound"></Button>
                    <Button color="#1677A8" title="search on freesound" onPress={() => 
                        (navigation.navigate({
                            name :"SearchSounds"
                        }))}></Button>
                    <Button color="#1677A8" title="open my sounds" onPress={() =>
                        (navigation.navigate({
                            name :"ListSounds"
                        }))}>
                    </Button>
                </View>
                <View>
                    <Text style={{color : "#1677A8", fontSize : 18, textAlign : "center", marginBottom : "3%"}}>modify the sound</Text>
                    <Button title="modify"></Button>
                </View>
            </View>
        </View>
    );
  };

export default Modify;