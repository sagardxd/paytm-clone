import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../store/atoms/alluserData';


const Search = () => {

  const [searchData, setsearchData] = useState('');
  const setAllUser = useSetRecoilState(userDataAtom);

  useEffect(() => {
    const fetchdata = async() => {
      try {
        const res =  await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchData}`, {
          headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
        });
        
        //updating the all user state
        console.log(res.data.user);
        setAllUser(res.data.user)
        
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata();
  }, [searchData]);

  return (
    <div className='w-full px-6 font-bold text-xl flex flex-col'>
      <div>Users</div>
      <input
        className='bg-white border font-normal text-sm py-3 border-gray-300 rounded-md mt-3 placeholder:text-gray-400 pl-[14px] placeholder:text-sm'
        placeholder='Search users..'
        value={searchData}
        onChange={(e) => {setsearchData(e.target.value), console.log(searchData)} }
      />
    </div>
  )
}

export default Search
