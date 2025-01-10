import React, { useContext, useState } from 'react'
import AppBar from '../Components/AppBar'
import Balance from '../Components/Balance'
import Users from '../Components/Users'
import Spinner from '../Components/Spinner'
import { AppContext } from '../Context/AppContext'
import EditProfile from '../Components/EditProfile'

const Dashboard = () => {
    const [loading, setLoading] = useState(false)
    const { isEditingProfile } = useContext(AppContext)

    if (loading) {
        setTimeout(() => {
            setLoading(true)
        }, 3000)
        return (
            <Spinner/>
        )
    }

    return (
        <div className='bg-gray-100 w-full min-h-screen'>
            <div className="app-bar pt-6 mx-6">
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
