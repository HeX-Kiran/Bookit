import axios from "axios";


export const axiosInstance = axios.create({
    headers:{
        credentials: 'include' ,
        'Content-Type' : "application/json",
        method : 'post'
    }
}
    
)