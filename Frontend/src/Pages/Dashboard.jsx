import React from 'react'
import AppBar from '../Components/AppBar'
import Balance from '../Components/Balance'
import Users from '../Components/Users'

const Dashboard = () => {
  return (
    <div className='bg-gray-100 w-full h-screen'>
      <div className="app-bar pt-6 mx-6">
        <AppBar/>
      </div>
      
      <div className="pt-10 mx-16">
        <Balance/>
        <Users/>
      </div>
      
    </div>
  )
}

export default Dashboard
