import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const user = useSelector(state=>state.user);
    const navigate = useNavigate()

    const logout = ()=>{
      localStorage.removeItem('token');
      navigate("/login")
  }
  return (
    <nav className='navbar rounded-b-xl flex items-center justify-between px-16 py-10 mb-10'>
          {/* Brand name */}
          <h1 className='uppercase font-brand text-4xl text-violet-50 font-medium tracking-widest'>bookit</h1>
        {/* Tabs for admin */}
        <div className='admin-tabs flex items-center justfiy-center gap-20  font-thin text-lg  text-violet-50 cursor-pointer'>
            <p>Movies</p>
            <p>My tickets</p>
            <p>Partner program</p>
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