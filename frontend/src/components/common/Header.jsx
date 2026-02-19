import React from 'react'
import Topbar from '../layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='fixed top-0 z-50 w-full'>
    {/*top bar*/}
    <Topbar />
    {/*navbar bar*/}
    <Navbar />
    {/*cart*/}
    </div>
  )
}

export default Header