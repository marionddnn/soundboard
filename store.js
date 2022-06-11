import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
import listReducer from "./components/listSlice";

const reducers = combineReducers(
  { 
      list : listReducer,
  }
);

const persistConfig = {
  key: "root",
  storage : AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, 
reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
