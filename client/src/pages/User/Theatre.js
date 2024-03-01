import React, { useState } from 'react'
import moment from "moment"
import TheatreDashboard from './components/TheatreDashboard'
import { useCallback, useEffect } from 'react'
import { THEATRE_PAGE_SECTION } from '../../util'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { useDispatch } from 'react-redux'
import { getAllTheatresByUserID } from '../../apicalls/theatre';
import { useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../store/loadingSlice';
import { showToast,TOAST_STATUS } from '../../util';
import Show from './components/Show'


function Theatre() {
    const [section,setSection] = useState(THEATRE_PAGE_SECTION.DASHBOARD);
    // this state filters the shows for a particular theatre
    const[selectedTheatre,setSelectedTheatre] = useState("")
    const [theatres,setTheatres] = useState([]);
    const dispatcher = useDispatch();
    const user = useSelector(state=>state.user);
    const navigate = useNavigate();
    const isLoading = useSelector(state=>state.loader.status);
    const[isMenuBtnVisible,setMenuBtn] = useState(false);

    // Funtion to handle logout button
    const logout = ()=>{
        localStorage.removeItem('token');
        navigate("/login")
    }

    // function to get all theatres
    const getAllTheatres = useCallback(async()=>{
        if(user._id){
            try {
                dispatcher(showLoader());
               
               
                const theatre = await getAllTheatresByUserID(user._id)
                
                setTheatres(theatre);
                dispatcher(hideLoader());
                
                
            } catch (error) {
                showToast(TOAST_STATUS.ERROR,"Internal error")
                dispatcher(hideLoader());
            }
        }
        
    },[user,dispatcher])

    //function to handle the show section when clicked
    const handleShowSection = ()=>{
        // set the section into show
        setSection(THEATRE_PAGE_SECTION.SHOWS);
        //make the selectedTheatre as ""
        setSelectedTheatre("");
    }

    useEffect(()=>{
        getAllTheatres();
    },[getAllTheatres])

  return (
    <section className='theatre-dashboard'>
        <Loader isLoading={isLoading}/> 
        <div className={isMenuBtnVisible?'dashboard-grid trigger':'dashboard-grid'}>
            <div className='side-bar flex flex-col items-start gap-24  ' onClick={()=>setMenuBtn(false)}>
                {/* Brand name */}
                <h1 className='uppercase font-brand text-5xl text-violet-600 font-medium tracking-widest cursor-pointer' onClick={()=>navigate("/")}>bookit</h1>

                <div className='menu flex flex-col items-start justify-center gap-8'>
                    {/* icon + button */}
                    <div className={section === THEATRE_PAGE_SECTION.DASHBOARD ?'flex items-center justify-center gap-4 text-violet-700 font-bold text-xl' :'flex items-center justify-center gap-4 '} onClick={()=>setSection(THEATRE_PAGE_SECTION.DASHBOARD)}>
                        <i className="ri-folder-2-line"></i>
                        <button className='text-md'>Dashboard</button>
                    </div>
                    <div className={section === THEATRE_PAGE_SECTION.SHOWS ?'flex items-center justify-center gap-4 text-violet-700 font-bold text-xl' :'flex items-center justify-center gap-4 '} onClick={handleShowSection}>
                        <i className="ri-movie-line"></i>
                        <button className='text-md'>Shows</button>
                    </div>
                    <div className='flex items-center justify-center gap-4' >
                        <i class="ri-logout-box-line"></i>
                        <button className='text-md' onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className='main-body '>
                {/* Main body nav bar */}
                <div className='nav-bar flex items-center justify-between w-[100%]'>
                    {/* Menu icon only visible when we add aa trigger class */}
                    <i className="ri-menu-line text-2xl text-black hidden user-menu" onClick={()=>setMenuBtn(s=>!s)}></i>
                    <i className="ri-close-line text-4xl text-black hidden user-close" onClick={()=>setMenuBtn(s=>!s)}></i>
                    {/* nav-bar title */}
                    <h1 className='text-2xl font-bold uppercase'>{section}</h1>
                    {/* nav-bar date and search button */}
                    <div className='flex items-center gap-8'>
                        <p className='date font-medium'>{moment(Date.now()).format('Do MMMM YYYY')}</p>
                        <i className="ri-user-line p-2 bg-violet-100 rounded-xl text-blue-700"></i>
                    </div>
                </div>

                {
                    section === THEATRE_PAGE_SECTION.DASHBOARD 
                    ?
                        <TheatreDashboard setSection={setSection} theatres={theatres}  getAllTheatres = {getAllTheatres} setSelectedTheatre={setSelectedTheatre}/>
                    :
                    <h1><Show theatres={theatres} selectedTheatre={selectedTheatre} setSelectedTheatre={setSelectedTheatre}/></h1>
                }
            </div>
        </div>
    </section>
  )
}

export default Theatre