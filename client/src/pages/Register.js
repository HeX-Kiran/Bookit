import React, { useState } from 'react'
import registerImg from "../assets/images/register-2.webp"
import { TOAST_STATUS, checkEmail, checkPassword, showToast } from '../util';
import { registerUser } from '../apicalls/user';
import { useNavigate } from 'react-router-dom';



function Register() {

    const [isAdmin,setIsAdmin] = useState(false);
    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async(e)=>{
        e.preventDefault();
        
        if(checkEmail(email) && checkPassword(password,confirmPassword)){
           

            try {   
                // Add new user to db
                const data = await registerUser({
                    name : username,
                    email:email,
                    password:password,
                    isAdmin:isAdmin
                })
                
                // check the response
                if(data.success){
                    showToast(TOAST_STATUS.SUCCESS,data.message);

                    const token = localStorage.getItem('token')
                    //if there is a token in local storage then the token will be the prev user id
                    //so we delete the token here
                    if(token)localStorage.removeItem('token')
                    navigate("/login")
                
                }
                else{
                    showToast(TOAST_STATUS.ERROR,data.message)
                }
                
            } catch (error) {
                showToast(TOAST_STATUS.ERROR,error.message)
            }
            

            
        }
        
    }

  return (
    <div className='register py-20 px-32 bg-violet-400 h-[100vh] '>
        <div className='img-form grid register-grid '>
            {/* Brand title and image */}
            <div className='register-img p-8 bg-violet-200  rounded-l-2xl flex items-center justify-between flex-col'>
                <div className='brand-title'>
                    <h1 className='uppercase font-brand text-6xl text-violet-800 font-medium tracking-widest'>bookit</h1>
                    <h3 className=' text-lg text-violet-400 font-medium text-center mt-2'>Booking made simple</h3>
                </div>
                <div className='text-center font-bold text-violet-800 uppercase flex items-start justisfy-center flex-col gap-4'>

                    <div className='flex items-center gap-4'>
                        <i className="ri-shield-check-fill text-2xl"></i>
                        <p className='text-md'>Safe and quick payment</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <i className="ri-quill-pen-fill text-2xl"></i>
                        <p className='text-md'>Light and Friendly UI</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <i className="ri-movie-2-line text-2xl"></i>
                        <p className='text-md'>100+ theatre</p>
                    </div>

                    

                    
                </div>
                <img className='h-[250px]' src={registerImg} alt='register-illustration'></img>
            </div>
            {/* Registration form */}
            <div className='register-form p-8 pl-8 bg-violet-100 text-gray-800 h-[75vh] rounded-r-2xl grid grid-cols-2 items-start justify-between'>
                {/* Form field */}
                <div>
                    <h1 className='font-bold text-4xl'>Welcome to <span className='text-violet-800'>Bookit</span> </h1>
                    <p className='my-2 font-semibold text-lg'>Please fill the below fields to register</p>
                

                    <form className='flex flex-col items-center justify-between mt-16 gap-8' action='' method='post' onSubmit={onSubmit}>

                        <div className="input-container">
                            <i className="ri-user-fill icon"></i>
                            <input type='text' placeholder='Username' className='input-field outline-none p-4  rounded-full input-border' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <i className="ri-mail-fill icon"></i>
                            <input type='email' placeholder='Email'  className='input-field outline-none p-4  rounded-full input-border' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <i className="ri-key-fill icon"></i>
                            <input type='password' placeholder='Password' className='input-field outline-none p-4 rounded-full input-border' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        
                        <div className="input-container">
                            <i className="ri-key-fill icon"></i>
                            <input type='password' placeholder='Confirm password' className='input-field outline-none p-4  rounded-full input-border' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        
                        
                        
                        <input type='submit' className='register-submit p-4 cursor-pointer rounded-full input-border w-[500px] font-bold text-violet-800 text-xl hover:bg-violet-200 ' />

                       
                        

                        
                    </form>
                </div>
                {/* Admin confirmation */}
                <div className='admin-checkbox flex flex-col items-center justify-center m-auto gap-4'>
                    <h1 className='font-bold text-2xl '>Are you a admin?</h1>
                    <button className='p-2 rounded-full input-border w-[100px] font-bold text-violet-800 text-xl hover:bg-violet-200' style={{backgroundColor : isAdmin?"rgb(196 181 253)": ""}} onClick={()=>setIsAdmin(!isAdmin)}>Yes</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Register