import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: [
    {id : "1", nom : "test", src : "clap_2.wav", username : "test nom", tags : "test 1"}
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