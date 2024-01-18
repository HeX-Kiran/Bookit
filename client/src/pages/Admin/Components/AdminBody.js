import React, { useEffect, useState } from 'react'
import { getMovies } from '../../../apicalls/movies';
import AdminTable from './AdminTable';
import AdminMovieCard from './AdminMovieCard';
import AdminModal from './AdminModal';


function AdminBody() {

  // Function to get all movies
  const getAllMovies = async()=>{
    // api call
    const data = await getMovies();
    console.log(data);
    setMovies(data);
  }

  const[movies,setMovies] = useState([]);
  const[type,setType] = useState("add");
  const[isOpen,setIsOpen] = useState(false)
  useEffect(()=>{
    getAllMovies();
  },[])
  return (
    <div className='admin-body px-6 py-20 '>
        <h1 className='uppercase text-4xl font-medium text-violet-800 text-center tracking-widest'>Movies</h1>

        {movies && 
          <AdminTable data={movies} getAllMovies={getAllMovies} key={1}/>
          // movies.map((movie)=><AdminMovieCard data={movie}/>)
          
        }
        <AdminModal type = {type} isOpen={isOpen}/>
    </div>
  )
}

export default AdminBody