import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: [
    {"id" : "1", "license" : "undefined", "name" : "clap_1", "src" : require('../assets/sounds/clap_1.wav'), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "2", "license" : "undefined", "name" : "clap_2", "src" : require("../assets/sounds/clap_2.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "3", "license" : "undefined", "name" : "fx_1", "src" : require("../assets/sounds/fx_1.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "4", "license" : "undefined", "name" : "fx_2", "src" : require("../assets/sounds/fx_2.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "5", "license" : "undefined", "name" : "kick_1", "src" : require("../assets/sounds/kick_1.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "6", "license" : "undefined", "name" : "kick_2", "src" : require("../assets/sounds/kick_2.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "7", "license" : "undefined", "name" : "shaker_1", "src" : require("../assets/sounds/shaker_1.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "8", "license" : "undefined", "name" : "shaker_2", "src" : require("../assets/sounds/shaker_2.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "9", "license" : "undefined", "name" : "shaker_3", "src" : require("../assets/sounds/shaker_3.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "10", "license" : "undefined", "name" : "snare_1", "src" : require("../assets/sounds/snare_1.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "11", "license" : "undefined", "name" : "snare_2", "src" : require("../assets/sounds/snare_2.wav"), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "12", "license" : "undefined", "name" : "tom_1", "src" : require('../assets/sounds/tom_1.wav'), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "13", "license" : "undefined", "name" : "tom_2", "src" : require('../assets/sounds/tom_2.wav'), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "14", "license" : "undefined", "name" : "tom_3", "src" : require('../assets/sounds/tom_3.wav'), "username" : "unknown", "tags" : ["undefined"]},
    {"id" : "15", "license" : "undefined", "name" : "tom_4", "src" : require('../assets/sounds/tom_4.wav'), "username" : "unknown", "tags" : ["undefined"]}
  ],
  reducers: {
    addSoundToList: (state, action) => {
      let present = state.map((item) => item.id == action.payload.id ? true : false);
      if(present.includes(true)){
        return state;
      }
      else {
        return [...state, {...action.payload}];
      }
    },
    deleteSoundToList: (state, action) => {
      let newList = state.filter(item => item.id !== action.payload.id);
      return newList;
    }
  }, 
});

export const { addSoundToList, deleteSoundToList } = listSlice.actions;
export const listSelector = (state) => state.list;
export default listSlice.reducer;