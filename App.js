import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Sampler from "./components/Sampler";
import {MainNavigation} from "./components/Navigation";
import store from "./store";
import { Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist';
import * as FS from "expo-file-system";

let persistor = persistStore(store);
FS.makeDirectoryAsync(FS.documentDirectory + "mySounds");

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigation/>
      </PersistGate>
    </Provider>
  );
}
