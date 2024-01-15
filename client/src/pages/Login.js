import React, { useEffect, useState } from 'react'
import loginImg from "../assets/images/login_image.png"
import{Link, useNavigate} from "react-router-dom"
import { TOAST_STATUS, checkEmail, checkLoginPassword, showToast } from '../util';
import { loginUser } from '../apicalls/user';

function Login() {

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const navigate =useNavigate();

  const onLoginSubmit = async(e)=>{
    e.preventDefault();

    if(checkEmail(email) && checkLoginPassword(password)){
      try {

        const data = await loginUser({
          email:email,
          password:password
        })

        

          if(data.success){
            localStorage.setItem("token",data.data.token);
            // showToast(TOAST_STATUS.SUCCESS,data.message);
            navigate("/")
          }
          else{
            showToast(TOAST_STATUS.ERROR,data.message)
          }
      }
      
      catch (error) {
        showToast(TOAST_STATUS.ERROR,"Something went wrong")
        
      }
        

       
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem('token');
    // if token exsist then redirect to home page
    if(token) navigate("/")
    
  },[])
  return (
    <div className='login-page'>
      <div className='login-grid grid grid-cols-2 items-start justify-between '>
            <div className='brand-img px-24 py-20  flex flex-col items-start justify-between gap-20 bg-violet-100 h-[100vh]'> 
                {/* Brand name */}
                <h1 className='uppercase font-brand text-5xl text-violet-800 font-medium tracking-widest	'>bookit</h1>
                {/* A short desc */}
                <h1 className='font-bold text-6xl text-violet-800 w-[80%] leading-tight'>Unlock a new world of <span className='text-violet-500'>visual treat</span></h1>
                {/* Login illustration */}
                <img src={loginImg} alt='Login illustration' className=''/>
            </div>

            <div className='login-form px-28 py-36  flex flex-col items-center justify-around bg-violet-50 h-[100vh] '>

                <div className='brand-title inline-block'>
                    <h1 className='text-5xl font-bold text-violet-800'>Welcome to Bookit</h1>
                    <h3 className=' text-lg text-violet-400 font-medium text-center mt-2'>Booking made simple</h3>
                </div>

                <form className='flex flex-col items-center   gap-4' action='' method='post' onSubmit={onLoginSubmit}>

                        <div className="input-container">
                            <i className="ri-mail-fill icon"></i>
                            <input type='email' placeholder='Email'  className='input-field outline-none p-4 rounded-3xl input-border ' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <i className="ri-key-fill icon"></i>
                            <input type='password' placeholder='Password' className='input-field outline-none p-4 rounded-3xl input-border' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        
            
                        <input type='submit' className='p-4 cursor-pointer rounded-full input-border w-[500px] font-bold text-violet-800 text-xl hover:bg-violet-200 ' />
                        <h1 className='font-semibold text-lg text-violet-800 self-end'>Dont have an account? <Link to={"/register"} className='font-bold text-lg text-violet-500'>Register</Link></h1>
                        
                </form>


                  

            </div>
      </div>

    </div>
  )
}

export default Login