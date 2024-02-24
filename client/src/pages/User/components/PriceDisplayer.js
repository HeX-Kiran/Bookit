import React from 'react'


function PriceDisplayer({totalAmount,setPaymentPage}) {

    
  return (
    <div className='price-display'>
        <button onClick={()=>setPaymentPage(true)}>Pay  Rs.{totalAmount}.00</button>
    </div>
  )
}

export default PriceDisplayer