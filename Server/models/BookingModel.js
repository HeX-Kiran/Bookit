const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    show:{
        type:mongoose.Types.ObjectId,
        ref:"shows",
        required:[true,"show id is mandatory"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:[true,"User id is mandatory"]
    },
    transactionId :{
        type:String,
        required:[true,"Transaction id is mandatory"]
    },
    bookedSeats:{
        type:Array,
        required:[true,"booked seat are mandatory"]
    }
    
},{timestamps: true})


const Booking = mongoose.model("bookings",bookingSchema);

module.exports = Booking;
