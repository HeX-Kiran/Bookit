import React from 'react'
import {  useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"


function AdminNavbar({tab,setTab}) {

    const user = useSelector(state=>state.user);
    const navigate = useNavigate()

    

    const logout = ()=>{
        localStorage.removeItem('token');
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

    <div className='bg-color-nav rounded-b-xl flex items-center justify-between px-16 py-3 mb-10'>
             {/* Brand name */}
        <h1 className='uppercase font-brand text-4xl text-violet-50 font-medium tracking-widest'>bookit</h1>
        {/* Tabs for admin */}
        <div className='admin-tabs flex items-center justfiy-center gap-10 uppercase text-md font-medium text-violet-50 cursor-pointer'>

                {/* Movies tab */}
                <div className= "input-container " onClick={()=>setTab("movies")}>
                    {
                        tab === "movies"
                        ?
                        <>
                            <i className="ri-search-line text-md font-normal text-white icon"></i>
                            {/* Search input */}
                            <input type='text' placeholder='Movies' className='outline-none pl-12 p-1 rounded-full w-[150px] nav-bar-tabs bg-color-nav text-lg' />
                        </>
                        :
                        <p className='text-sm'>Movies</p>
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
                            <input type='text' placeholder='Theatre' className='outline-none pl-12 p-1 rounded-full w-[150px] nav-bar-tabs bg-color-nav text-lg' />
                        </>
                        :
                        <p className='text-sm'>Theatre</p>
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