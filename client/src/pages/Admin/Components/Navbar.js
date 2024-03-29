import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
import { useDebouncer } from '../../../customHooks/useDebouncer';
import { getMovies } from '../../../apicalls/movies';
import { showToast } from '../../../util';
import { TOAST_STATUS } from '../../../util';
import { getTheatre } from '../../../apicalls/theatre';


function AdminNavbar({tab,setTab,setMovies,setTheatre}) {


    const user = useSelector(state=>state.user);
    const navigate = useNavigate();
    const [searchMovie,setSearchMovie] = useState("");
    const [searchTheatre,setSearchTheatre] = useState("")
    const [isMenuBtnVisible,setMenuBtn] = useState(false);
    // const [searchTheatre,setSearchTheatre] = useState("");

    const debouncedMovie = useDebouncer(searchMovie);
    const debouncedTheatre = useDebouncer(searchTheatre);
    // const debouncedTheatre = useDebouncer(searchTheatre,500,theatre)


     // This function is similar to getAllMovies in Admin.js, difference is here the data is returned whereas in Admin.js the value is used to setState
        const getAllMovies = async()=>{
            // api call
            try {
            const data = await getMovies();
            return data;
            } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Internal error")
            }
            
        }
        
        // This function is to update the UI with the deboucned value,here we used setMovies ie the global state.
        // if the global movies state was used then when updated with the debounced value the whole movie will be lost to avoid that we use getAllMovies
        const updateMovieWithDebouncedValue = async()=>{
            // an api call to get all movies
            const movies = await getAllMovies();
            
            // check if the debouncedvalue has only whitespaces ,if yes then display all movies
            if(debouncedMovie === "" || debouncedMovie?.split("")[0] === " "){
                
                setMovies(movies)  
            } 

            // otherwise display the debounced movies
            else{
                let filteredArray = movies.filter((item)=>
                {
                    
                    return item.title.toLowerCase().includes(debouncedMovie?.toLowerCase());
                })
                setMovies(filteredArray)
            }
        }

        // Similary we have the code for theatre
        const getAllTheatres = async()=>{
            // api call
            try {
            const data = await getTheatre();
            return data;
            } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Internal error")
            }
            
        }

        const updateTheatreWithDebouncedValue = async()=>{
            // an api call to get all movies
            const theatres = await getAllTheatres();
            
            // check if the debouncedvalue has only whitespaces ,if yes then display all movies
            if(debouncedTheatre === "" || debouncedTheatre?.split("")[0] === " "){
                
                setTheatre(theatres)  
            } 

            // otherwise display the debounced movies
            else{
                let filteredArray = theatres.filter((theatre)=>
                {
                    
                    return theatre.name.toLowerCase().includes(debouncedTheatre?.toLowerCase());
                })
                setTheatre(filteredArray)
            }
        }


    //when ever there is a change in debouncedValue then api is called
    useEffect(()=>{
        updateMovieWithDebouncedValue();
       
    },[debouncedMovie])

    useEffect(()=>{
        updateTheatreWithDebouncedValue();
    },[debouncedTheatre])

    

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem("admin")
        navigate("/login")
    }
  return (
    // <div className='bg-violet-600 rounded-b-xl flex items-center justify-between px-16 py-3 mb-10'>
    //     {/* Brand name */}
    //     <h1 className='uppercase font-brand text-4xl text-violet-50 font-medium tracking-widest'>bookit</h1>
    //     {/* Tabs for admin */}
    //     <div className='admin-tabs flex items-center justfiy-center gap-10 uppercase text-md font-medium text-violet-50 cursor-pointer'>
    //         <p className={tab === "movies" ? "bottom-border text-xl" : ""} onClick={()=>setTab("movies")}>Movies</p>
    //         <p className= {tab === "theatre" ? "bottom-border text-xl" : ""} onClick={()=>setTab("theatre")}>Theatre</p>
    //     </div>
    //     {/* Logout and user button */}
    //     <div className='flex items-center justify-between gap-10 text-violet-100'>
    //         <div className='flex items-center gap-2'>
    //             <i className="ri-user-line text-md"></i>
    //             <p className='text-md uppercase font-medium'>{user.name}</p>
    //         </div>
    //         <i className="ri-logout-box-line text-2xl cursor-pointer" onClick={logout}></i>
            
    //     </div>
    // </div>

    <div className= {isMenuBtnVisible ? "admin-nav trigger  bg-color-nav rounded-b-xl flex items-center justify-between px-16 py-3 mb-10" : "admin-nav  bg-color-nav rounded-b-xl flex items-center justify-between px-16 py-3 mb-10"}>
        {/* Menu icon only visible when we add aa trigger class */}
        <i className="ri-menu-line text-2xl text-white hidden admin-menu" onClick={()=>setMenuBtn(s=>!s)}></i>
        <i className="ri-close-line text-4xl text-white hidden admin-close" onClick={()=>setMenuBtn(s=>!s)}></i>
             {/* Brand name */}
        <h1 className='uppercase font-brand text-4xl text-violet-50 font-medium tracking-widest'>bookit</h1>
        {/* Tabs for admin */}
        <div className='admin-tabs flex items-center justfiy-center gap-10 uppercase text-md font-medium text-violet-50 cursor-pointer'>

                {/* Movies tab */}
                <div className= "input-container " onClick={()=>{setTab("movies")}}>
                    {
                        tab === "movies"
                        ?
                        <>
                            <i className="ri-search-line text-md font-normal text-white icon"></i>
                            {/* Search input */}
                            <input type='text' placeholder='Movies' value={searchMovie} onChange={(e)=>setSearchMovie(e.target.value)}  className='outline-none pl-12 p-1 rounded-full w-[150px] nav-bar-tabs bg-color-nav text-lg' />
                        </>
                        :
                        <p className='text-sm' onClick={()=>setMenuBtn(false)}>Movies</p>
                    }
                </div>

                {/* Theatre tab */}
                <div className= "input-container" onClick={()=>setTab("theatre")}>
                    {
                        tab === "theatre"
                        ?
                        <>
                            <i className="ri-search-line text-md font-normal text-white icon"></i>
                            {/* Search input */}
                            <input type='text' placeholder='Theatre' className='outline-none pl-12 p-1 rounded-full w-[150px] nav-bar-tabs bg-color-nav text-lg'  value={searchTheatre} onChange={(e)=>setSearchTheatre(e.target.value)}/>
                        </>
                        :
                        <p className='text-sm' onClick={()=>setMenuBtn(false)}>Theatre</p>
                    }
                </div>
            
            {/* <p className= {tab === "theatre" ? " text-xl" : ""} onClick={()=>setTab("theatre")}>Theatre</p> */}
        </div>
        {/* Logout and user button */}
        <div className='flex items-center justify-between gap-10 text-violet-100'>
            <div className='flex items-center gap-2'>
                <i className="ri-user-line text-md"></i>
                <p className='text-md uppercase font-medium'>{user.name}</p>
            </div>
            <i className="ri-logout-box-line text-2xl cursor-pointer" onClick={logout}></i>
            
        </div>
    </div>
  )
}

export default AdminNavbar