const Show = require("../models/showModel");

exports.getAllShows = async(req,res)=>{
    try {
        const shows = await Show.find().populate("movie").populate("theatre");

        if(shows){
            res.json({
                success:true,
                message:"Shows fetched successfully",
                data:shows
            })
        }
        else{
            res.json({
                success:false,
                message:"No shows available",
                data:[]
            });
        }
    } catch (error) {
        res.json({
            success:false,
            message:"Internal error",
            data:error.message
        })
    }
}

exports.getShowByTheatreID = async(req,res)=>{
    try {
        const {theatreID} = req.params;
        const shows = await Show.find({theatre:theatreID});
        if(shows){
            res.json({
                success:true,
                message:"Shows fetched successfully",
                data:shows
            })
        }
        else{
            res.json({
                success:false,
                message:"No shows available",
                data:[]
            });
        }
        
    } catch (error) {
        res.json({
            success:false,
            message:"Internal error",
            data:error.message
            
        })
    }
}

exports.getShowsByMovieID = async(req,res)=>{
    try {
        const{movieID,date} = req.body;
        //get all the shows for the particular mmovieID and date
        const shows = await Show.find({movie:movieID,date}).populate("theatre");

        let uniqueTheatre =[];
        //for each show check the theatreID already exsist in the uniqueThetre list
        shows.forEach((show)=>
        {
            //check the uniqueTheatre list if the particular show theatre is present in the unique list
            const theatre = uniqueTheatre.find(theatre=>theatre._id == show.theatre._id)
            // if theatre already present in the unique list then add the show in that theatre 
            // else add the theatre in unique theatre list  with all the shows of that theatre

            if(!theatre){
                const allShowsOfTheatre = shows.filter(eachShow=>{
                    //check all the shows and find the shows with the matching theatre_id
                    eachShow.theatre._id == show.theatre._id
                })

                // now we have all the shows for the particular theatre,add this theatre and shows in unique list

                uniqueTheatre.push({
                    // get all detials of that theatre
                    ...show.theatre._doc,
                      shows:allShowsOfTheatre
                })
            }
        })

        res.json({
            success:true,
            message:"Shows fetched successfully",
            data:uniqueTheatre
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:"Internal error",
            data:error.message
        })
    }
}

exports.updateShow = async(req,res)=>{
    try {
        const updatedShow = req.body
        const id = updatedShow._id;
        delete updatedShow._id

        const show = await Show.findOne({_id:id})
        
        if(show){

            const newShow = Show.findByIdAndUpdate(id,updatedShow)
            res.json({
                success:true,
                message:"Show updated successfully",
                data:updatedShow
            })
        }
        else{
            res.send({
                success:false,
                message:"Show not found"
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

exports.deleteShow = async(req,res)=>{
    try {
        const showDetails = req.body;
        const id = showDetails._id;

        const show = await Show.findOne({_id:id});

        if(show){
            const updatedShow = await Show.findOneAndDelete({_id:id});
            res.status(200).json({
                success:true,
                message:"Show deleted successfully",
                data: updatedShow
            })
        }

        else{
            res.send({
                success:false,
                message:"Show not found"
            })
        }
    } catch (error) {
        res.send({
            success:false,
            message:"Internal error ",
            data:error.message

        })
    }
}