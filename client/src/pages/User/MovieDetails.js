import React, { useEffect, useState } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { showLoader,hideLoader } from '../../store/loadingSlice'
import { getMovieById } from '../../apicalls/movies'
import { showToast,TOAST_STATUS } from '../../util'
import Navbar from './components/Navbar'
import moment from 'moment'
import img from "../../assets/images/movie-details.jpg"
import DatePicker from './components/DatePicker'

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
          
          {/* Details container */}
          <div className='relative banner'>

              {/* movie banner */}
            <div className='poster-img'>
                  <img src={movie?.poster} className='movie-details-img' alt='poster'></img>
            </div>

            {/* movie details */}
            <div className='attributes'>
              <div className='movie-card-img'>
                  <img src={movie?.poster} className='' alt='poster'></img>
              </div>
              <div className='movie-card-details flex items-start justify-between flex-col gap-10'>
                    <h1 className='text-5xl font-bold text-white uppercase'>{movie.title}</h1>
                    <div className='flex items-start justify-between gap-5'>
                        {movie?.genre?.split(",").map(lang=><span className='tag'>{lang}</span>)}
                    </div>
                    <div className='flex items-center justify-between gap-4 text-white text-lg font-bold'>
                      <p>{movie?.duration}h</p>
                      <p className='text-2xl'>.</p>
                      <p>{movie?.language}</p>
                      <p className='text-2xl'>.</p>
                      <p>{moment(movie?.releaseDate).format('D MMMM YYYY')}</p>
                      
                    </div>
                    <button className='py-4 px-8 bg-rose-600 rounded-xl font-bold text-white transition-all hover:scale-110 hover:bg-rose-500' onClick={""}>Book tickets</button>
              </div>
            </div>
          </div>

          {/* Movie summary */}
          <div className='desc'>
              <h1 className='font-bold'>About the movie</h1>
              <p>{movie?.description}</p>

              
          </div>

          {/* Book tickets */}
          <section className='book-ticket '>
              <h1 className='text-4xl font-bold'>Book tickets</h1>
              <DatePicker/>

              
          </section>

          
            
            
            
        </section>
    </div>
  )
}

export default MovieDetails