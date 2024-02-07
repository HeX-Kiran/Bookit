import React, { useEffect, useState } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { showLoader,hideLoader } from '../../store/loadingSlice'
import { getMovieById } from '../../apicalls/movies'
import { showToast,TOAST_STATUS } from '../../util'
import Navbar from './components/Navbar'
import img from "../../assets/images/movie-details.jpg"

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
    


   //FUNCTION TO FETCH MOVIE DETAILS OF A PARTICULAR MOVIE BY ID
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
   },[])
  return (
    <div>
        <Loader isLoading={isLoading}/>
        <section className='movie-details-page'>
          {/* Nav bar */}
            <Navbar />
          {/* poster image */}
          <div className='relative'>
            <img src={img} alt='movie poster'  className='movie-details-img'/>

            <img src={movie.poster} className='movie-detail-poster' alt='movie poster'></img>
            <h1 className='title'>{movie.title}</h1>
            <div className='desc'>
              <p>{movie.description}</p>
            </div>
            
          </div>
            
            
            
        </section>
    </div>
  )
}

export default MovieDetails