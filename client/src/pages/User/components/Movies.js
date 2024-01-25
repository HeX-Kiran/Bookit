import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { showLoader,hideLoader } from '../../../store/loadingSlice';
import { showToast,TOAST_STATUS } from '../../../util';
import { getMovies } from '../../../apicalls/movies';
import MovieCard from './MovieCard';

function Movies() {
    const dispatcher = useDispatch();
    const [movies,setMovies] = useState([]);
    const[visible,setVisible] = useState(4);

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

    const showMoreMovies = ()=>{
        setVisible((prevValue) => prevValue + 4)
    }

    useEffect(()=>{
        getAllMovies();
    },[])
  return (
    <section className='movies my-auto px-16 py-10' id='movie' >
        <header className='text-5xl text-white font-bold'>Trending Now</header>
        {/* Display movie cards */}
        <div className='movie-cards'>
            {
                movies?.slice(0,visible).map((movie,index)=>{
                    return <MovieCard movie={movie} key={index} />
                })
            }
        </div>
        
        {/* if the visible value is equal to the movies array length then no more movies are left to show so hide the btn */}
        {visible <= movies.length 
            && 
        <div className='w-[100%] text-center my-4'>
            <button className='outline-none py-2 px-12 text-md bg-white rounded-xl font-bold transition-all hover:scale-110 hover:bg-black hover:text-white' onClick={showMoreMovies}>Load More</button>
        </div>}
    </section>
  )
}

export default Movies