import React, { useCallback, useEffect, useState } from 'react'
import{useDispatch,useSelector} from "react-redux"
import { getcurrUser } from '../apicalls/user';
import { hideLoader, showLoader } from '../store/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../store/userSlice';
import { TOAST_STATUS, showToast } from '../util';
import Modalbox from './Modalbox';



function ProtectedRoute({children}) {

    const user = useSelector(state=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen,setModalBox] = useState(false)
   


    const authorizeUser = useCallback(async ()=>{

      try {
        //get token from local storage
        const token = localStorage.getItem('token');
        //if token exisit then get the currUser from api call
        
        if(token){
          // show loader
          dispatch(showLoader());
          //get the response data
          const data = await getcurrUser(token);
          
          
          //if the api response is successfull
          if(data.success){
            //add the data in store
            dispatch(addUser(data.data))
            
            
            if(data.data.isAdmin){
              console.log(data.data.isAdmin);
              // if user is admin add a modal box to ask administator password or check if administrator pass already exsist in local cache
              let adminToken = localStorage.getItem("admin");
             
              // if admin token exsist then navigate to admin page else show modal box to enter admin token
                if(adminToken){
                  navigate("/admin")
                  setModalBox(false)
                }
                // show modal box
                else{
                 setModalBox(true)
                }

            } 
            

            //hide the loader 
            dispatch(hideLoader());
            
          }
          //if the reponse is not successfull
          else{
            //show toast
            showToast(TOAST_STATUS.ERROR,data.message);
            console.log(data.message);
            //delete token from localstorage
            localStorage.removeItem("token");

            //hide the loader 
            dispatch(hideLoader());

            //redirect to login page
            navigate("/login")
          }
        }

        //if token doesnot exsist
        else{
          // showToast(TOAST_STATUS.ERROR,"Please login");
          //redirect to login

          //hide the loader 
          dispatch(hideLoader());

          navigate("/login")
        }
      } catch (error) {
        navigate("/login");
        //show toast
        showToast(TOAST_STATUS.ERROR,"Internal error");
        //delete token from localstorage
        localStorage.removeItem("token");
      }
      
      
    },[dispatch,navigate]) 

    
    useEffect(()=>{
      authorizeUser()
    },[authorizeUser])

  return (
    <div>
        {isModalOpen 
         ?
         <Modalbox setModalBox={setModalBox}/>
          :
          user && children
        }
        
    </div>
  )
}

export default ProtectedRoute