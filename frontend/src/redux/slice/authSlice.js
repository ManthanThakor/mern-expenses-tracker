import { createSlice } from "@reduxjs/toolkit";

// Initial State
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  // Reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

// Generate actions
export const { loginAction, logoutAction } = authSlice.actions;

// Generate reducer
const authReducer = authSlice.reducer;

export default authReducer;
