import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkMovieDetails } from '../../../util'
import { showLoader,hideLoader } from '../../../store/loadingSlice';
import { editShow,addShow } from '../../../apicalls/shows';
import { showToast,TOAST_STATUS } from '../../../util';

import { getMovies } from '../../../apicalls/movies';

function ShowModal({currShow,type,setIsOpen,setSelectedTheatre,theatreID}) {

    const[name,setName] = useState(currShow?.name || "")
    const[movieID,setMovieID] = useState(currShow?.movie || "")
    const[date,setDate] = useState(currShow.date)
    const[time,setTime] = useState(currShow?.time  );
    const[AMorPM,setAMorPM] = useState(currShow?.AMorPM)
    const[ticketPrice,setTIcketPrice] = useState(currShow?.ticketPrice || 100)
    const[totalSeats,setTotalSeats] = useState(currShow?.totalSeats )

    // state that holds all the movies 
    const [movies,setMovies] = useState([])
    const dispatcher = useDispatch();

    //FUNCTION TO GET ALL THE MOVIES
    const getAllMovies = async()=>{
        try {
            dispatcher(showLoader());
            const data = await getMovies();
            setMovies(data);
            dispatcher(hideLoader());
          } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Internal error")
            dispatcher(hideLoader());
          }
    }


    // FUNCTION TO HANDLE SUBMIT BUTTON
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let showDetails;
        // if type is edit then we need id
        if(type === "edit"){
            showDetails = {_id:currShow._id,name,movie:movieID,time:(time+" "+AMorPM),ticketPrice,totalSeats,bookedSeats:[],theatre:theatreID};
        }
        // if type is add then we dont need id
        else{
            showDetails = {name,movie:movieID,time:(time+" "+AMorPM),ticketPrice,totalSeats,bookedSeats:[],theatre:theatreID};
        }
    
        
        try {
            // check if all the details are entered or not
            if(checkMovieDetails(showDetails)){
                // show loaded
                dispatcher(showLoader());
                // api call to edit movie/add movie
                let response;
                if(type === "edit"){
                     response = await editShow(showDetails);
                }
                else{
                     response = await addShow(showDetails)
                } 
                
                // if response is true then show success message , get the updated value,close the modal box and hide the loader
               
                if(response.success){
                    showToast(TOAST_STATUS.SUCCESS,response.message);
                    setSelectedTheatre(theatreID)
                    setIsOpen(false)
                    dispatcher(hideLoader())
                }
                // if response is false then show error message 
                else{
                    showToast(TOAST_STATUS.ERROR,response.message);
                    dispatcher(hideLoader())
                }
            }
           
        } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Internal error");
        }
        
    }


    // FUNCTION TO HANDLE MODAL CLOSE BUTTON
    const handleClose = ()=>{
        setIsOpen(false);
    }

    useEffect(()=>{
        getAllMovies();
        console.log(movies);
    },[])
   
  return (
    <div className='modal-box absolute left-0 top-0 h-[100vh] w-[100%] transparent z-10'>
        
        <div className='form modal-gradient text-white relative'>
            {type === "add" ? <h1 className='heading text-2xl font-medium uppercase'>Add Show</h1> : <h1 className='heading text-2xl font-medium uppercase'>Edit Show</h1>}
            {/* <button><i className="ri-close-fill text-4xl font-bold absolute right-5 top-5"></i></button> */}
            <form className=' flex flex-col items-center justify-between mt-16 gap-2 text-black' action='' method='post' onSubmit={handleSubmit}>

                        {/* Name */}
                        <div className="input-container">
                        <i className="ri-movie-2-fill icon"></i>
                            <input type='text' placeholder='Show name' className='input-field outline-none p-4  rounded-xl input-border' value={name} onChange={(e)=> setName(e.target.value)}/>
                        </div>
                        {/* movie */}
                        <div className="input-container">
                            <i className="ri-file-text-fill icon"></i>
                            <select value={"select a movie"}>  

                                {
                                    movies.map(movie=><option value={movie.title} /> )
                                }
                                    
                            </select>  
                        </div>

                        
                             {/* time */}
                            <div className='flex items-center gap-8'>
                                <div className="input-container">
                                    <i className="ri-time-line icon"></i>
                                    <input type='number' placeholder='Show time' className='input-field outline-none p-4 rounded-xl input-border w-[200px]' value={time} onChange={(e)=>setTime(e.target.value)}/>
                                </div>
                                <input type='text'  className='input-field outline-none p-4 rounded-xl input-border w-[200px]' value={"AM"} onChange={(e)=>setAMorPM("AM")}/>
                                <input type='text'  className='input-field outline-none p-4 rounded-xl input-border w-[200px]' value={"PM"} onChange={(e)=>setAMorPM("PM")}/>

                            </div>
                           
                            
                            <div className='flex item-center justify-around multi-input gap-2'>
                                    {/* total seats */}
                                    <div className="input-container">
                                    <i className="ri-keyboard-box-fill icon"></i>
                                        <input type='number' placeholder='Total seats' className='input-field outline-none p-4 rounded-xl input-border' value={totalSeats} onChange={(e)=>setTotalSeats(e.target.value)}/>
                                    </div>
                                    {/* ticket price */}
                                    <div className="input-container">
                                        <i className="ri-global-fill icon"></i>
                                        <input type='number' placeholder='Ticket price' className='input-field outline-none p-4 rounded-xl input-border' value={ticketPrice} onChange={(e)=>setTIcketPrice(e.target.value)}/>
                                    </div>
                            </div>
                            
                       
                        {/* Show date */}
                        <div className="input-container">
                            <i class="ri-calendar-schedule-fill icon"></i>
                            <input type='date' placeholder='Show date' className='input-field outline-none p-4 rounded-xl input-border' value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                        </div>
                       
                        
                        
                        
                        <input type='submit' className='p-4 cursor-pointer rounded-full w-[500px] font-bold bg-rose-800 text-white text-xl hover:bg-rose-400 input-border' />
                        <button  className='p-4 cursor-pointer rounded-full w-[500px] font-bold bg-rose-600 text-white text-xl hover:bg-rose-400 input-border' onClick={handleClose}>Cancel</button>
                       
                        

                        
                    </form>
        </div>
        
    </div>
  )
}

export default ShowModal