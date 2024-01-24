import React, { useEffect } from 'react'

import Navbar from './components/Navbar'
import Title from './components/Title'
import Loader from '../../components/Loader'
import { useDispatch } from 'react-redux'
import { showLoader } from '../../store/loadingSlice'

function Home() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(showLoader())
  })
 
  return (
    <div className='home-page'>
     
      <Navbar/>
      <Title />
    </div>
  )
}

export default Home