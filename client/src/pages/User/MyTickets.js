import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { showLoader,hideLoader } from '../../store/loadingSlice';
import { showToast,TOAST_STATUS } from '../../util';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../../apicalls/booking';
import { getShowById } from '../../apicalls/shows';
import { useParams } from 'react-router-dom';
import Tickets from './components/Tickets';
import Loader from '../../components/Loader';


function MyTickets() {

    const dispatcher = useDispatch();
    const {id} = useParams()
    const[tickets,setTickets] = useState([])
    const isLoading = useSelector(state=>state.loader.status);
    


    const getAllTickets = async()=>{
        try {
            
            dispatcher(showLoader());
            // get all tickets of user
            const response = await getTickets(id);
            
            if(response.data.success){
                const bookingDetails = response.data.data;
                // after getting the tickets we need to find the show details of each user
                const showDetails = await getShowDetailsFromBookingDetails(bookingDetails);
                console.log(showDetails);
                setTickets(showDetails)
               
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

    // function to get show details from booking details
    const getShowDetailsFromBookingDetails = (bookingDetails)=>{
        let totalLength = 0;
        // return a promise
        return new Promise((resolve,reject)=>{
            try {
                let ticketDetails = []
                // from each bookingDetails get the show details
                bookingDetails.forEach((details)=>{
                    Promise.resolve(getShowById(details.show))
                    // take the result of showDetials and concatnate with booking details
                        .then(val=>{
                            ticketDetails.push({...val.data,...details});
                            totalLength++;

                            if(totalLength === bookingDetails.length) resolve(ticketDetails)

                        })
                        .catch(err=>{
                            showToast(TOAST_STATUS.ERROR,"Internal Error.Please refresh")
                            reject(err.message)
                        })
                })


            } catch (error) {
                showToast(TOAST_STATUS.ERROR,"Internal Error.Please refresh")
            }  
        })
    }

    useEffect(()=>{
        getAllTickets()
        
        
    },[id])


  return (
    <section className='my-tickets '>
        <Loader isLoading={isLoading} />
        <Navbar />
        {
            tickets.length >0
             &&
             <div className='ticket-body'>
                <h1 className='text-4xl font-bold'>My Tickets</h1>
                {
                    tickets.map(ticket=><Tickets showDetails={ticket}/>)
                }
            </div>

       
        }
        
    </section>
  )
}

export default MyTickets