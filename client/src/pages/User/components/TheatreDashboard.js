import React, { useCallback, useEffect, useState } from 'react'
import welcomeImage from "../../../assets/images/welcome.png"

import { getAllTheatresByUserID } from '../../../apicalls/theatre';
import { useDispatch,useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../store/loadingSlice';
import { showToast,TOAST_STATUS } from '../../../util';
import TheatreCards from './TheatreCards';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';


function TheatreDashboard({setSection}) {

    const [theatres,setTheatres] = useState([]);
    const dispatcher = useDispatch();
    const user = useSelector(state=>state.user);
    const navigate = useNavigate()

   
    const getAllTheatres = useCallback(async()=>{
        if(user._id){
            try {
                dispatcher(showLoader());
               
               
                const theatre = await getAllTheatresByUserID(user._id)
                
                setTheatres(theatre);
                dispatcher(hideLoader());
                
                
            } catch (error) {
                showToast(TOAST_STATUS.ERROR,"Internal error")
                dispatcher(hideLoader());
            }
        }
        
    },[user,dispatcher])

    useEffect(()=>{
        getAllTheatres();
    },[getAllTheatres])
  return (
    <div>
       
        {/* Main body welcoming message */}
        <div className=' welcome-msg my-16 flex items-start flex-col gap-4 w-[70%] m-auto p-8 bg-violet-200 rounded-2xl relative' >
                    <div className='w-[70%]'>
                        <h1 className='text-lg text-violet-700 font-bold mb-4'>Welcome Kiran</h1>
                        <p className='text-md font-medium'>We are thrilled to raise the curtains and invite you to a world of captivating performances, enchanting stories, and unforgettable moments.</p>
                    </div>
                    <img src={welcomeImage} alt='welcome person' className=' welcome-img'/>
                </div>
        {/* Movie Cards */}
        <h1 className='text-2xl font-bold '>Your theatres</h1>
           
            <div className='flex items-center justify-around flex-wrap w-[100%] my-8 gap-32'>

                 {/* <!-- Option to add theatre --> */}
                   
                    <div class="add-task" onClick={()=> navigate("/theatre/registration")}>
                        <i className="ri-add-line text-5xl"></i>
                        <p>Add Theatre</p>
                    </div>

                  
                {/* Theatre cards */}
                {
                    theatres.map(theatre => <TheatreCards theatre={theatre} getAllTheatres={getAllTheatres} setSection={setSection}/>)
                }
            </div>
    </div>
  )
}

export default TheatreDashboard