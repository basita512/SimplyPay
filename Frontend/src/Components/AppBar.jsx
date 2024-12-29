import React from 'react'

const AppBar = () => {
    return (
        <div className='flex bg-white justify-between h-20 p-4 rounded-full shadow-lg shadow-gray-300'>
            <div className="left ml-6 text-2xl font-medium h-full flex flex-col justify-center">
                EzPay
            </div>

            <div className="right flex space-x-5 items-center">
                <div className="hello text-xl">
                    Hello
                </div>

                <div className="user rounded-full bg-gray-300 h-12 w-12">
                    <div className="flex justify-center mt-2 font-normal  text-xl">
                        U
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppBar
