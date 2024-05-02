import React from 'react'
import moment from 'moment'

function Tickets({showDetails}) {
    
  return (
    <div className='tickets'>

        <div className='ticket-main bg-violet-500 text-white'>
            <div className='ticket-main-grid'>
                <img src={showDetails?.movie.poster} alt='' className='ticket-img'/>
                    <div className='flex items-center justify-start  gap-4 flex-col'>
                        <h1 className='text-2xl font-bold uppercase text-center'>{showDetails?.movie.title}</h1>
                        <h1 className='text-md '>SEATS :- <span className='font-bold'>{showDetails?.bookedSeats.toString()}</span> </h1>
                        <p className='text-sm '><span className='mx-2'>{moment(showDetails?.date).format("D  MMMM YYYY")} </span>| <span className='mx-2'>{showDetails?.time}</span></p>
                        
                    </div>
            </div>  
             
        </div>  

        <div className='ticket-sub bg-violet-50'>
            <h1 className='text-xl uppercase font-bold'>{showDetails?.screen}</h1>
            <p className='text-md font-bold'>{showDetails?.theatre}</p>
            <p className='text-xs text-violet-300'>Booked on {moment(showDetails?.createdAt).format("D-MM-YY")}</p>
        </div>
    </div>
  )
}

export default Tickets