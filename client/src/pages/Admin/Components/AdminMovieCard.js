import React from 'react'
import moment from 'moment';

function AdminMovieCard(props) {
    const {title,description,duration,language,genre,releaseDate,poster} = props.data

    console.log(props);
  return (
    <div className='flex items-center justfiy-between gap-10 p-8 bg-violet-500 w-[600px] rounded-xl'>
        <div className='flex items-center flex-col gap-4'>
            <img src={poster} alt="movie pic" width={"200px"} height={"200px"}  style={{backgroundColor:"rgb(221 214 254)"}}></img>
             <div className='flex items-center justify-between gap-10'>
                <button className='px-8 py-2 rounded-full bg-gradient-to-bl from-violet-800 to-violet-400  text-violet-100 font-medium  text-lg'>Delete</button>
                <button className='px-8 py-2 rounded-full bg-gradient-to-bl from-violet-800 to-violet-400  text-violet-100 font-medium  text-lg'>Add</button>
             </div>
        </div>
        <div className='flex flex-col items-center gap-4'>
            <h1 className='text-2xl font-medium text-violet-50'>{title}</h1>
            <span className='text-violet-50'>{moment(releaseDate).format('MMMM Do YYYY')}</span><span>{genre}</span>
            <p>{duration}</p>
            <p>{language}</p>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default AdminMovieCard