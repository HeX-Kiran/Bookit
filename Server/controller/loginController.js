const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.validateUser = async(req,res)=>{
    const userDetails = req.body;
    

    try {

        //check if email is present or not
        const validUser = await Users.findOne({email:userDetails.email})
        
        if(validUser){
            
            //get the password from the DB
            const hashedPassword = validUser.password;
            //if present then check verify the password 
            const verifyPassword = await bcrypt.compare(userDetails.password,hashedPassword);
            
            //if password is correct then send a jwt token and a success response
            if(verifyPassword){
                //create a jwt token
                const token = jwt.sign({userId:validUser.id},process.env.JWT_SECRET);
                return res.status(200).json({
                    success:true,
                    message :"Successfully logged in",
                    data:{
                        token
                    }
                })
            }
            
            //else send a invalid password response
            else{
               
                return res.status(200).json({
                    success:false,
                    message:"Incorrect Password",

                })
            }
        }
        //else return an error response
        else{
            
            return res.status(200).json({
                success:false,
                message:"No user found",
            })
        }
        
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Internal server error occured",
            error: error.message
        })
    }
    
}