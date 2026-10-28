import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fetures/auth/auth.slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});