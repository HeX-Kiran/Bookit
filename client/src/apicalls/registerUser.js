
import { axiosInstance } from ".";

export const registerUser = async (userDetails)=>{
    try{
        const response = await axiosInstance.post("api/user/register",userDetails)
        return response.data;
    }
    catch(e){
        console.log(e);
    }
    
}

