

import axios from "axios";
import { axiosInstance } from ".";
import { TOAST_STATUS, showToast } from "../util";

export const registerUser = async (userDetails)=>{
    try{
        const response = await axios.post("api/user/register",userDetails);
       
        return response.data;
    }
    catch(e){
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
    
}

export const loginUser = async(userDetails)=>{
    try{
        
        const response = await axios.post("api/user/login",userDetails);
        
        return response.data;
    }
    catch(e){
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}

export const getcurrUser = async(token)=>{
    
    try {
       
        const response = await axios.get("/api/user/currentUser",{headers:{Authorization:`Bearer ${token}` }});
        return response.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
    

    
}


export const validateAdmin = async(userDetails)=>{
    try{
        
        const response = await axios.post("api/user/login/admin",userDetails);
        
        return response.data;
    }
    catch(e){
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}

export const resetPassword = async(email)=>{
    try {
        const response = await axios.post("/api/user/login/reset-password",{userEmail:email});
        
        return response.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}

export const updatePassword = async(userData)=>{
    try {
        const response = await axios.post("/api/user/login/update-password",userData);
        
        return response.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}


