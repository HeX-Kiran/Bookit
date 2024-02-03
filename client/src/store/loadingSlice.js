import { createSlice } from "@reduxjs/toolkit";



const loadingSlice = createSlice({
    name:"loader",
    initialState:{
        status: true
    },
    reducers:{
        showLoader(state){
            //show loader
         
             state.status = true
        },

        hideLoader(state){
            //hide loader
            
             state.status = false;
        }
    }
})

export const {showLoader,hideLoader} = loadingSlice.actions;
export default loadingSlice.reducer