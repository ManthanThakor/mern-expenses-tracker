import { createSlice } from "@reduxjs/toolkit";

// Load user from local storage if available
const storedUser = JSON.parse(localStorage.getItem("userInfo"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? storedUser : null, // Initialize with stored user if available
  },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      // Save user to local storage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      // Remove user from local storage
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
