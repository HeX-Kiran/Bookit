import React from 'react'

function AdminModal({type,isOpen}) {
  return (
    <div className='modal-box absolute left-0 top-0 h-[100vh] w-[100%] transparent z-10'>
        <div className='form bg-gradient-to-bl from-violet-800 to-violet-400 text-violet-100'>
            <h1 className='heading text-2xl font-medium uppercase'>Add movie</h1>
            <form className=' flex flex-col items-center justify-between mt-16 gap-2' action='' method='post' onSubmit={"onSubmit"}>

                        {/* title */}
                        <div className="input-container">
                            <i className="ri-user-fill icon"></i>
                            <input type='text' placeholder='Title' className='input-field outline-none p-4  rounded-xl input-border' value={""} onChange={"(e)=> setUsername(e.target.value)"}/>
                        </div>
                        {/* description */}
                        <div className="input-container">
                            <i className="ri-mail-fill icon"></i>
                            <textarea  placeholder='description'  className='input-field outline-none p-4  rounded-xl input-border' value={""} onChange={"(e)=>setEmail(e.target.value)"}/>
                        </div>

                        {/* Duration,Genre,Language */}

                        <div className='flex item-center justify-around multi-input gap-2'>
                            {/* Duration */}
                            <div className="input-container">
                                <i className="ri-key-fill icon"></i>
                                <input type='number' placeholder='duration' className='input-field outline-none p-4 rounded-xl input-border w-[200px]' value={""} onChange={"(e)=>setPassword(e.target.value)"}/>
                            </div>

                            {/* Genre */}
                            <div className="input-container">
                                <i className="ri-key-fill icon"></i>
                                <input type='text' placeholder='genre' className='input-field outline-none p-4 rounded-xl input-border' value={""} onChange={"(e)=>setPassword(e.target.value)"}/>
                            </div>
                            {/* Language */}
                            <div className="input-container">
                                <i className="ri-key-fill icon"></i>
                                <input type='text' placeholder='language' className='input-field outline-none p-4 rounded-xl input-border' value={""} onChange={"(e)=>setPassword(e.target.value)"}/>
                            </div>
                        </div>
                        {/* release date */}
                        <div className="input-container">
                            <i className="ri-key-fill icon"></i>
                            <input type='date' placeholder='release date' className='input-field outline-none p-4 rounded-xl input-border' value={""} onChange={"(e)=>setPassword(e.target.value)"}/>
                        </div>
                        {/* Poster url */}
                        <div className="input-container">
                            <i className="ri-key-fill icon"></i>
                            <input type='url' placeholder='poster url' className='input-field outline-none p-4  rounded-xl input-border' value={""} onChange={"(e)=>setConfirmPassword(e.target.value)"}/>
                        </div>
                        
                        
                        
                        <input type='submit' className='p-4 cursor-pointer rounded-full w-[500px] font-bold text-violet-800 bg-violet-50 text-xl hover:bg-violet-500 input-border' />

                       
                        

                        
                    </form>
        </div>
        
    </div>
  )
}

export default AdminModal