import React, { useContext } from 'react'
import AppBar from '../Components/AppBar'
import Balance from '../Components/Balance'
import Users from '../Components/Users'
import { AppContext } from '../Context/AppContext'
import EditProfile from '../Components/EditProfile'

const Dashboard = () => {
    const { isEditingProfile } = useContext(AppContext)

    return (
        <div className='bg-gray-100 w-full min-h-screen'>
            <div className="app-bar pt-6 mx-6 sticky top-0 z-50">
                <AppBar/>
            </div>
            
            <div className="pt-10 mx-16">
                <Balance/>
                {
                    isEditingProfile ? <EditProfile/> : <Users/>
                }
            </div>
            
        </div>
    )
}

export default Dashboard
