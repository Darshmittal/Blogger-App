
//Redux store configuration file  

import { createSlice, configureStore } from "@reduxjs/toolkit";

//creates a slice of the store called "auth".
const authSlice = createSlice({
  name: "auth",

  //boolean value for "isLogin" that is initially set to false. 
  initialState: {
    isLogin: false,
  },

  //defines two actions for the store, "login" and "logout",
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

// "authActions" variable exports the action creators created by "createSlice"
export const authActions = authSlice.actions;

// "configureStore" function is used to create the store
export const store = configureStore({
  reducer: authSlice.reducer,
});
