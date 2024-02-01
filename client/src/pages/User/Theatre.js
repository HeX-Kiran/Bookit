import React from 'react'
import moment from "moment"
import welcomeImage from "../../assets/images/welcome.png"

function Theatre() {
  return (
    <section className='theatre-dashboard'>
        <div className='dashboard-grid'>
            <div className='side-bar flex flex-col items-start gap-24  '>
                {/* Brand name */}
                <h1 className='uppercase font-brand text-5xl text-violet-600 font-medium tracking-widest'>bookit</h1>

                <div className='menu flex flex-col items-start justify-center gap-8'>
                    {/* icon + button */}
                    <div className='flex items-center justify-center gap-4'>
                        <i className="ri-folder-2-line"></i>
                        <button className='text-md'>Dashboard</button>
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <i className="ri-movie-line"></i>
                        <button className='text-md'>Shows</button>
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <i class="ri-logout-box-line"></i>
                        <button className='text-md'>Logout</button>
                    </div>
                </div>
            </div>
            <div className='main-body '>
                {/* Main body nav bar */}
                <div className='nav-bar flex items-center justify-between w-[100%]'>
                    {/* nav-bar title */}
                    <h1 className='text-2xl font-bold'>Dashboard</h1>
                    {/* nav-bar date and search button */}
                    <div className='flex items-center gap-8'>
                        <p className='date font-medium'>{moment(Date.now()).format('Do MMMM YYYY')}</p>
                        <i className="ri-search-line p-2 bg-violet-100 rounded-xl text-blue-700"></i>
                    </div>
                </div>

                {/* Main body welcoming message */}
                <div className=' welcome-msg my-16 flex items-start flex-col gap-4 w-[70%] m-auto p-8 bg-violet-200 rounded-2xl relative' >
                    <div className='w-[70%]'>
                        <h1 className='text-lg text-violet-700 font-bold mb-4'>Welcome Kiran</h1>
                        <p className='text-md font-medium'>We are thrilled to raise the curtains and invite you to a world of captivating performances, enchanting stories, and unforgettable moments.</p>
                    </div>
                    <img src={welcomeImage} alt='welcome person' className=' welcome-img'/>
                </div>

                {/* Movie Cards */}
                <h1 className='text-xl font-bold '>Your theatres</h1>
                <div className='flex items-center justify-between flex-wrap w-[100%] my-4'>
                    {/* Theatre cards */}
                    <div className='theatre-cards bg-violet-600 text-white'>
                        <div className='theatre-card-grid'>
                            <p className='alphabet bg-violet-200 text-xl rounded-xl font-bold text-center text-violet-800 flex items-center justify-center '>M</p>
                            <h1 className='text-lg font-bold uppercase'>Theatre Name</h1>
                            <p className='location text-md font-bold text-violet-200'>Guruvayur</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Theatre