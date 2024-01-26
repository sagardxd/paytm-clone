import React, { useState } from 'react'

const Signup = () => {
  const [formData, setformData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData)
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-200'>
      <div className='flex flex-col m-6 bg-white shadow-2xl rounded-2xl'>
        <div className='flex flex-col justify-center p-8'>
          <span className='font-bold text-4xl mb-3 mr-10'>Welcome To Paytm</span>
          <span className='font-light text-md mb-8'>Enter your details</span>

          <form onSubmit={submitHandler}>
            <div className='py-2'>
              <span className='mb-2 text-md'>First Name</span>
              <input
                type='text'
                name='firstname'
                value={formData.firstname}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='py-2 '>
              <span className='mb-2 text-md'>Last Name</span>
              <input
                type='text'
                name='lastname'
                value={formData.lastname}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='py-2 '>
              <span className='mb-2 text-md'>Email</span>
              <input
                type='email'
                name='username'
                value={formData.username}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='py-2 mb-4'>
              <span className='mb- text-md'>Password</span>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
            <button type='submit'
              className='font-bold bg-black text-white p-2  w-full rounded-md
            hover:bg-white hover:text-black hover:border hover:border-gray-300'
            >Sign up</button>
            <div className='text-center mt-4'>
              Already have an account?
              <span className='font-bold'> Click here to signin</span>
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}

export default Signup