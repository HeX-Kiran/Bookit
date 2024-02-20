import React, { useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';


function DatePicker({movieID,currDate}) {
  
  let days = [0,1,2,3,4,5,6,7];
  const [date,setDate] = useState(currDate-moment(Date.now()).format("D"));
  const naviagte = useNavigate();

  const handleLeftArrowClick = ()=>{
    // set the correct date
    if(date ===0) setDate(0);
    else setDate(state=>state-1);
   

    //redirect the page with the new date
    if(date-1 >=0)naviagte(`/movie/${movieID}?date=${moment(moment().add(date-1,'d').toDate()).format("YYYY-MM-DD")}`)
    
  }

  const handleRightArrowClick = ()=>{

    //set the current date
    if(date ===7) setDate(7);
    else setDate(state=>state+1);
   

    if(date+1 <=7) //redirect the page with new date
    naviagte(`/movie/${movieID}?date=${moment(moment().add(date+1,'d').toDate()).format("YYYY-MM-DD")}`)
   
  }


  const handleDateClick = (day)=>{
    setDate(day);
    //redirect the page with new date
    naviagte(`/movie/${movieID}?date=${moment(moment().add(day,'d').toDate()).format("YYYY-MM-DD")}`)
  }
  return (
    <div className='date-picker flex items-center justify-between my-20 w-[70%]'>
            <i class="ri-arrow-left-s-line text-2xl cursor-pointer" onClick={handleLeftArrowClick}></i>
            {
              days.map(days=> <div className='py-2 px-4 flex items-center flex-col bg-red-500 text-white rounded-xl text-sm gap-2 cursor-pointer' style={{backgroundColor:date === days ? "#F43F5E":"white",color:date === days ? "white" :"black"}} key={days} onClick={()=>handleDateClick(days)}>{moment().add(days,'d').toDate().toDateString().split(" ").map((val,index)=>{

                if(index === 0) return <h1 className='text-lg'>{val}</h1>
                else if(index === 1) return <p>{val}</p>
                else if(index === 2) return <p className='text-lg font-bold'>{val}</p>
              })}</div>)
            }
            <i class="ri-arrow-right-s-line text-2xl cursor-pointer"onClick={handleRightArrowClick}></i>
            
    </div>
  )
}

export default DatePicker