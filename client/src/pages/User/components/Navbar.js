import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIfTheatreExsist } from '../../../apicalls/theatre'
import { TOAST_STATUS, showToast } from '../../../util';

function Navbar() {

    const user = useSelector(state=>state.user);
   
    const navigate = useNavigate();
    const [theatreExsist,setTheatreExsist] = useState(false);
    const[isMenuBtnVisible,setMenuBtn] = useState(false);

    const logout = ()=>{
      //remove use token
      localStorage.removeItem('token');
       
      navigate("/login")
    }

    // Function to check if the user have any theatre 
    const checkTheatreExsistForTheUser = async()=>{
      
      try {
        const theatreExsist = await checkIfTheatreExsist(user._id);
        
        // if theatreExsist then set the theatreExsist state to true
        if(theatreExsist.success){
          setTheatreExsist(true);
        }
  
      } catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
      }
    }

    const handleMovieNavLink =()=>{
        navigate("/");
        // document.querySelector(".movies").scrollIntoView({behavior:"smooth"});
    }

    useEffect(()=>{
      checkTheatreExsistForTheUser()
    },[user])

  return (
    <nav className={isMenuBtnVisible ? "navbar trigger rounded-b-xl flex items-center justify-between px-16 py-10 mb-10":"navbar rounded-b-xl flex items-center justify-between px-16 py-10 mb-10"}>
      {/* Menu icon only visible when we add aa trigger class */}
        <i className="ri-menu-line text-2xl text-white hidden user-menu" onClick={()=>setMenuBtn(s=>!s)}></i>
        <i className="ri-close-line text-4xl text-white hidden user-close" onClick={()=>setMenuBtn(s=>!s)}></i>
          {/* Brand name */}
          <h1 className='uppercase font-brand text-4xl text-violet-50 font-medium tracking-widest'>bookit</h1>
        {/* Tabs for admin */}
        <div className='user-tabs flex items-center justfiy-center gap-20  font-thin text-lg  text-violet-50 cursor-pointer' onClick={()=>setMenuBtn(false)}>
            <p onClick={handleMovieNavLink}>Movies</p>
            <p onClick={()=>navigate(`/tickets/${user._id}`)}>My tickets</p>
            {theatreExsist && <p onClick={()=>navigate("/theatre")}>My theatres</p>}
        </div>

        <div className='flex items-center justify-between gap-10 text-violet-100'>
            <div className='flex items-center gap-2'>
                <i className="ri-user-line text-md"></i>
                <p className='text-md uppercase font-thin'>{user.name}</p>
            </div>
            <i className="ri-logout-box-line text-2xl cursor-pointer" onClick={logout}></i>
            
        </div>
    </nav>
  )
}

export default Navbar