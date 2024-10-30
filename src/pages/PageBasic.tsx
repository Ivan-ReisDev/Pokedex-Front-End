
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const PageBasic = () => {
  return (
    <>
      <Navbar />
        <div className='absolute  top-[61px] w-full p-4 bg-[#ebebeb] overflow-hidden'>            
                <Outlet />
        </div>
    </>
  )
}

export default PageBasic