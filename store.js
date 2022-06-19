import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
import listReducer from "./components/listSlice";
import authReducer from "./components/authSlice";
import samplerReducer from "./components/samplerSlice";
import filterReducer from "./components/filterSlice";

const reducers = combineReducers(
  { 
      list : listReducer,
      auth : authReducer,
      sampler : samplerReducer,
      filter : filterReducer
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
