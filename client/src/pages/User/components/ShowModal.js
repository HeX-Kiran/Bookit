import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkMovieDetails } from '../../../util'
import { showLoader,hideLoader } from '../../../store/loadingSlice';
import { editShow,addShow } from '../../../apicalls/shows';
import { showToast,TOAST_STATUS } from '../../../util';

import { getMovies } from '../../../apicalls/movies';
import modelImg from "../../../assets/images/show.png"

function ShowModal({currShow,type,setIsOpen,setSelectedTheatre,theatreID,setRender}) {

    const[name,setName] = useState(currShow?.name || "")
    const[movieID,setMovieID] = useState(currShow?.movie || "")
    const[date,setDate] = useState(currShow.date)
    const[time,setTime] = useState(currShow?.time  );
    const[AMorPM,setAMorPM] = useState(currShow?.AMorPM ||"AM")
    const[ticketPrice,setTIcketPrice] = useState(currShow?.ticketPrice )
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
            setMovieID(data[0]._id)
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
            showDetails = {_id:currShow._id,name,movie:movieID,time:(time+" "+AMorPM),ticketPrice,totalSeats,bookedSeats:[],theatre:theatreID,date};
        }
        // if type is add then we dont need id
        else{
            showDetails = {name,movie:movieID,time:(time+" "+AMorPM),ticketPrice,totalSeats,bookedSeats:[],theatre:theatreID,date};
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
                    setRender(state=>!state)
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
        setIsOpen(false)
    }

    //FUNCTION TO HANDLE AM / PM  CLICK

    const handleAmPm = ()=>{
        setAMorPM(state=>{
            if(state === "AM")setAMorPM("PM")
            else setAMorPM("AM")
        })
    }

    useEffect(()=>{
        getAllMovies();
        
    },[])
   
  return (
    <div className='show-modal-box modal-box absolute left-0 top-0 h-[100vh] w-[100%] transparent z-10'>
       
        {/* Grid */}
        <div className='registration-grid grid grid-cols-2 items-start justify-between '>

         
         

            {/* Grid-item-1 */}
            <div className='brand-img px-10 py-10  flex flex-col items-start justify-between gap-20 bg-violet-200 h-[100%]'> 
                {/* Brand name */}
                <h1 className='uppercase font-brand text-5xl text-violet-800 font-medium tracking-widest'>bookit</h1>
                {/* A short desc */}
                <h1 className='font-bold text-3xl text-violet-800 w-[100%] leading-tight'>One step <span className='text-violet-500'>towards your big dream</span></h1>
                {/* Login illustration */}
                <img src={modelImg} alt='Login illustration' className='w-[300px] h-[300px]'/>
            </div>

            {/* Grid item 2 */}
            <form className='theatre-reg-form px-16 py-10   flex flex-col items-center justify-around bg-violet-50  h-[100%]' action='#' method='post' onSubmit={handleSubmit} >

                <div className='brand-title inline-block'>
                    <h1 className='text-5xl font-bold text-violet-800'>{type === "add" ? <h1 className='heading text-2xl font-medium uppercase'>Add Show</h1> : <h1 className='heading text-2xl font-medium uppercase'>Edit Show</h1>}</h1>
                    {/* <h3 className=' text-lg text-violet-400 font-medium text-center mt-2'>Show details</h3> */}
                </div>

                <div  className='flex flex-col items-center my-8 gap-8'  >

                        {/* Name */}
                        <div className="input-container">
                            <i className="ri-movie-2-fill icon"></i>
                            <input type='text' placeholder='Show name' className='input-field outline-none p-1  rounded-3xl input-border' value={name} onChange={(e)=> setName(e.target.value)}/>
                        </div>

                        {/* time */}
                        <div className='flex items-center gap-8'>
                            
                             <div className='input-container'>
                                <i className="ri-time-line icon"></i>
                                <input type='text' placeholder='Show time' className='input-field outline-none p-4 rounded-xl input-border w-[100px]' value={time} onChange={(e)=>setTime(e.target.value)}/>

                            </div>   
                            
                            <div className= 'am-pm outline-none p-1 rounded-xl input-border'  onClick={handleAmPm}>{AMorPM}</div>

                        </div>

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

                        {/* Show date */}
                        <div className="input-container">
                            <i class="ri-calendar-schedule-fill icon"></i>
                            <input type='date' placeholder='Show date' className='input-field outline-none p-4 rounded-xl input-border' value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                        </div>

                        {/* movie */}
                        <div className=" flex items-center gap-4">

                            <label htmlFor="movies" className='text-lg'>Select a movie:</label>
                            <select  name= "movies" id="movies" className='bg-violet-200 font-bold' onChange={(e)=>setMovieID(e.target.value)}>  
                            

                                {
                                    movies.map(movie=><option value={movie._id} key={movie._id}>{movie.title}</option> )
                                }
                                    
                            </select>  
                        </div>
                        
                        <input type='submit' className='p-4 cursor-pointer rounded-full  w-[500px] font-bold text-white text-xl bg-rose-500 transition-all hover:scale-110 ' value={"submit"}></input>
                        
                        
                    </div>
                </form>
        </div>
    </div>
        
        
    
  )
}

export default ShowModal