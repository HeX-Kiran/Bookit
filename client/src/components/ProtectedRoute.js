import React, { useCallback, useEffect } from 'react'
import{useDispatch,useSelector} from "react-redux"
import { getcurrUser } from '../apicalls/user';
import { hideLoader, showLoader } from '../store/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../store/userSlice';
import { TOAST_STATUS, showToast } from '../util';


function ProtectedRoute({children}) {

    const user = useSelector(state=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    


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
            //hide the loader 
            dispatch(hideLoader());
            if(data.data.isAdmin) navigate("/admin")
            
          }
          //if the reponse is not successfull
          else{
            //show toast
            showToast(TOAST_STATUS.ERROR,data.message);
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
        {user && children}
    </div>
  )
}

export default ProtectedRoute