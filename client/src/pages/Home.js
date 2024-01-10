import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const user = useSelector(state=>state.user)
  return (
    <div className='text-orange-900	'>{user.email}</div>
  )
}

export default Home