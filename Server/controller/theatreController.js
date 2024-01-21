const Theatre = require("../models/theatreModel");

exports.getAllTheatres = async(req,res)=>{
    try {
        const theatres = await Theatre.find().populate('owner');
        if(theatres) res.status(200).json({
            success:true,
            message:"Theatres fetched successfully",
            data:theatres
        })
        else{
            res.json({
                success:false,
                message:"Something went wrong"
            })
        }
    } catch (error) {
        res.json({
            success:false,
            message:"internal error occured",
            data:error.message
        })
    }
}

exports.addTheatre = async(req,res)=>{
    const theatreDetails = req.body;
    try {

        //check if theatre already exsist
        const theatreAlreadyExsist = await Theatre.findOne({name:theatreDetails.name});
        if(theatreAlreadyExsist){
            // if theatre already exsist
            res.send({
                success:false,
                message:"Theatre already exsist"
            })
        }
        // if theatre doesnt exsist then add it
        else{
                //add theatre into DB
                const newTheatre = await Theatre.create(theatreDetails);
                res.status(201).json({
                    success:true,
                    message:"Theatre added successfully",
                    data: theatreDetails
                })
        }
        
    } catch (error) {
        res.send({
            success:false,
            message:"Internal error occured",
            data:error.message

        })
    }
   
}