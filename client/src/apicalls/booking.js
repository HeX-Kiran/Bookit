import axios from "axios"


const { showToast, TOAST_STATUS } = require("../util");


export const makeShowPayment = async(token,amount)=>{
    
        const response = await axios.post("/api/booking/make-payment",{token,amount});
        return response;
    
}


export const bookAShow = async(payload)=>{
   
    
        const response = await axios.post("/api/booking/book-show",payload);
        return response;
    
}

export const checkSeats = async(payload)=>{
    
        const response = await axios.post("/api/booking/book-show/check-seat-available",payload);
        return response;
    
}

export const getTickets = async(id)=>{
    
    try {
        const response = await axios.get(`/api/booking/get-booking-by-userid/${id}`)
        return response
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong");
    }
}