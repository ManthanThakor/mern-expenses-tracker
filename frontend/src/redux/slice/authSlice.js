import { createSlice } from "@reduxjs/toolkit";
// Load user from local storage if available
const storedUser = JSON.parse(localStorage.getItem("userInfo"));
//!Initial State
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? storedUser : null, // Initialize with stored user if available
  },
  //1 Reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      // Save user to local storage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    //Logout
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});
//! Generate actions
export const { loginAction, logoutAction } = authSlice.actions;
//! Generate the reducers
const authReducer = authSlice.reducer;
export default authReducer;
