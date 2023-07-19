import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/global/auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
