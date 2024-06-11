import React from 'react'
import NavBar from './navbar/NavBar'
import Footer from './footer/Footer'
import {Outlet} from 'react-router-dom'

function RouteLayout() {
  return (
    <div>
      <NavBar/>
        <div style={{minHeight:'80vh'}}>
            <Outlet />
        </div>
        <Footer/>
    </div>
  )
}

export default RouteLayout