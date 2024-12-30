import React from 'react'

const Users = () => {
    return (
        <div className='mt-8'>
            <div className="text-lg font-medium">
                Users
            </div>

            <input 
                type="text"
                placeholder='Search users...'
                
                className=' w-full outline-none border-2 rounded-md border-gray-300 placeholder-gray-500 py-2 px-3 mt-1' />
        </div>
    )
}

export default Users
