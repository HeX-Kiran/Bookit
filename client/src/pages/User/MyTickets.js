import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { showLoader,hideLoader } from '../../store/loadingSlice';
import { showToast,TOAST_STATUS } from '../../util';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../../apicalls/booking';
import { getShowById } from '../../apicalls/shows';
import { useParams } from 'react-router-dom';


function MyTickets() {

    const dispatcher = useDispatch();
    const {id} = useParams()
    const[tickets,setTickets] = useState([])
    


    const getAllTickets = async()=>{
        try {
            
            dispatcher(showLoader());
            // get all tickets of user
            const response = await getTickets(id);
            console.log(response.data.data);
            if(response.data.success){
                const bookingDetails = response.data.data;
                // after getting the tickets we need to find the show details of each user
                 const ticketDetails = bookingDetails.map(async(details)=>{
                    const showDetails = await getShowById(details.show)
                    
                    return {...showDetails.data,...details}
                })
               
            }
            else{
                showToast(TOAST_STATUS.ERROR,response.data.message)
            }
            
            dispatcher(hideLoader());
          } catch (error) {
            showToast(TOAST_STATUS.ERROR,"Internal error")
            dispatcher(hideLoader());
          }
    }

    useEffect(()=>{
        getAllTickets()
        console.log(tickets);
        
    },[id])


  return (
    <section className='my-tickets '>
        <Navbar />
        {
            tickets.length >0
             &&
             <div className='ticket-body'>
                <h1 className='text-3xl font-bold'>My Tickets</h1>
                {tickets.map(val=><h1>{val.name}</h1>)}
            </div>

       
        }
        
    </section>
  )
}

export default MyTickets