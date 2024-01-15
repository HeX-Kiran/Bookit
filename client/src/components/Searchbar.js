import React from 'react'

function Searchbar() {
  return (
    <div>
        <div className="search-bar input-container py-10 px-4 glass w-[70vw] m-auto rounded-full">
            <i className="ri-user-fill icon"></i>
            <input type='text' placeholder='Username' className='outline-none p-4  rounded-full w-[40vw] pl-20' />
        </div>
    </div>
  )
}

export default Searchbar