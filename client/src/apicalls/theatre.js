import axios from "axios";
import { axiosInstance } from ".";
const { showToast, TOAST_STATUS } = require("../util");


export const getTheatre = async()=>{
    try {
        const response = await axios.get("api/theatre/getAllTheatres");
        
        return response.data.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}

export const deleteTheatre = async(id)=>{
   
    try {
        const response = await axios.post("/api/theatre/deleteTheatre",{_id:id})
        
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Somthing went wrong")
    }
}

export const editTheatre = async(editedTheatreDetails)=>{
    
    
    try {
        const response = await axios.put("/api/theatre/updateTheatre",editedTheatreDetails);
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
    
}

export const addTheatre = async(newTheatre)=>{
    
    try {
        const response = await axios.post("/api/theatre/addTheatre",newTheatre);
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}

export const checkIfTheatreExsist = async(userID)=>{
    try {
        const response = await axios.get(`/api/theatre/checkTheatre/${userID}`)
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}
