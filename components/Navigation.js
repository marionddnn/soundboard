import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Home  from "./Home";
import ListSounds from "./ListSounds";
import SearchSounds from './SearchSounds';
import Sampler from "./Sampler";
import Modify from "./Modify"

const Nav = createNativeStackNavigator();

const MainNavigation = () => {

  return (
        <NavigationContainer>
        <Nav.Navigator initialRouteName="Home">
          <Nav.Screen
            name="Accueil"
            component={Home}/>
          <Nav.Screen
            name="Sampler"
            component={Sampler}/>
          <Nav.Screen
            name="Modify"
            component={Modify}/>
          <Nav.Screen
           name="ListSounds"
           component={ListSounds}/>
        <Nav.Screen
           name="SearchSounds"
           component={SearchSounds}/>
        </Nav.Navigator>
        </NavigationContainer>
  );
};

export {MainNavigation};