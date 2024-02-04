import React, { useCallback, useEffect, useState } from 'react'
import { TOAST_STATUS, showToast } from '../../../util'
import { THEATRE_STATUS } from '../../../util';
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../store/loadingSlice';
import { getAllShowByTheatreId } from '../../../apicalls/shows';
import moment from "moment"

function ShowCard({theatre}) {
    const [shows,setShow] = useState([]);
    const dispatcher = useDispatch()

    const getShowByTheatreID =  useCallback(async()=>{
        try{
            dispatcher(showLoader())
            const response   = await getAllShowByTheatreId(theatre._id)
            dispatcher(hideLoader());
            if(response.success){
                // showToast(TOAST_STATUS.SUCCESS,"Shows fetched successfully");
                setShow(response.data)
            }
            else{
                showToast(TOAST_STATUS.ERROR,response.message)
            }
      
          } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Something went wrong")
          }
    },[dispatcher,theatre])


    useEffect(()=>{
        getShowByTheatreID()
    },[getShowByTheatreID])
  return (
    <div className='show-card w-[100%] bg-violet-50 text-black flex items-center flex-col gap-8 rounded-xl p-8' id={theatre._id}>
        {/* Theatre name and location */}
        <div className='show-header flex items-center justify-between w-[100%]'>
            <h1 className='t-name text-2xl font-bold uppercase'>{theatre.name}</h1>
            <h3 className='t-location text-md font-bold uppercase'>{theatre.location}</h3>
        </div>

        {/* If there is no show for a theatre  */}
        {
            shows.length === 0 
            &&
            <>
            <h1 className='font-bold text-2xl uppercase'>Add shows</h1>
            <i className= {theatre.isActive === THEATRE_STATUS.ACTIVE ? " ri-delete-bin-line p-2  bg-red-500 text-white rounded-xl text-2xl text-center w-[50%] hover:scale-105 " : "btn-disable ri-delete-bin-line p-2  bg-red-100 text-gray-300 rounded-xl text-2xl text-center w-[50%] " } onClick={()=>console.log("Clicked")}  ></i>
            <i className={theatre.isActive === THEATRE_STATUS.ACTIVE  ? " ri-pencil-line p-2  bg-green-500 text-white rounded-xl text-2xl text-center w-[50%] hover:scale-105 " : "btn-disable ri-pencil-line p-2  bg-green-100 text-gray-300 rounded-xl text-2xl text-center w-[50%]  " } onClick={()=>{console.log("clicked");}}></i>
            </>

            
            
        }
        
        {/* Shows of the theatre */}
        <div className='flex items-center justify-between flex-col w-[100%] gap-4'>
            {
                shows.map(show=>{
                    // Show details
                    return <div className='show-detail-card py-8 px-8 bg-violet-200 rounded-xl flex items-center justify-between w-[100%] flex-wrap'>
                        <h1 className='font-medium text-xl'>{show.name}</h1>   
                        <p className='font-medium text-md'>{show.movie.title}</p>
                        <p className='font-light text-sm'>{moment(show.date).format('Do MMMM YYYY')}</p>
                        <p className='font-bold text-sm text-rose-500'>{show.time}</p>
                        <p className='font-bold text-sm text-green-800 '>{show.ticketPrice} rupees</p>
                        <i className= " ri-delete-bin-line p-2  bg-red-500 text-white rounded-xl text-xl text-center hover:scale-105 "  onClick={""}></i>
                        <i className=" ri-pencil-line p-2  bg-green-500 text-white rounded-xl text-xl text-center hover:scale-105 "  onClick={""}></i>
                    </div>
                })
            }
        </div>

        {/* Total number of shows */}
        <h1 className='text-center w-[100%] font-bold text-lg uppercase text-gray-600'>Total shows - {shows.length}</h1>
        
    </div>
  )
}

export default ShowCard