const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")

exports.validateUser = async(req,res)=>{
    
    

    try {
        const userDetails = req.body;

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

exports.validateAdmin = async(req,res)=>{
    try {
        const userDetails = req.body

        //check if email is present or not
        const validUser = await Users.findOne({email:userDetails.email})
        
        if(validUser){
            
            //get the password from the DB
            const hashedPassword = validUser.password;
            //if present then check verify the password 
            const verifyPassword = await bcrypt.compare(userDetails.password,hashedPassword);
            
         
            if(verifyPassword){
               
                return res.status(200).json({
                    success:true,
                    message :"Successfully logged in",
                    data:hashedPassword
                })
            }
            
            //else send a invalid password response
            else{
               
                return res.status(200).json({
                    success:false,
                    message:"Incorrect admin token",

                })
            }
        }
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Internal server error occured",
            error: error.message
        })
    
    }
}

exports.resetPassword = async(req,res)=>{
    try {
       
        const transpoter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAILER_EMAIL,
                pass:process.env.MAILER_PASSWORD
            }
        })

        const mailOptions = {
            from: "bookit.kerala@gmail.com",
            to: 'bookit.kerala@gmail.com',
            subject: 'Reset password',
            text: 'Text Data',
            html: `
             <h1>Sample Heading Here</h1>
             <p>message here</p>
             <a href="http://localhost:3000/theatre">Reset password</a>
            `,
            // attachments: [
            //   {
            //     // filename: 'image.png',
            //     path: 'http://localhost:3000/theatre>'
            //   }
            // ]
          };

          transpoter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch (error) {
        
    }
}