import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TOAST_STATUS = {
    SUCCESS :"success",
    WARNING:"warning",
    ERROR :"error",
    INFO :"info",
    DEFAULT :"default"
}

export const THEATRE_STATUS = {
    ACTIVE :"active",
    PENDING:"pending",
    REJECTED :"rejected"
    
}

export const THEATRE_PAGE_SECTION = {
    DASHBOARD : "dashboard",
    SHOWS :"shows",
    
}

export const showToast = (status,message)=>{

    switch(status){
        case "success" : return toast.success(message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });

        case "error" :  return toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        
        case "info" : return toast.info(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });

        case "warning" : return toast.warning(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        default :  return toast(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    
}


export const checkEmail = (email)=>{
    if(!email) {
        showToast(TOAST_STATUS.ERROR,"Email is mandatory");
        return false;
    } 
    return true;
}

export const checkPassword = (password,confirmPassword)=>{
    if(password.length <8){
        showToast(TOAST_STATUS.ERROR,"Password should atleast have 8 characters");
        return false;
    }
    if(password !== confirmPassword){
         showToast(TOAST_STATUS.ERROR,"Password doest match");
         return false;
    } 

    
    return true;
}

export const checkLoginPassword =(password)=>{
    if(password.length < 8){
        showToast(TOAST_STATUS.ERROR,"Password should atleast have 8 characters");
        return false;
    }

    return true;
}

export const checkMovieDetails = (movieDetails)=>{
    for (let key in movieDetails) {
        
        if(!movieDetails[key]){
            showToast(showToast(TOAST_STATUS.ERROR,`${key} is mandatory`));
            return false;  
        } 
    }
    return true;
}