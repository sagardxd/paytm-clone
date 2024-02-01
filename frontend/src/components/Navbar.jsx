import React from 'react'

const Navbar = ({firstname}) => {
  return (
    <div className='w-full flex justify-between p-5 items-center border border-gray-300'>
      <div className='font-bold text-2xl'>Payments App</div>
      <div className='flex justify-center items-center gap-2 font-medium text-lg'>Hello, {firstname} 
      <div className='rounded-full bg-gray-300 w-10 h-10 text-center inline-flex items-center justify-center text-lg font-medium '>{firstname[0]}
      </div>
      </div>

    </div>
  )
}

export default Navbar
