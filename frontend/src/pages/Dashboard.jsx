  import React, { useEffect, useState } from 'react'
  import Navbar from '../components/Navbar'
  import Balance from '../components/Balance'
  import Search from '../components/Search'
  import Usercard from '../components/Usercard'
  import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userDataAtom } from '../store/atoms/alluserData'

  const Dashboard = () => {

  const [alluser, setalluser] = useRecoilState(userDataAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/bulk", {
          headers: {"Authorization" : 'Bearer ' + localStorage.getItem('token')}
        });
        setalluser(res.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);


    return (
      <div className='flex flex-col min-h-screen bg-white'>
      
        <Navbar/>
        <Balance/>
        <Search/>
        {alluser.map((user) => <Usercard key={user._id} firstname={user.firstName} lastname={user.lastName} />)}
    </div>
    )
  }

  export default Dashboard