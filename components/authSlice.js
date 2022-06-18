import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: "",
  reducers: {
    addAuth: (state, action) => {
      return action.payload;
    },
  }, 
});

export const { addAuth } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;