import React, { useEffect, useState } from 'react'


function SeatLayout({showDetails}) {
   console.log(showDetails);

    const [selectedSeat,setSelectedSeat] = useState(showDetails?.bookedSeats || []);
    const [newlyAddedSeat,setNewlyAddedSeat] = useState([]);
   

    

    const handleSeatClick = (row,col)=>{
        
     
        // if seat already exsist and the seat is clicked again then remove the seat from newlyAddedSeat
        if(newlyAddedSeat.find(val=>val===row+col)){
            const filteredArr = newlyAddedSeat.filter(val=>val!== row+col);
            setNewlyAddedSeat([...filteredArr])
        }
        // if seat doesnt exsist in the newlyAddedSeat then add it in the array
        else{
            setNewlyAddedSeat([...newlyAddedSeat,row+col])
            
        }
        
    }

    
  return (
    <section className='seat-layout'>
        <div className='seats'>
                {
                    
                    showDetails?.totalSeats &&
                    // fix the row and calcluate the columns from the totalSeats and rows
                    Array.from(Array(10).keys()).map((row,index)=>{
                        
                        return <div className='flex items-center justify-between gap-8 '>
                            {/* alphabets as row numbers */}
                            <p className=''>{String.fromCharCode(65+index)}</p>
                            {
                                Array.from(Array(Math.floor(showDetails?.totalSeats/10)).keys()).map((col)=>{
                                    if (selectedSeat.find(val=>val===String.fromCharCode(65+index)+col)) return <div className='seat disabled-seat'>{col}</div>
                                    return <div className='seat' onClick={()=>handleSeatClick(String.fromCharCode(65+index),col)} style={{backgroundColor:newlyAddedSeat.find(val=>(val===String.fromCharCode(65+index)+col))?"rgb(139 92 246)":"white",color:newlyAddedSeat.find(val=>val===String.fromCharCode(65+index)+col)?"white":"black"}}>{col}</div>
                                })
                            }

                        </div>
                        
                        
                    })

                    
                }

                
                {   
                    // if there are any seats left add them
                    // ie suppose totalSeats =100 ,row = 12 column = 8.3 ie 8
                    // row* col = 12 * 8 = 96 seat , we need to add rest 4 seats
                    // so totalSeats - row*col = remaining seats
                    // ie 100-96 = 4
                    (showDetails?.totalSeats && Math.floor((showDetails?.totalSeats/10)) * 10 < showDetails?.totalSeats) && 

                    
                 
                         <div className='flex items-center justify-center gap-8 '>
                            {/* alphabets as row numbers */}
                            <p className=''>{String.fromCharCode(65+13)}</p>
                        {
                            Array.from(Array(Math.ceil((showDetails?.totalSeats -Math.floor(showDetails?.totalSeats/10)*10))  ).keys()).map((col,index)=>{
                                return <div className='seat' onClick={()=>handleSeatClick(String.fromCharCode(65+11),col)}>{col}</div>
                            })
                        }

                    </div>
                    
                }
        </div>
    </section>
  )
}

export default SeatLayout