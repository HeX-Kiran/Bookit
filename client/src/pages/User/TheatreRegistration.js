import React, { useEffect, useState } from 'react'
import theatreReg from "../../assets/images/ticket-booking.webp"
import { useSelector } from 'react-redux';
import { addTheatre } from '../../apicalls/theatre';
import { showToast,TOAST_STATUS } from '../../util';
import { useNavigate } from 'react-router-dom';


function TheatreRegistration() {

    const navigate = useNavigate()

    const user = useSelector((state)=>state.user)

    const [theatreName,setTheatreName] = useState("");
    const [theatreAddress,setTheatreAddress] = useState("");
    const [theatreLocation,setTheatreLocation] = useState("");




    

    const onSubmit = async(e)=>{
        e.preventDefault();
        
        try {   
            // Add new theatre to db
            const data = await addTheatre({
                name:theatreName,
                address : theatreAddress,
                location:theatreLocation,
                owner:user._id
            })
            
            // check the response
            if(data.success){
                showToast(TOAST_STATUS.SUCCESS,data.message);

                
                navigate("/theatre")
            
            }
            else{
                showToast(TOAST_STATUS.ERROR,data.message)
            }
            
        } catch (error) {
            showToast(TOAST_STATUS.ERROR,error.message)
        }


    }



    useEffect(()=>{

    })
  return (
    <section className='theatre-reg'>
        
      <div className='registration-grid grid grid-cols-2 items-start justify-between '>
            <div className='brand-img px-16 py-10  flex flex-col items-start justify-between gap-20  h-[100vh]'> 
                {/* Brand name */}
                {/* <h1 className='uppercase font-brand text-5xl text-violet-800 font-medium tracking-widest'>bookit</h1> */}
                {/* A short desc */}
                <h1 className='font-bold text-6xl text-violet-800 w-[100%] leading-tight'>One step <span className='text-violet-500'>towards your big dream</span></h1>
                {/* Login illustration */}
                <img src={theatreReg} alt='Login illustration' className='w-[100%] h-[500px]'/>
            </div>

            <div className='theatre-reg-form px-16 py-10   flex flex-col items-center justify-around bg-violet-50 h-[100vh] '>

                <div className='brand-title inline-block'>
                    <h1 className='text-5xl font-bold text-violet-800'>Lets open your theatre</h1>
                    <h3 className=' text-lg text-violet-400 font-medium text-center mt-2'>Theatre details</h3>
                </div>

                <form  className='flex flex-col items-center   gap-4' action='#' method='post' onSubmit={onSubmit}>

                        <div className="input-container">
                            <i className="ri-movie-2-fill icon"></i>
                            
                            <input type='text' placeholder='Theatre name' id='theatreName'  className='input-field outline-none p-4 rounded-3xl input-border ' onChange={(e)=>setTheatreName(e.target.value)} required/>
                        </div>

                        <div className="input-container">
                            <i className="ri-information-fill icon"></i>
                          
                            <input type='text' placeholder='Address' id='theatre-address' className='input-field outline-none p-4 rounded-3xl input-border' onChange={(e)=>setTheatreAddress(e.target.value)} required/>
                        </div>

                        <div className="input-container">
                            <i className="ri-map-pin-fill icon"></i>
                           
                            <input type='text' placeholder='Location' id='theatre-location' className='input-field outline-none p-4 rounded-3xl input-border' onChange={(e)=>setTheatreLocation(e.target.value)} required/>
                        </div>
                        
                        <input type='submit' className=' theatre-reg-submit p-4 cursor-pointer rounded-full  w-[500px] font-bold text-white text-xl bg-rose-500 transition-all hover:scale-110 ' value={"Open"} />
                       
                        
                        
                </form>


                  

            </div>
      </div>

    
    </section>
  )
}

export default TheatreRegistration