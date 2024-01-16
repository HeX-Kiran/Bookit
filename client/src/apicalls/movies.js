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
