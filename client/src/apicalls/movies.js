import axios from "axios";
import { axiosInstance } from ".";
const { showToast, TOAST_STATUS } = require("../util");


export const getMovies = async()=>{
    try {
        const response = await axios.get("api/movie/getAllMovies");
        
        return response.data.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}

export const deleteMovie = async(id)=>{
   
    try {
        const response = await axios.post("api/movie/deleteMovie",{_id:id})
        
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Somthing went wrong")
    }
}

export const editMovie = async(editedMovieDetails)=>{
    console.log(editedMovieDetails);
    try {
        const response = await axios.put("api/movie/updateMovie",editedMovieDetails);
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
    
}
