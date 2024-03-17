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
        const response = await axios.get(`/api/show/getShowById/${showID}`);
        return response.data;
}

export const getAllShowByMovieId = async (movieID,date)=>{
   
        const response = await axios.post("/api/show/getShowByMovieId/",{movieID,date});
        
        return response.data;
    
      
   
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
    
    

        const response = await axios.put("/api/show/updateShow",editShowDetails);
        return response.data
   
    
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