import React from 'react'

function Title() {
  return (
    <div className=''>
            <h1 className='user-page-title' >Unleash the visuals</h1>
            <div className=' user-page-subtitle'>
                    <p className='text-center '>Looking for</p>
                    <p>the best ticket price in town?</p>
                    {/* <p className='text-3xl text-center'>book your tickets in seconds...</p> */}
            </div>

            <div className='flex items-center justify-around my-32'>
                <button className='outline-none py-4 px-8 bg-white rounded-xl font-bold'>Learn more</button>

                <button className='py-4 px-8 bg-rose-500 rounded-xl font-bold text-white '>Book tickets</button>
            </div>
    </div>
  )
}

export default Title