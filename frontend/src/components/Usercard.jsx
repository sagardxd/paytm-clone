import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Usercard = ({firstname, lastname, id}) => {
  const navigate = useNavigate();
  return (
    <div className='w-full p-6 flex justify-between'>
      <div className='flex items-center'>
        <div className='rounded-full bg-gray-300 w-10 h-10 text-center inline-flex items-center justify-center text-lg font-medium '>
          U1
        </div>
        <div className='ml-3 text-lg font-semibold'>{firstname} {lastname}</div>
      </div>
      <button onClick={()=> {navigate(`/send?id=${id}&name=${firstname}`)}} className='bg-black text-white px-4 rounded-md text-sm '>Send Money</button>

    </div>
  )
}

export default Usercard
