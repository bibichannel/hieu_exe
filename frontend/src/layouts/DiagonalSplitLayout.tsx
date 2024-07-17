import React from 'react'
import { Link, Outlet } from 'react-router-dom'

type DiagonalSplitLayoutTypes = {
  children?: React.ReactNode
}

const DiagonalSplitLayout: React.FC<DiagonalSplitLayoutTypes> = ({ children }) => {
  return (
    <div className='min-h-screen bg-[#ffffff] text-gray-900 flex justify-center'>
      <div className='w-full lg:w-1/2 p-6 sm:p-12 z-20'>
        <Link to={'/'}>
          <img src='/logo.svg' className='w-mx-auto' />
        </Link>
        {children ? children : <Outlet />}
      </div>
      <div className='flex-1 bg-[#663695] text-center hidden lg:flex'></div>
    </div>
  )
}

export default DiagonalSplitLayout
