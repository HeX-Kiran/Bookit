import React, { useEffect } from 'react'

import Navbar from './components/Navbar'
import Title from './components/Title'
import Loader from '../../components/Loader'
import { useSelector } from 'react-redux'

import Movies from './components/Movies'
import CTA from './components/CTA'
import Footer from './components/Footer'

function Home() {

  const isLoading = useSelector(state=>state.loader.status)



  

  useEffect(()=>{
   
    
  },[])

  

  
 
  return (
    <div className='home-page'>
      <Loader isLoading={isLoading}/>
     
      <Navbar/>
      <Title />
      <Movies/>
      <CTA />
      <Footer />
    </div>
  )
}

export default Home