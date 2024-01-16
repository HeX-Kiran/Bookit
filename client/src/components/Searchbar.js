import React from 'react'

function Searchbar() {
  return (
    <div>
        <div className="flex items-center   search-bar  py-10 px-4 bg-gradient-to-bl from-violet-500 to-violet-400 w-[60vw] m-auto rounded-full ">
            
           <div className='w-[80%] input-container'>
              <i className="ri-search-line text-xl text-violet-800 icon"></i>
                {/* Search input */}
              <input type='text' placeholder='Search movies' className='outline-none p-4 rounded-full w-[60%] pl-20 bg-violet-100 ' />
              {/* search button */}
              <button className='-ml-10 px-10 py-2 rounded-full bg-gradient-to-bl from-violet-800 to-violet-400 text-violet-100 font-medium text-lg'>Search</button>
            </div>
           
            {/* Add movie button */}
            <button className='ml-10 px-8 py-2 rounded-full bg-gradient-to-bl from-violet-800 to-violet-400  text-violet-100 font-medium  text-lg'>Add movie</button>

        </div>
    </div>
  )
}

export default Searchbar