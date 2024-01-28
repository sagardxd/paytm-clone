import React from 'react'
import Navbar from '../components/Navbar'
import Balance from '../components/Balance'
import Search from '../components/Search'
import Usercard from '../components/Usercard'

const Dashboard = () => {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <Navbar/>
      <Balance/>
      <Search/>
      <Usercard/>
  </div>
  )
}

export default Dashboard