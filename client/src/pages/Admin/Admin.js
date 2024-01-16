import React, { useState } from 'react'
import AdminNavbar from './Components/Navbar'
import AdminBody from './Components/AdminBody'
import Searchbar from '../../components/Searchbar'

function Admin() {
    const [tab,setTab] = useState("movies")
  return (
    <div className='bg-gradient-to-br from-violet-200 to-violet-100 h-[100vh]'>
        <AdminNavbar tab = {tab} setTab={setTab}/>
        <Searchbar/>
        <AdminBody/>
        
    </div>
  )
}

export default Admin