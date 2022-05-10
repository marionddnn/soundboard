import { View, ScrollView, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Modify = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={{fontSize:"1rem"}}> Change my sample </Text>
            <View style={{flexDirection : "row", flexWrap : "wrap", justifyContent:"space-around"}}>
                <View>
                    <Text>new sample</Text>
                    <Button title="record a sound"></Button>
                    <Button title="search on freesound"></Button>
                    <Button title="open my sounds" onPress={() => 
                        (navigation.navigate({
                            name :"ListSounds"
                        }))}>
                    </Button>
                </View>
                <View>
                    <Text>modify the sound</Text>
                    <Button title="modify"></Button>
                </View>
            </View>
        </View>
    );
  };

export default Modify;