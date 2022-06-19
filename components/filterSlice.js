import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: [],
  reducers: {
    filter: (state, action) => {
        let list = action.payload.list;
        //filter the list and return only objects which have the property passed in action.payload.prop
        let newList = list.filter(item => item.hasOwnProperty(action.payload.prop));
        return newList;
    }
  }, 
});

export const { filter } = filterSlice.actions;
export const filterSelector = (state) => state.filter;
export default filterSlice.reducer;