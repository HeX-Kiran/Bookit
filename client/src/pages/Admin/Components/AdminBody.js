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

  //function to handle add movie button
  const handleAddMovie = ()=>{
    //open modal box
    setIsOpen(true);
    // set type to add
    setType("add")
  }

  useEffect(()=>{
    getAllMovies();
  },[])
  return (
    <div className='admin-body px-32 '>
        <div className='flex items-center justify-between'>
          <h1 className='uppercase text-4xl font-medium text-black text-center tracking-widest py-4 '>Movies</h1>
          {/* Add movie button */}
          <button className='ml-10 px-4 py-2 rounded-full bg-gradient-to-bl from-violet-800 to-violet-400  text-violet-100 font-medium  text-lg' onClick={handleAddMovie}>Add movie</button>
        </div>
        
        <div className='admin-body-cards'>

            {movies && 
              // <AdminTable data={movies} setType={setType} getAllMovies={getAllMovies} setCurrMovie={setCurrMovie}  setIsOpen={setIsOpen} key={1}/>
          
              movies.map((movie)=><AdminMovieCard data={movie} setType={setType} getAllMovies={getAllMovies} setCurrMovie={setCurrMovie}  setIsOpen={setIsOpen} key={movie._id}/>)
              
              
            }
        </div>
        {isOpen && <AdminModal type = {type} setIsOpen={setIsOpen} currMovie = {currMovie} getAllMovies={getAllMovies}/>}
    </div>
  )
}

export default AdminBody