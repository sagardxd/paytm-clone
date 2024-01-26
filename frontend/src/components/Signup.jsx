import React, { useState } from 'react'

const Signup = () => {
  const [formData, setformData] = useState({
    fullname: '',
    lastname: '',
    username: '',
    password: ''
  });

  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-200'>
      <div className='flex flex-col m-6 bg-white shadow-2xl rounded-2xl'>
        <div className='flex flex-col justify-center p-8'>
          <span className='font-bold text-4xl mb-3 mr-10'>Welcome To Paytm</span>
          <span className='font-light text-md mb-8'>Enter your details</span>

          <form>
            <div className='py-2'>
              <span className='mb-2 text-md'>First Name</span>
              <input
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='py-2 '>
              <span className='mb-2 text-md'>Last Name</span>
              <input
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='py-2 '>
              <span className='mb-2 text-md'>Email</span>
              <input
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='py-2 mb-4'>
              <span className='mb- text-md'>Password</span>
              <input
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <button
              className='font-bold bg-black text-white p-2  w-full rounded-md
            hover:bg-white hover:text-black hover:border hover:border-gray-300'
            >Sign up</button>
          </form>

        </div>

      </div>
    </div>
  )
}

export default Signup