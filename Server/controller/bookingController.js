const Booking = require("../models/BookingModel");

require("dotenv").config();
const Stripe = require("stripe")(process.env.STRIPE_KEY);




exports.makePayment = async(req,res)=>{
    try {
        const{token,amount} = req.body;

        const paymentIntent = await Stripe.paymentIntents.create({
            amount,
            currency: 'INR',
        })

        const transactionId = paymentIntent.client_secret;

        res.send({
            success:true,
            message:"Payment successfull",
            data:transactionId
        })

    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
}

exports.bookShow = async(req,res)=>{
    try {
        const {showID,userID,bookedSeats,transactionId} = req.body;

        //check if transaction ID already exsist or not
        const checkTransactionIdAlreadyExsist = await Booking.findOne({transactionId});

        if(checkTransactionIdAlreadyExsist){
            res.send({
                success:false,
                message:"Transaction id already exsist"
            })
        }

        else{
            const tickets = await Booking.create({show:showID,user:userID,transactionId,bookedSeats});
            res.status(201).json({
                success:true,
                message:"Show booked successfully",
            })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
}