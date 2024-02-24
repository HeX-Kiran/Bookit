import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { showLoader,hideLoader } from '../../store/loadingSlice';
import { showToast,TOAST_STATUS } from '../../util';
import { useDispatch, useSelector } from 'react-redux';
import { bookAShow, makeShowPayment } from '../../apicalls/booking';
import { useNavigate } from 'react-router-dom';

function Payment({amount,seats,showDetails}) {

    const user = useSelector(state=>state.user);
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const token = "pk_test_51OmvqbSHTvLkHMIfYtJqSUoX9xsUqsRBG8LWkSc7XBwYI6Tdu9GIQ8ZYAfs2PJtfrPgpqxLGIp4uqx4emETEbwE100swyJtAi0"

   const onToken =async()=>{
        try {
            dispatcher(showLoader());
            const response = await makeShowPayment(token,amount + (10*seats.length));
            if(response.data.success){
                // const the transaction id
                const transactionId = response.data.data;
                // now add new booking using bookAShow Api
                if(Object.keys(showDetails).length > 0 && Object.keys(user).length>0){
                    // Now add the new booking into db
                    const response = await bookAShow({showID:showDetails?._id,userID:user?._id,transactionId,bookedSeats:seats});
                    // after adding the booking , we need to updated the show seats with the updated seats
                    if(response.data.success){
                        // update the seats of the shows with new seats
                        showToast(TOAST_STATUS.SUCCESS,"Show booked successfully");
                        // navigate to home page
                        navigate("/")
                    }
                    else{
                        showToast(TOAST_STATUS.ERROR,response.data.message);
                    }
                }
                else{
                    showToast(TOAST_STATUS.WARNING,"Please Refresh the page")
                }
                dispatcher(hideLoader());
            }
            
            else{

            }
        } catch (error) {
            dispatcher(hideLoader());
            showToast(TOAST_STATUS.ERROR,"Something went wrong")
        }
   }


  return (
    Object.keys(showDetails).length > 0 && 
    <section className='payment-page'>
        <div className='ticket'>
            {/* Heading */}
            <h1 className='text-violet-500 uppercase font-bold text-lg '>Booking summary</h1>
            {/* Seat and theatre Details */}
            <div className='ticket-seat-details'>
                <p><span className='uppercase font-bold'>{showDetails?.name}</span> :- {seats.toString()} ({seats.length} Tickets)</p>
                <p className=' '>Rs.{amount}.00</p>
            </div>
            {/* Theatre Details */}
            <p className=''>{showDetails?.theatre.name} <span className='text-gray-500'>({showDetails?.theatre.location})</span></p>
            {/* Convience charge */}
            <div className=' extra-fee flex items-center justify-between w-[100%]'>
                <p className='text-sm text-gray-800'> Convenience fees</p>
                <p className='text-sm'>Rs.{10 * seats.length}.00</p>
            </div>
            {/* Total amount */}
            <div className='sub-total'>
                <h1 className='text-xl'>Sub-total</h1>
                <p className='font-bold text-green-700'>Rs.{amount + 10*seats.length}.00</p>
            </div>
            
                

            <div className='payment-button '>
                <StripeCheckout token={onToken} stripeKey="pk_test_51OmvqbSHTvLkHMIfYtJqSUoX9xsUqsRBG8LWkSc7XBwYI6Tdu9GIQ8ZYAfs2PJtfrPgpqxLGIp4uqx4emETEbwE100swyJtAi0"  >

                    <button className=' '><span className='mr-2'>PAY</span> Rs.{amount + 10*seats.length}.00 </button>


                </StripeCheckout>
            </div>        
            
                    
                    
              
            
        </div>

        
    </section>
  )
}

export default Payment