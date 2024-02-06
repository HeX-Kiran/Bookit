import React, { useEffect, useState } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { showLoader,hideLoader } from '../../store/loadingSlice'
import { getMovieById } from '../../apicalls/movies'
import { showToast,TOAST_STATUS } from '../../util'

function MovieDetails() {

    //get the movieId from dynamic route
    const {movieID} = useParams()
    
    const search = useLocation().search
    const searchParams = new URLSearchParams(search)  
    // get date from query params  
    const date = searchParams.get("date")

    const isLoading = useSelector(state=>state.loader.status);
    const dispatcher = useDispatch();
    const[movie,setMovie] = useState({})
    


   

   const getMovieFromID = async()=>{
    try {
        dispatcher(showLoader());
        const data = await getMovieById(movieID);
        setMovie(data);
        dispatcher(hideLoader());
      } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Internal error")
        dispatcher(hideLoader());
      }
   }

   useEffect(()=>{
    getMovieFromID()
   },[movieID,date])
  return (
    <div>
        <Loader isLoading={isLoading}/>
        <h1>{movie.title}</h1>
    </div>
  )
}

export default MovieDetails