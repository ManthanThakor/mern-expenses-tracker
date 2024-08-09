import { createSlice } from "@reduxjs/toolkit";

//!Initial State

const createSlice({
  name:'auth',
  initialState:{
    user:null,
  }
})

//1 Reducers
reducers : {
  loginAction: (state, action) => {
    state.user = action.payload;
  }
}

export default authSlice;
