
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader,hideLoader } from './store/loadingSlice';
import { checkPassword, showToast,TOAST_STATUS } from './util';
import { resetPassword, updatePassword } from './apicalls/user';




function Reset() {
    const[otp,setOtp] = useState("");
    const[actualOtp,setActualOtp] = useState("");
    const[isOtpOpen,setOtpField] = useState(false);
    const[isPasswordOpen,setPasswordField] = useState(false);
    const[email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const isLoading = useSelector(state=>state.loader.status);

    const dispatcher = useDispatch()

    const handleCancelBtn = ()=>{
        
        navigate("/login")

    }

    const handleEmailProceed = async()=>{
        
        try {
            dispatcher(showLoader());
            const response = await resetPassword(email);
            if(response.success){
                showToast(TOAST_STATUS.INFO,"Otp shared to your mail");
               setActualOtp(response.data);
               setOtpField(true);
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

    const handleOtpProceed = ()=>{
        
        if(otp === actualOtp) setPasswordField(true);
        else showToast(TOAST_STATUS.ERROR,"incorrect otp");
    }

    const handlePasswordProceed = async()=>{
        try {
            //if passwords are matching update password
            if(checkPassword(password,confirmPassword)){
                dispatcher(showLoader());
                const response = await updatePassword({email,password})
                if(response.success){
                    showToast(TOAST_STATUS.SUCCESS,response.message);
                    setOtpField(false);
                    setPasswordField(false);
                    navigate("/login")
                }
                else{
                    showToast(TOAST_STATUS.ERROR,response.message);
                }
                dispatcher(hideLoader());
                    
            } 
        } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Internal error")
            dispatcher(hideLoader());
        }
       
    }
  return (
    <section className='modal-box-admin bg-violet-200'>
    <Loader isLoading={isLoading} />
    <div className='modal-admin bg-violet-100'>
        {
            isPasswordOpen 
            ?
            <>
                <h1 className='text-2xl font-bold'>Enter password</h1>
                <input type='password' className='w-[100%] bg-violet-50 py-2 px-4 rounded-xl' placeholder='New password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <input type='password' className='w-[100%] bg-violet-50 py-2 px-4 rounded-xl' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                <div className='flex item-center justify-around w-[100%]'>
                    <button className='border-none py-2 px-6 bg-rose-500 rounded-xl text-white' onClick={handleCancelBtn}>Cancel</button>
                    <button className='border-none py-2 px-4 bg-green-500 rounded-xl text-white'  onClick={handlePasswordProceed}>Update</button>
                    
                </div>
            </>
            :
            isOtpOpen
            ?
            <>
                <h1 className='text-2xl font-bold'>Enter Otp</h1>
                <input type='text' className='w-[100%] bg-violet-50 py-2 px-4 rounded-xl' placeholder='OTP' value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
                <div className='flex item-center justify-around w-[100%]'>
                    <button className='border-none py-2 px-6 bg-rose-500 rounded-xl text-white' onClick={handleCancelBtn}>Cancel</button>
                    <button className='border-none py-2 px-4 bg-green-500 rounded-xl text-white'  onClick={handleOtpProceed}>Verify</button>
                    
                </div>
            </>
            :
            <>
                <h1 className='text-2xl font-bold'>Enter email</h1>
                <input type='email' className='w-[100%] bg-violet-50 py-2 px-4 rounded-xl' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <div className='flex item-center justify-around w-[100%]'>
                    <button className='border-none py-2 px-6 bg-rose-500 rounded-xl text-white' onClick={handleCancelBtn}>Cancel</button>
                    <button className='border-none py-2 px-4 bg-green-500 rounded-xl text-white'  onClick={handleEmailProceed}>Continue</button>
                    
                </div>
            </>


        }
        
    </div>
</section>
  )
}

export default Reset