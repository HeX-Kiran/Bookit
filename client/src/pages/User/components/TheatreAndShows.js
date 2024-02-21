import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { showLoader,hideLoader } from '../../../store/loadingSlice'
import { showToast,TOAST_STATUS } from '../../../util';
import { getAllShowByMovieId } from '../../../apicalls/shows';
import { useNavigate } from 'react-router-dom';
function TheatreAndShows({movieID,date}) {
  

    const dispatcher = useDispatch();
    const [theatres,setTheatre] = useState([])
    const navigate = useNavigate();

    const getTheatreAndShowsByMovieID = async()=>{
        try {
            dispatcher(showLoader());
            const data = await getAllShowByMovieId(movieID,date);
            if(data.success){
                setTheatre(data.data);
            }
            else{
                showToast(TOAST_STATUS.ERROR,data.message)
            }
            
            dispatcher(hideLoader());
          } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Internal error")
            dispatcher(hideLoader());
          }
    }

    const handleShowTimeClick = (id)=>{
        navigate(`/movie/book-show/${id}`)
    }

    useEffect(()=>{
        getTheatreAndShowsByMovieID();
       
    },[date,movieID])
  return (
    <div className='theatre-shows my-24 flex items-start gap-16 flex-col'>
        {   
            theatres.length > 0 
            ?
            theatres.map(theatre=>{
                return <div className='show-card w-[70%] bg-white text-black flex items-start flex-col  gap-8 rounded-xl p-8' >
                    {/* Theatre name and location */}
                    <div className='show-header flex items-center justify-between w-[100%]'>
                        <h1 className='t-name text-2xl font-bold uppercase'>{theatre.name}</h1>
                        <h3 className='t-location text-md font-bold uppercase'>{theatre.location}</h3>
                    </div>
                    {/* Shows of respective theatre */}
                    <div className='show-time flex items-center justify-between gap-8'>
                        {theatre.shows.map(show=>{
                            return <div className='theatre-show-details cursor-pointer' onClick={()=>handleShowTimeClick(show._id)}>
                                <h1>{show?.time}</h1>
                            </div>
                        })}
                    </div>
                </div>
            })
            :
            <div className='no-show-banner w-[70%]'>
                <h1 className='text-4xl text-black text-center'>Oops! No shows available</h1>
            </div>
        }
        
    </div>
  )
}

export default TheatreAndShows