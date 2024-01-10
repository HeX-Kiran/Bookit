import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import loadingSlice from "./loadingSlice"
const store = configureStore({
    reducer:{
        user : userReducer,
        loader:loadingSlice
    }
})


export default store