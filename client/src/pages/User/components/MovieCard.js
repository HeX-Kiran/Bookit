import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';

function MovieCard({movie}) {

  const navigate = useNavigate();


  //FUNCTION TO HANDLE MOVIE CARD CLICK
  const handleMovieCardClick = ()=>{
    // on click of each card we naviagte to router "/movie/${movie._id}?moment(date).format(YYYY-MM-DD)"
    navigate(`/movie/${movie._id}?date=${moment(Date.now()).format("YYYY-MM-DD")}`)

  }

  return (
    <div className='movie-card relative overflow-hidden w-[100%] h-[350px] cursor-pointer' onClick={handleMovieCardClick} >
        <img src={movie.poster} alt='movie poster ' className='w-[100%] h-[350px]'></img>
       
        <div className='absolute bottom-0 py-4 px-4 bg-gray-100 w-[100%] flex items-center justify-between gap-4 movie-details '>
          <h1 className='text-2xl font-bold text-white uppercase self-center'>{movie.title}</h1>
          <div className=' uppercase flex items-center gap-2'>
                  
                  {movie.genre.split(",").map(tag=><span className='tag'>{tag}</span>)}
          </div>
        </div>
        
        
    </div>
  )
}

export default MovieCard