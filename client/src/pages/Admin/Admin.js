import React, { useState } from 'react'
import AdminNavbar from './Components/Navbar'
import AdminBody from './Components/AdminBody'
import Searchbar from '../../components/Searchbar'

function Admin() {
    const [tab,setTab] = useState("movies")
  return (
    <div className=''>
        <AdminNavbar tab = {tab} setTab={setTab}/>
        {/* <Searchbar/> */}
        <AdminBody/>
        
    </div>
  )
}

export default Admin