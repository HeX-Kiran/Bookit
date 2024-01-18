import React, { useState } from 'react'
import { editMovie } from '../../../apicalls/movies'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../store/loadingSlice'
import { TOAST_STATUS, checkMovieDetails, showToast } from '../../../util'
import moment from 'moment'

function AdminModal({type,currMovie,getAllMovies,setIsOpen}) {

    const[title,setTitle] = useState(currMovie?.title || "")
    const[description,setDescription] = useState(currMovie?.description || "")
    const[duration,setDuration] = useState(currMovie?.duration || 0)
    const[genre,setGenre] = useState(currMovie?.genre || "")
    const[language,setLanguage] = useState(currMovie?.language || "")
    const[releaseDate,setReleaseDate] = useState(moment(currMovie?.releaseDate).format("dd-mm-yyyy")|| Date.now())
    const[poster,setPoster] = useState(currMovie?.poster || "")
    const dispatcher = useDispatch();

    console.log(moment(currMovie?.releaseDate).format("dd-mm-yyyy"));

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const editedMovieDetails = {_id:currMovie._id,title,description,duration,genre,language,releaseDate,poster};
        console.log(editedMovieDetails);
        try {
            // check if all the details are entered or not
            if(checkMovieDetails(editedMovieDetails)){
                // show loaded
                dispatcher(showLoader());
                // api call to edit movie
                const response = await editMovie(editedMovieDetails);
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
  return (
    <div className='modal-box absolute left-0 top-0 h-[100vh] w-[100%] transparent z-10'>
        <div className='form bg-gradient-to-bl from-violet-800 to-violet-400 text-violet-100'>
            {type === "add" ? <h1 className='heading text-2xl font-medium uppercase'>Add movie</h1> : <h1 className='heading text-2xl font-medium uppercase'>Edit movie</h1>}
            <form className=' flex flex-col items-center justify-between mt-16 gap-2 text-black' action='' method='post' onSubmit={handleSubmit}>

                        {/* title */}
                        <div className="input-container">
                        <i className="ri-movie-2-fill icon"></i>
                            <input type='text' placeholder='Title' className='input-field outline-none p-4  rounded-xl input-border' value={title} onChange={(e)=> setTitle(e.target.value)}/>
                        </div>
                        {/* description */}
                        <div className="input-container">
                            <i class="ri-file-text-fill icon"></i>
                            <textarea  placeholder='description'  className='input-field outline-none p-4  rounded-xl input-border' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </div>

                        {/* Duration,Genre,Language */}

                        <div className='flex item-center justify-around multi-input gap-2'>
                            {/* Duration */}
                            <div className="input-container">
                                <i className="ri-key-fill icon"></i>
                                <input type='number' placeholder='duration' className='input-field outline-none p-4 rounded-xl input-border w-[200px]' value={duration} onChange={(e)=>setDuration(e.target.value)}/>
                            </div>

                            {/* Genre */}
                            <div className="input-container">
                                <i className="ri-key-fill icon"></i>
                                <input type='text' placeholder='genre' className='input-field outline-none p-4 rounded-xl input-border' value={genre} onChange={(e)=>setGenre(e.target.value)}/>
                            </div>
                            {/* Language */}
                            <div className="input-container">
                                <i className="ri-key-fill icon"></i>
                                <input type='text' placeholder='language' className='input-field outline-none p-4 rounded-xl input-border' value={language} onChange={(e)=>setLanguage(e.target.value)}/>
                            </div>
                        </div>
                        {/* release date */}
                        <div className="input-container">
                            <i className="ri-key-fill icon"></i>
                            <input type='date' placeholder='release date' className='input-field outline-none p-4 rounded-xl input-border' value={releaseDate} onChange={(e)=>{setReleaseDate(e.target.value)}}/>
                        </div>
                        {/* Poster url */}
                        <div className="input-container">
                            <i className="ri-key-fill icon"></i>
                            <input type='url' placeholder='poster url' className='input-field outline-none p-4  rounded-xl input-border' value={poster} onChange={(e)=>setPoster(e.target.value)}/>
                        </div>
                        
                        
                        
                        <input type='submit' className='p-4 cursor-pointer rounded-full w-[500px] font-bold text-violet-800 bg-violet-50 text-xl hover:bg-violet-200 input-border' />

                       
                        

                        
                    </form>
        </div>
        
    </div>
  )
}

export default AdminModal