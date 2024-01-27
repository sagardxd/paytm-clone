import React from 'react'

const Search = () => {
  return (
    <div className='w-full px-6 font-semibold text-xl flex flex-col'>
      <div>Users</div>
      <input
        className='bg-slate-200 border font-normal text-sm py-3 border-gray-300 rounded-md mt-3 placeholder:text-gray-400 pl-[14px] placeholder:text-sm'
        placeholder='Search users..'

      />
    </div>
  )
}

export default Search
