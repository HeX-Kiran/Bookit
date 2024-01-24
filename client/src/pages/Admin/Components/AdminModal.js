import React, { useState } from 'react'
import { editMovie,addMovie } from '../../../apicalls/movies'
import { useDispatch,useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../../../store/loadingSlice'
import { TOAST_STATUS, checkMovieDetails, showToast } from '../../../util'



function AdminModal({type,currMovie,getAllMovies,setIsOpen}) {

    const[title,setTitle] = useState(currMovie?.title || "")
    const[description,setDescription] = useState(currMovie?.description || "")
    const[duration,setDuration] = useState(currMovie?.duration )
    const[genre,setGenre] = useState(currMovie?.genre || "")
    const[language,setLanguage] = useState(currMovie?.language || "")
    const[releaseDate,setReleaseDate] = useState(currMovie?.releaseDate)
    const[poster,setPoster] = useState(currMovie?.poster || "")
    const dispatcher = useDispatch();
   
    

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let movieDetails;
        // if type is edit then we need id
        if(type === "edit"){
            movieDetails = {_id:currMovie._id,title,description,duration,genre,language,releaseDate,poster};
        }
        // if type is add then we dont need id
        else{
            movieDetails = {title,description,duration,genre,language,releaseDate,poster};
        }
    
        
        try {
            // check if all the details are entered or not
            if(checkMovieDetails(movieDetails)){
                // show loaded
                dispatcher(showLoader());
                // api call to edit movie/add movie
                let response;
                if(type === "edit"){
                     response = await editMovie(movieDetails);
                }
                else{
                     response = await addMovie(movieDetails)
                } 
                
                // if response is true then show success message , get the updated value,close the modal box and hide the loader
               
                if(response.success){
                    showToast(TOAST_STATUS.SUCCESS,response.message);
                    await getAllMovies();
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


    const handleClose = ()=>{
        
        setIsOpen(false);
    }
 
  return (
    
   
    <div className='modal-box absolute left-0 top-0 h-[100vh] w-[100%] transparent z-10'>
        
        <div className='form modal-gradient text-white relative'>
            {type === "add" ? <h1 className='heading text-2xl font-medium uppercase'>Add movie</h1> : <h1 className='heading text-2xl font-medium uppercase'>Edit movie</h1>}
            {/* <button><i className="ri-close-fill text-4xl font-bold absolute right-5 top-5"></i></button> */}
            <form className=' flex flex-col items-center justify-between mt-16 gap-2 text-black' action='' method='post' onSubmit={handleSubmit}>

                        {/* title */}
                        <div className="input-container">
                        <i className="ri-movie-2-fill icon"></i>
                            <input type='text' placeholder='Title' className='input-field outline-none p-4  rounded-xl input-border' value={title} onChange={(e)=> setTitle(e.target.value)}/>
                        </div>
                        {/* description */}
                        <div className="input-container">
                            <i className="ri-file-text-fill icon"></i>
                            <textarea  placeholder='description'  className='input-field outline-none p-4  rounded-xl input-border' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </div>

                        {/* Duration,Genre,Language */}

                        <div className='flex item-center justify-around multi-input gap-2'>
                            {/* Duration */}
                            <div className="input-container">
                                <i className="ri-time-line icon"></i>
                                <input type='number' placeholder='duration' className='input-field outline-none p-4 rounded-xl input-border w-[200px]' value={duration} onChange={(e)=>setDuration(e.target.value)}/>
                            </div>

                            {/* Genre */}
                            <div className="input-container">
                            <i className="ri-keyboard-box-fill icon"></i>
                                <input type='text' placeholder='genre' className='input-field outline-none p-4 rounded-xl input-border' value={genre} onChange={(e)=>setGenre(e.target.value)}/>
                            </div>
                            {/* Language */}
                            <div className="input-container">
                                <i className="ri-global-fill icon"></i>
                                <input type='text' placeholder='language' className='input-field outline-none p-4 rounded-xl input-border' value={language} onChange={(e)=>setLanguage(e.target.value)}/>
                            </div>
                        </div>
                        {/* release date */}
                        <div className="input-container">
                            <i class="ri-calendar-schedule-fill icon"></i>
                            <input type='date' placeholder='release date' className='input-field outline-none p-4 rounded-xl input-border' value={releaseDate} onChange={(e)=>{setReleaseDate(e.target.value)}}/>
                        </div>
                        {/* Poster url */}
                        <div className="input-container">
                            <i className="ri-link icon"></i>
                            <input type='url' placeholder='poster url' className='input-field outline-none p-4  rounded-xl input-border' value={poster} onChange={(e)=>setPoster(e.target.value)}/>
                        </div>
                        
                        
                        
                        <input type='submit' className='p-4 cursor-pointer rounded-full w-[500px] font-bold bg-rose-800 text-white text-xl hover:bg-rose-400 input-border' />
                        <button  className='p-4 cursor-pointer rounded-full w-[500px] font-bold bg-rose-600 text-white text-xl hover:bg-rose-400 input-border' onClick={handleClose}>Cancel</button>
                       
                        

                        
                    </form>
        </div>
        
    </div>
    
  )
}

export default AdminModal