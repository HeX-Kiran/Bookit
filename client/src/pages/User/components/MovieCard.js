import React from 'react'

function MovieCard({movie}) {
  return (
    <div className='movie-card relative rounded-b-3xl overflow-hidden'>
        <img src={movie.poster} alt='movie poster ' className='w-[100%] h-[400px]'></img>
        <div className='absolute bottom-0 py-4 bg-gray-100 w-[100%] flex items-center justify-center flex-col gap-4 movie-details'>
            <h1 className='text-2xl font-bold text-white uppercase self-center'>{movie.title}</h1>
            <div className=' uppercase flex items-center gap-2'>
                    
                    {movie.genre.split(",").map(tag=><span className='tag'>{tag}</span>)}
            </div>
        </div>
        
    </div>
  )
}

export default MovieCard