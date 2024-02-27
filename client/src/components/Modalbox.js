import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader"
import { useDispatch, useSelector } from 'react-redux';
import { showLoader,hideLoader } from '../store/loadingSlice';
import { showToast,TOAST_STATUS } from '../util';
import { validateAdmin } from '../apicalls/user';


function Modalbox({setModalBox}) {
    const[token,setToken] = useState("");
    const navigate = useNavigate();
    const isLoading = useSelector(state=>state.loader.status);
    const dispatcher = useDispatch()

    const handleCancelBtn = ()=>{
        //delete token from localstorage
        localStorage.removeItem("token");
        setModalBox(false);
        navigate("/login")

    }

    const handleProceedBtn = async()=>{
        try {
            dispatcher(showLoader());
            const response = await validateAdmin({email:"Admin@123.com",password:token});
            if(response.success){
                showToast(TOAST_STATUS.SUCCESS,response.message);
                // add a token in local cache
                localStorage.setItem("admin",response.data);
                // close modalbox
                setModalBox(false);
                //navigate to admin page
                navigate("/admin")
            }
            else{
                showToast(TOAST_STATUS.ERROR,response.message);
            }
            dispatcher(hideLoader());
          } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Internal error")
            dispatcher(hideLoader());
          }
    }
  return (
    <section className='modal-box-admin bg-violet-200'>
        <Loader isLoading={isLoading} />
        <div className='modal-admin bg-violet-100'>
            <h1 className='text-2xl font-bold'>Enter admin token</h1>
            <input type='password' className='w-[100%] bg-violet-50 py-2 px-4 rounded-xl' placeholder='Enter here..' onChange={(e)=>{setToken(e.target.value)}}/>
            <div className='flex item-center justify-around w-[100%]'>
                <button className='border-none py-2 px-6 bg-rose-500 rounded-xl text-white' onClick={handleCancelBtn}>Cancel</button>
                <button className='border-none py-2 px-4 bg-green-500 rounded-xl text-white'  onClick={handleProceedBtn}>Proceed</button>
                
            </div>
        </div>
    </section>
  )
}

export default Modalbox