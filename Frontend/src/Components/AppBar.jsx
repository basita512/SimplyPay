import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const AppBar = () => {
    const [loginUser, setLoginUser] = useState(null)
    const navigate = useNavigate()
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const { handleEditProfile } = useContext(AppContext)
    
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
        clearTimeout(timeoutId)
    }, [])

    const handleSignOut = () => {
        try {
            localStorage.removeItem('token')
            navigate('/signin')

        } catch (error) {
            console.log('Error signing out: ', error)
        }
    }

    const handleOpenDropDown = () => {
        setIsDropDownOpen(true)
        startTimeout(timeoutId)
    }

    const handleCloseDropDown = () => {
        setIsDropDownOpen(false)
        setTimeout()
    }

    let timeoutId 
    const startTimeout = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            setIsDropDownOpen(false)
        }, 5000)
    }

    const handleUserInteraction = () => {
        clearTimeout(timeoutId)
        startTimeout()
    }

    return (
        <div className='flex bg-white justify-between h-20 p-4 rounded-full shadow-lg shadow-gray-300 '>
            <div className="left ml-6 text-2xl font-medium h-full flex space-x-4 justify-center">
                <img src='../../public/logo.png' className='' alt="SimplyPay Logo" />
                <p className='mt-2'>SimplyPay</p>
            </div>

            <div className="right flex space-x-5 items-center">
                <div className="hello text-xl">
                    Hello {loginUser?.firstName || 'Error'}
                </div>

                <div className="user rounded-full bg-gray-300 hover:bg-gray-400 duration-300 h-12 w-12 relative">
                    <div className="flex justify-center mt-2 font-normal text-xl"
                        onClick={() => {setIsDropDownOpen(!isDropDownOpen)}}>
                            {loginUser?.firstName?.[0] || 'X'}
                    </div>
                </div>

                {
                    isDropDownOpen && (
                        <div className="absolute right-24 top-10 mt-2 w-64 bg-white rounded-md shadow-lg shadow-gray-300"
                            onMouseEnter={handleUserInteraction}
                            onMouseLeave={startTimeout}>
                            <div className="p-4 border-b">
                                <p className="font-bold">{loginUser?.firstName || 'Error'} {loginUser?.lastName}</p>
                                <p className="text-sm text-gray-500">{loginUser?.username || 'error'}</p>
                            </div>
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {handleEditProfile(); handleCloseDropDown()}}>
                                        Edit Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {handleSignOut(); handleCloseDropDown()}}>
                                        Sign Out
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default AppBar
