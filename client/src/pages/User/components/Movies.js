import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { showLoader,hideLoader } from '../../../store/loadingSlice';
import { autoRetry, showToast,TOAST_STATUS } from '../../../util';
import { getMovies } from '../../../apicalls/movies';
import MovieCard from './MovieCard';
import { useDebouncer } from '../../../customHooks/useDebouncer';
import { reveal } from '../../../animations';
import Loader from '../../../components/Loader';

function Movies() {
    const dispatcher = useDispatch();
    const [movies,setMovies] = useState([]);
    const[visible,setVisible] = useState(4);
    const [searchMovie,setSearchMovie] = useState("");
    const debouncedMovie = useDebouncer(searchMovie);

    const getAllMovies = async()=>{
        try {
            dispatcher(showLoader());
            const data = await autoRetry(getMovies);
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

    
      
      





      // This function is similar to getAllMovies in Admin.js, difference is here the data is returned whereas in Admin.js the value is used to setState
      const getAllMoviesAndNotUpdateState = async()=>{
        // api call
        try {
        const data = await autoRetry(getMovies);
        return data;
        } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Internal error")
        }
        
    }
    


      // This function is to update the UI with the deboucned value,here we used setMovies ie the global state.
        // if the global movies state was used then when updated with the debounced value the whole movie will be lost to avoid that we use getAllMovies
        const updateMovieWithDebouncedValue = async()=>{
            // an api call to get all movies
            try {
                dispatcher(showLoader());
                const movies = await getAllMoviesAndNotUpdateState();
                if(movies){
                    // check if the debouncedvalue has only whitespaces ,if yes then display all movies
                    if(debouncedMovie === "" || debouncedMovie?.split("")[0] === " "){
                        
                        setMovies(movies?.reverse())  
                    } 
    
                    // otherwise display the debounced movies
                    else{
                        let filteredArray = movies?.filter((item)=>
                        {
                            
                            return item.title.toLowerCase().includes(debouncedMovie?.toLowerCase());
                        })
                        setMovies(filteredArray)
                    }
                }
                dispatcher(hideLoader());
            } catch (error) {
                dispatcher(hideLoader());
                showToast(TOAST_STATUS.ERROR,"Internal error")
            }
           
            
        }

    useEffect(()=>{
        // getAllMovies();
        window.addEventListener("scroll", reveal);
    },[])

    useEffect(()=>{
        updateMovieWithDebouncedValue();
       
    },[debouncedMovie])

    
  return (
    movies && 
    <section className='movies my-auto px-16 py-10 reveal' id='movie' >
        
        <div className='flex items-center justify-between'>
            <header className='text-5xl text-white font-bold'>Trending Now</header>
            <div className="input-container">
                
                <input type='email' placeholder='Search movies...'  className='input-field outline-none py-2 px-4 rounded-3xl input-border ' value={searchMovie} onChange={(e)=>setSearchMovie(e.target.value)}/>
             </div>
        </div>
        
        {/* Display movie cards */}

            {
                movies?.length === 0 &&
                <div className=' flex items-center justify-center flex-col h-[100vh] w-[100%]'>
                    <h1 className=' text-3xl text-white '>No movies found!</h1>

                </div>
            }

        <div className='movie-cards'>
            
            
            {
                movies?.slice(0,visible).map((movie,index)=>{
                    return <MovieCard movie={movie} key={index} />
                })
            }
        </div>
        
        {/* if the visible value is equal to the movies array length then no more movies are left to show so hide the btn */}
        {visible <= movies?.length 
            && 
        <div className='w-[100%] text-center my-4'>
            <button className='outline-none py-2 px-12 text-sm bg-white rounded-xl font-bold transition-all hover:scale-110 hover:bg-black hover:text-white' onClick={showMoreMovies}>Load More</button>
        </div>}
    </section>
  )
}

export default Movies