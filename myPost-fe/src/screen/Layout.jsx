import React from 'react'
import Navigation from './Navigation'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-screen h-auto'>
        <div className='fixed bottom-0 w-[80%] left-1/2  transform -translate-x-1/2  '  >
            <Navigation/>
        </div>
        <div>
            {/* Outlet */}
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout