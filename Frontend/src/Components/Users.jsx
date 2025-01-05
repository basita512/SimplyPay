import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const [Users, setUsers] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/search?filter=${filter}`)
                setUsers(response.data.user)

            } catch (error) {
                console.log('Error fetching users:', error)
            }
        }
        fetchUsers()
    }, [filter])

    return (
        <div className='mt-8'>
            <div className="text-lg font-medium">
                Users
            </div>

            <input 
                type="text"
                placeholder='Search users...'
                onChange={(event) => {
                    setFilter(event.target.value)
                }}
                className=' w-full outline-none focus:border-[#1b1717aa] border-2 rounded-md border-gray-300 placeholder-gray-500 py-2 px-3 mt-1' />

            <div className="">
                {
                    Users.length > 0 ? (
                        Users.map( user => <SingleUser key={user._id} user={user} />)
                    ) : (
                        <div className="text-gray-500 mt-4">No users found.</div>
                    )
                }
            </div>
        </div>
    )
}
 
const SingleUser = ({user}) => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between">
            <div className="right flex space-x-4 items-center mt-5">
                <div className="user rounded-full bg-gray-300 text-black h-12 w-12">
                    <div className="flex justify-center mt-2 font-normal  text-xl">
                        {user.firstName[0]}
                    </div>
                </div>

                <div className="hello text-lg">
                    {user.firstName} {user.lastName}
                </div>
            </div>

            <div className="">
                <button className='py-2 px-6 font-medium text-white bg-black rounded-md mt-5 '
                    onClick={() => {
                        navigate(`/send?id=${user._id}&FIRSTNAME=${user.firstName}&LASTNAME=${user.lastName}`)
                    }}>
                    Send Money
                </button>
            </div>
            
        </div>
    )
}

export default Users
