import React from 'react'
import { useRecoilState  } from 'recoil';
import { signinFormdataAtom } from '../store/atoms/userlogin';
import { Link } from "react-router-dom";
import axios from 'axios';

const Signin = () => {
  const [formData, setFormData] = useRecoilState(signinFormdataAtom);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const submitHandler= async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/signin', formData);
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token)
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
            >Sign in</button>
            <div className='text-center pt-4'>
              Don't have an account? 
             
              <Link className='font-semibold underline' to="/signup">Sign Up</Link>
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}

export default Signin