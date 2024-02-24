import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'


function BookshowNavBar({showDetails,theatreDetails,movieDetails}) {
    

    const navigate = useNavigate();
  return  (
    Object.keys(showDetails).length > 0 &&
    <div className='book-show-nav-bar flex items-center justify-between'>
        {/* Show details */}
            <div className='show-details'>
                {/* Movie name */}
                <h1 className='text-3xl font-bold uppercase text-violet-700'><i className="ri-arrow-left-s-line text-black mr-4 cursor-pointer" onClick={()=> navigate(`/movie/${movieDetails?._id}?date=${moment(showDetails?.date).format("YYYY-MM-DD")}`)}></i>{movieDetails.title}</h1>
                <div className='theatre-details'>
                    <p>{showDetails.name}, </p>
                    <p>{theatreDetails.name}: {theatreDetails.location} </p>
                    <p>| {moment(showDetails.date).format("D MMMM")}, </p>
                    <p className='text-red-500'>{showDetails.time}</p>
                </div>
            </div>

        {/* Ticket price */}
            <div className='ticket-price '>
                <i className="ri-ticket-2-line text-violet-700"></i>
                <p className='font-bold'>Rs.{showDetails?.ticketPrice}.00</p>
            </div>
    </div>
  )
}

export default BookshowNavBar