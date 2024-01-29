import React from 'react'

function Title() {

  const handleBookBtn = ()=>{
    
    document.querySelector(".movies").scrollIntoView({behavior:"smooth"})
  }

  return (
    <div className='title'>
            <h1 className='user-page-title' >Unleash the visuals</h1>
            <div className=' user-page-subtitle'>
                    <p className='text-center '>Looking for</p>
                    <p className='text-center'>the best ticket price in town?</p>
                    {/* <p className='text-3xl text-center'>book your tickets in seconds...</p> */}
            </div>

            <div className='flex items-center justify-around my-32'>
                <button className='outline-none py-4 px-8 bg-white rounded-xl font-bold transition-all hover:scale-110 hover:bg-black hover:text-white'>Learn more</button>

                <button className='py-4 px-8 bg-rose-600 rounded-xl font-bold text-white transition-all hover:scale-110 hover:bg-rose-500' onClick={handleBookBtn}>Book tickets</button>
            </div>
    </div>
  )
}

export default Title