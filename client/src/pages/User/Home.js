import React, { useEffect } from 'react'

import Navbar from './components/Navbar'
import Title from './components/Title'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { showLoader } from '../../store/loadingSlice'
import Movies from './components/Movies'
import CTA from './components/CTA'

function Home() {

  const isLoading = useSelector(state=>state.loader.status)

  // const onScroll = ()=>{
  //   const movies = document.querySelector(".movies");
    
  //   let howObserver = new IntersectionObserver((entry)=>{
  //     let ent = entry[0];
    
  //     if(ent.isIntersecting){
          
  //       // document.getElementById("movie").scrollIntoView({behavior:"smooth"});
  //      movies.scrollIntoView({behavior:'smooth'})
     
  //     }
  //     // else{
  //     //     window.scrollTo({top:0})
  //     // }
      
  //   },{
      
  //     threshold:0.3,
  //   });
  
  // howObserver.observe(movies);
  
  // }

  

  useEffect(()=>{
   
    
  },[])

  

  
 
  return (
    <div className='home-page'>
      <Loader isLoading={isLoading}/>
      <Navbar/>
      <Title />
      <Movies/>
      <CTA />
    </div>
  )
}

export default Home