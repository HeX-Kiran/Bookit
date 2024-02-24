import axios from "axios"


const { showToast, TOAST_STATUS } = require("../util");


export const makeShowPayment = async(token,amount)=>{
    try {
        const response = await axios.post("/api/booking/make-payment",{token,amount});
        return response;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
    }
}


export const bookAShow = async(payload)=>{
   
    try {
        const response = await axios.post("/api/booking/book-show",payload);
        return response;
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong");
    }
}