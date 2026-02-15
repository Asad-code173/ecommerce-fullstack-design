
import Header from '../header'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Footer from "../Footer"

const Layout = () => {
  return (
    <div className='bg-gray-50 w-full min-h-screen'>
      <Header/>
      <Navbar/>
      <Outlet/>
      <Footer/>
      
    </div>
  )
}

export default Layout
