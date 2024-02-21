import axios from "axios"
const { showToast, TOAST_STATUS } = require("../util");

export const getAllShowByTheatreId = async (theatreID)=>{
    try {
        const response = await axios.get(`/api/show/getShowByTheatreId/${theatreID}`);
        
        return response.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
   
}

export const getShowById = async(showID)=>{
    try {
        const response = await axios.get(`/api/show/getShowById/${showID}`);
        
        return response.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
    
}

export const getAllShowByMovieId = async (movieID,date)=>{
    try {
        const response = await axios.post("/api/show/getShowByMovieId/",{movieID,date});
        
        return response.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
   
}

export const getAllShows = async ()=>{
    try {
        const response = await axios.get("/api/show/getAllShows");
        
        return response.data.data;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
   
}

export const editShow =  async(editShowDetails)=>{
    console.log(editShowDetails);
    
    try {
        const response = await axios.put("/api/show/updateShow",editShowDetails);
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
    
}

export const deleteShow =  async(id)=>{
   
    try {
        const response = await axios.post("/api/show/deleteShow",{_id:id})
        
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Somthing went wrong")
    }
}

export const addShow = async (showDetails)=>{
    try {
        const response = await axios.post("/api/show/addShow",showDetails)
        
        return response.data
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Somthing went wrong")
    }
}