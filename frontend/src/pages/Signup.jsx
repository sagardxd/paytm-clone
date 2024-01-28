import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { signupFormdataAtom } from '../store/atoms/user';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setformData] = useRecoilState(signupFormdataAtom);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/user/signup', formData);
    } catch (error) {
      console.error('Error during signup:', error);
    }
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
              <Link className='font-semibold underline' to="/">Sign In</Link>
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}

export default Signup