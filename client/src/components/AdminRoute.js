import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function AdminRoute({children}) {
   
    const user = useSelector(state=>state.user);
    
    const navigate = useNavigate();
    console.log(user);

    

    

    useEffect(()=>{
       
        if(!user.isAdmin) navigate("/")
    })

  return (
    <div>
        {user.isAdmin && children}
    </div>
  )
}

export default AdminRoute