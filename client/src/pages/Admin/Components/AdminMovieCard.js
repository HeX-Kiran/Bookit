import React from 'react'
import moment from 'moment';
import {useDispatch} from "react-redux"
import { TOAST_STATUS } from '../../../util';
import { showToast } from '../../../util';
import { showLoader,hideLoader } from '../../../store/loadingSlice';
import { deleteMovie } from "../../../apicalls/movies";


function AdminMovieCard(props) {
    const {_id,title,description,duration,language,genre,releaseDate,poster} = props.data;
    
    const {getAllMovies,setCurrMovie,setIsOpen,setType} = props;
    const dispatcher = useDispatch();  

    

    
  // Handle delete button
  const handleDeleteBtn = async(id)=>{
    try {
      dispatcher(showLoader());
      const response = await deleteMovie(id);
      if(response.success){
          showToast(TOAST_STATUS.SUCCESS,response.message);
          //get the updated movies
          getAllMovies();
          dispatcher(hideLoader())
      }
      else{
        showToast(TOAST_STATUS.ERROR,response.message)
      } 
    } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Internal error")
    }
    
  }

  // Handle edit button
  const handleEditBtn = (movie)=>{
    // set curr movie as the clicked movie
    setCurrMovie(movie);
    // open modalk box
    setIsOpen(true);
    // set the type as edit
    setType("edit")

  }


  return (
   
    
    <div className='admin-body-card gap-10 p-8  w-[700px]  rounded-xl'>
     
        <div className='flex items-center justify-between flex-col gap-4'>
          
          <img src={poster} alt="movie pic" width={"400px"} height={"400px"}  style={{backgroundColor:"rgb(221 214 254)"}}></img>
          <p className='italic movie-desc-admin overflow-scroll'>{description}</p>
            
        </div>
        <div className='flex flex-col items-start gap-8 flex-wrap admin-movie-details'>
            {/* title of the movie */}
            <h1 className='text-2xl font-bold text-black uppercase self-center movie-title-admin'>{title}</h1>

              {/* Genre with icons */}
              <div className=' uppercase flex items-center gap-2'>
                <i className="ri-keyboard-box-fill mr-2 text-lg"></i>
                {genre.split(",").map(tag=><span className='tag'>{tag}</span>)}
              </div>
              
              {/* duration with icon */}
              <div className="flex items-center gap-2">
                  <i className="ri-time-fill text-lg"></i>
                  <p className='font-bold text-lg'>{duration} Hours</p>
              </div>

              {/* Language with icons */}
              <div className=' uppercase flex items-center gap-2'>
              <i className="ri-global-fill mr-2 text-lg"></i>
                {language.split(",").map(lang=><span className='tag'>{lang}</span>)}
              </div>
              
               
        </div>
        <div className='action-btns flex items-end justify-between gap-10'>
              <button className='px-8 py-2 rounded-full  text-violet-100 font-medium bg-base-red  text-lg' onClick={()=>handleDeleteBtn(_id)}><i className="ri-delete-bin-6-line text-xl" ></i></button>
              <p className='text-black font-bold text-md self-center'>Release Date :- {moment(releaseDate).format('MMMM Do YYYY')}</p>  
              <button className='px-8 py-2 rounded-full bg-base-red  text-violet-100 font-medium  text-lg' onClick={()=> handleEditBtn({...props.data,releaseDate:moment(releaseDate).format('YYYY-MM-DD')})}><i className="ri-pencil-line text-xl" ></i></button>
        </div>
    </div>
    
  )
}

export default AdminMovieCard