import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AppBar = () => {
    const [loginUser, setLoginUser] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchSignedInUser = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log('Token from Local Storage:', token)

                const response = await axios.get('http://localhost:3000/api/v1/user/me', {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                }) 
                setLoginUser(response.data)
                console.log('Response Data:', response.data); 
                
            } catch (error) {
                console.log('Error fetching User data: ', error)
            } 
        }

        fetchSignedInUser()
    }, [])

    const handleSignOut = () => {
        try {
            localStorage.removeItem('token')
            navigate('/signin')

        } catch (error) {
            console.log('Error signing out: ', error)
        }
    }

    return (
        <div className='flex bg-white justify-between h-20 p-4 rounded-full shadow-lg shadow-gray-300'>
            <div className="left ml-6 text-2xl font-medium h-full flex flex-col justify-center">
                SimpliPay
            </div>

            <div className="right flex space-x-5 items-center">
                <div className="hello text-xl">
                    Hello {loginUser?.firstName || 'Error'}
                </div>

                <div className="user rounded-full bg-gray-300 h-12 w-12">
                    <div className="flex justify-center mt-2 font-normal  text-xl">
                        {loginUser?.firstName?.[0] || 'X'}
                    </div>
                </div>

                <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Sign Out
                </button>
            </div>

        </div>
    )
}

export default AppBar
