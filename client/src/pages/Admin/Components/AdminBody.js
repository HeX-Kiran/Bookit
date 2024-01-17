import React, { useEffect, useState } from 'react'
import { getMovies } from '../../../apicalls/movies';
import AdminTable from './AdminTable';
import AdminMovieCard from './AdminMovieCard';


function AdminBody() {

  // Function to get all movies
  const getAllMovies = async()=>{
    // api call
    const data = await getMovies();
    console.log(data);
    setMovies(data);
  }

  const[movies,setMovies] = useState([]);

  useEffect(()=>{
    getAllMovies();
  },[])
  return (
    <div className='admin-body px-6 py-20 '>
        <h1 className='uppercase text-4xl font-medium text-violet-800 text-center tracking-widest'>Movies</h1>

        {movies && 
          <AdminTable data={movies} key={1}/>
          // movies.map((movie)=><AdminMovieCard data={movie}/>)
          
        }
    </div>
  )
}

export default AdminBody