import React from 'react'
import ShowCard from './ShowCard'
import showImage from '../../../assets/images/show.png'

function Show({theatres}) {
    
  return (
    <section className='shows my-16'>
        <div className=' welcome-msg my-16 flex items-start flex-col gap-4 w-[70%] m-auto p-8 bg-violet-200 rounded-2xl relative' >
                    <div className='w-[70%]'>
                        <h1 className='text-lg text-violet-700 font-bold mb-4'>Hi Kiran</h1>
                        <p className='text-md font-medium'>More shows means more bussiness.Customize and add new shows to your theatres.</p>
                    </div>
                    <img src={showImage} alt='welcome person' className=' show-img'/>
        </div>
        <div className='show-cards flex items-center justify-between flex-col gap-8'>
            {
                theatres.map(theatre=>{
                    
                    return <ShowCard theatre={theatre}/>
                })
            }
        </div>
    </section>
  )
}

export default Show