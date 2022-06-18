import { createSlice } from "@reduxjs/toolkit";

const samplerSlice = createSlice({
  name: "sampler",
  initialState: {
        "currentModify" : "",
        "samplers" : [
            {"id" : "0", "src" : require("../assets/sounds/shaker_3.wav")},
            {"id" : "1", "src" : require('../assets/sounds/clap_1.wav')},
            {"id" : "2", "src" : require("../assets/sounds/clap_2.wav")},
            {"id" : "3", "src" : require("../assets/sounds/fx_1.wav")},
            {"id" : "4", "src" : require("../assets/sounds/fx_2.wav")},
            {"id" : "5", "src" : require("../assets/sounds/kick_1.wav")},
            {"id" : "6", "src" : require("../assets/sounds/kick_2.wav")},
            {"id" : "7", "src" : require("../assets/sounds/shaker_1.wav")},
            {"id" : "8", "src" : require("../assets/sounds/shaker_2.wav")},
            {"id" : "9", "src" : require("../assets/sounds/kick_2.wav")},
            {"id" : "10", "src" : require("../assets/sounds/shaker_1.wav")},
            {"id" : "11", "src" : require("../assets/sounds/shaker_2.wav")},
            {"id" : "13", "src" : require("../assets/sounds/clap_2.wav")},
            {"id" : "14", "src" : require("../assets/sounds/fx_1.wav")},
            {"id" : "15", "src" : require("../assets/sounds/fx_2.wav")}
          ]
    },
  reducers: {
    addSoundToSampler: (state, action) => {
      let present = state.samplers.map((item) => item.id == action.payload.id ? action.payload : item);
        return {...state, samplers : present};
    },
    setCurrentModify : (state, action) => {
        return {...state, currentModify : action.payload}
    }
  }, 
});

export const { addSoundToSampler, setCurrentModify } = samplerSlice.actions;
export const samplerSelector = (state) => state.sampler;
export default samplerSlice.reducer;