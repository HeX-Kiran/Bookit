import React, { useEffect, useState } from 'react'
import { getMovies } from '../../../apicalls/movies';
import AdminTable from './AdminTable';
import AdminMovieCard from './AdminMovieCard';
import AdminModal from './AdminModal';
import { TOAST_STATUS, showToast } from '../../../util';


function AdminBody() {

  // Function to get all movies
  const getAllMovies = async()=>{
    // api call
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (error) {
      showToast(TOAST_STATUS.ERROR,"Internal error")
    }
    
  }

  const[movies,setMovies] = useState([]);
  const[type,setType] = useState("add");
  const[isOpen,setIsOpen] = useState(false);
  const[currMovie,setCurrMovie] = useState({})

  useEffect(()=>{
    getAllMovies();
  },[])
  return (
    <div className='admin-body px-6 py-20 '>
        <h1 className='uppercase text-4xl font-medium text-violet-800 text-center tracking-widest'>Movies</h1>

        {movies && 
          <AdminTable data={movies} setType={setType} getAllMovies={getAllMovies} setCurrMovie={setCurrMovie}  setIsOpen={setIsOpen} key={1}/>
          // movies.map((movie)=><AdminMovieCard data={movie}/>)
          
        }
        {isOpen && <AdminModal type = {type} setIsOpen={setIsOpen} currMovie = {currMovie} getAllMovies={getAllMovies}/>}
    </div>
  )
}

export default AdminBody