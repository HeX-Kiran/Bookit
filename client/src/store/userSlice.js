import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{},
    reducers:{
         addUser (state,action){
            return {...state,...action.payload};
        },
        deleteUser(state){
            return {};
        }
    }
})

export const {addUser,deleteUser} = userSlice.actions;
export default userSlice.reducer;