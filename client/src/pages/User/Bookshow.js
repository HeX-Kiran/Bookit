import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { showLoader,hideLoader } from '../../store/loadingSlice';
import { showToast,TOAST_STATUS } from '../../util';
import Loader from '../../components/Loader';
import { getShowById,getAllShowByMovieId } from '../../apicalls/shows';
import moment from 'moment';
import SeatLayout from './components/SeatLayout';
import Screen from './components/Screen';


function Bookshow() {

    // get show id from url 
    const {id} = useParams();
    // state to store the showDetails
    const [showDetails,setShowDetails] = useState({})
    const [MovieDetails,setMovieDetials] = useState({});
    const [theatreDetails,setTheatreDetails] = useState({});
    const [shows,setShow] = useState([]);
    
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state=>state.loader.status);


    // function to fetch show details from show ID
    const getShowByID = async()=>{
        try{
            dispatcher(showLoader())
            const response  = await getShowById(id);
            
            
            if(response.success){
                // showToast(TOAST_STATUS.SUCCESS,"Shows fetched successfully");
                setShowDetails(response.data);
                setMovieDetials(response.data.movie);
                setTheatreDetails(response.data.theatre)
                // now we need to get all the shows of particular theatre having the particular movie

                const data = await getAllShowByMovieId(response.data.movie._id,moment(response.data.date).format("YYYY-MM-DD"));
                if(data.success){
                    const filteredTheatre = data.data.filter(theatre=>theatre._id === response.data.theatre._id);
                   
                    setShow(filteredTheatre[0].shows);
                }
                else{
                    showToast(TOAST_STATUS.ERROR,data.message)
                }

                dispatcher(hideLoader());
            }
            else{
                showToast(TOAST_STATUS.ERROR,response.message)
                dispatcher(hideLoader());
            }
      
          } catch (error) {
            dispatcher(hideLoader());
            showToast(TOAST_STATUS.ERROR,"Something went wrong")
          }
    }


    // handle show time
    const handleShowTimeClick = (id)=>{
        navigate(`/movie/book-show/${id}`)
    }

   


    useEffect(()=>{
        getShowByID(); 
    },[id])

   

  return (
    <section className='book-show'>
        <Loader isLoading={isLoading} />
        {/* Nav bar with show details */}
        <div className='show-details'>
                {/* Movie name */}
                <h1 className='text-3xl font-bold uppercase text-violet-700'><i className="ri-arrow-left-s-line text-black mr-4 cursor-pointer" onClick={()=> navigate(`/movie/${MovieDetails?._id}?date=${moment(showDetails?.date).format("YYYY-MM-DD")}`)}></i>{MovieDetails.title}</h1>
                <div className='theatre-details'>
                    <p>{showDetails.name}, </p>
                    <p>{theatreDetails.name}: {theatreDetails.location} </p>
                    <p>| {moment(showDetails.date).format("D MMMM")}, </p>
                    <p className='text-red-500'>{showDetails.time}</p>
                </div>
        </div>
        {/* Shows and its timing */}
        <div className='show-timing bg-violet-50'>
                {
                    shows?.map(show=>{
                        return <div className='theatre-show-details cursor-pointer' style={{backgroundColor : show._id === showDetails._id?"#2DC492":"white",color:show._id === showDetails._id?"white":"#2DC492",border:show._id === showDetails._id?"":"1px solid #00000042"}} onClick={()=>handleShowTimeClick(show._id)}>
                                    <h1>{show?.time}</h1>
                                </div>
                    })
                }
        </div>

        {/* Seat layout */}
        <SeatLayout showDetails={showDetails}/>
        <Screen />
    </section>
  )
}

export default Bookshow