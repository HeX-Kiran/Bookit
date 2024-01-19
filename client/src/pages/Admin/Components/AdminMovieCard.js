import React from 'react'
import moment from 'moment';

function AdminMovieCard(props) {
    const {title,description,duration,language,genre,releaseDate,poster} = props.data;
    const {getAllMovies,setCurrMovie,setIsOpen,setType} = props;

    console.log(props);
  return (
    <div className='admin-body-card gap-10 p-8  w-[700px] rounded-xl'>
        <div className='flex items-center justify-between flex-col gap-4'>
          
          <img src={poster} alt="movie pic" width={"400px"} height={"400px"}  style={{backgroundColor:"rgb(221 214 254)"}}></img>
          <p className='italic'>{description}</p>
            
        </div>
        <div className='flex flex-col items-start gap-8 flex-wrap'>
            {/* title of the movie */}
            <h1 className='text-xl font-medium text-black uppercase self-center'>{title}</h1>

              {/* Genre with icons */}
              <div className=' uppercase flex items-center gap-2'>
                <i className="ri-keyboard-box-fill mr-2 text-lg"></i>
                {genre.split(",").map(tag=><span className='tag'>{tag}</span>)}
              </div>
              
              {/* duration with icon */}
              <div className="flex items-center gap-2">
                  <i className="ri-time-fill text-lg"></i>
                  <p className='font-bold text-lg'>{duration} Hours</p>
              </div>

              {/* Language with icons */}
              <div className=' uppercase flex items-center gap-2'>
              <i className="ri-global-fill mr-2 text-lg"></i>
                {language.split(",").map(lang=><span className='tag'>{lang}</span>)}
              </div>
              
               
        </div>
        <div className='action-btns flex items-center justify-between gap-10'>
              <button className='px-8 py-2 rounded-full bg-gradient-to-bl from-violet-800 to-violet-400  text-violet-100 font-medium  text-lg'>Delete</button>
              <p className='text-black font-bold text-md'>Release Date :- {moment(releaseDate).format('MMMM Do YYYY')}</p>  
              <button className='px-8 py-2 rounded-full bg-gradient-to-bl from-violet-800 to-violet-400  text-violet-100 font-medium  text-lg'>Add</button>
        </div>
    </div>
  )
}

export default AdminMovieCard