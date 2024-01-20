import React, { useEffect, useState } from 'react'
import { getMovies } from '../../apicalls/movies';
// import AdminTable from './Components/AdminTable';
import AdminMovieCard from './Components/AdminMovieCard';
import AdminModal from './Components/AdminModal';
import { TOAST_STATUS, showToast } from '../../util';
import AdminNavbar from './Components/Navbar';


function Admin() {

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
  const [tab,setTab] = useState("movies")

  //function to handle add movie button
  const handleAddMovie = ()=>{
    //make curr Movie as empty object
    setCurrMovie({})
    //open modal box
    setIsOpen(true);
    // set type to add
    setType("add")
  }

  const setPageFreeze = ()=>{
      // to make overflow hidden while the modal box is open
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if(isOpen)document.body.style.overflow = "hidden";
      
  }

  const setPageFree = ()=>{
    document.body.style.overflow = "visible";
  }


  if(isOpen)setPageFreeze();
  else setPageFree();

  
   

  useEffect(()=>{
    getAllMovies();
  },[])
  return (
    <div className=''>
      {/* Nav BAR */}
        <AdminNavbar tab = {tab} setTab={setTab}/>

        {/* Admin body */}
        <div className='admin-body px-32 '>
            <div className='flex items-center justify-between'>
              <h1 className='uppercase text-4xl font-medium text-black text-center tracking-widest py-4 '>Movies</h1>
              {/* Add movie button */}
              <button className='ml-10 px-4 py-2 rounded-xl text-white font-medium  text-lg bg-base-red text-xl' onClick={handleAddMovie}>Add movies<span><i className="ri-add-fill px-2 text-xl"></i></span></button>
            </div>

            {movies?.length > 0 && <h1 className='copyright '>BOOKIT</h1> }

            
            
            <div className='admin-body-cards'>

                {movies && 
                  // <AdminTable data={movies} setType={setType} getAllMovies={getAllMovies} setCurrMovie={setCurrMovie}  setIsOpen={setIsOpen} key={1}/>
                  // if movies length is 0

                 
                 movies.length === 0
                  ? 
                  
                  <div className='length-zero copyright'>Add movies</div>
                  

                  :
                   movies.map((movie)=><AdminMovieCard data={movie} setType={setType} getAllMovies={getAllMovies} setCurrMovie={setCurrMovie}  setIsOpen={setIsOpen} key={movie._id}/>)
                  
                  
                }
            </div>
            {/* Modal box */}
            {isOpen && <AdminModal type = {type} setIsOpen={setIsOpen} currMovie = {currMovie} getAllMovies={getAllMovies}/>}
        </div>
    </div>
  )
}

export default Admin