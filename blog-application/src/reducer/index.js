import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import profileReducer from './profileSlice';
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
})

export default rootReducer;