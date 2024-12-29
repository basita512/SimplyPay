import React from 'react'
import InputBox from '../Components/InputBox'

const SendMoney = () => {
    return (
        <div className='bg-gradient-to-b from-[#29a699f6] via-[#83d4aef6] to-[#bcffe0f6] h-screen w-full flex flex-col justify-center items-center'>
            <div className="card flex flex-col bg-white py-2 px-7 rounded-xl shadow-lg shadow-[#2c635df6] w-[400px] h-max">
                <h1 className='text-4xl text-center font-bold pt-6'>
                    Send Money
                </h1>

                <div className="right flex space-x-4 items-center mt-16">
                    <div className="user rounded-full bg-green-900 text-white h-12 w-12">
                        <div className="flex justify-center mt-2 font-normal  text-xl">
                            A
                        </div>
                    </div>

                    <div className="hello text-xl">
                        Friend's Name
                    </div>
                </div>
                
                <InputBox
                    label={'Amount (in Rs)'}
                    type={'number'}
                    placeholder={'Enter amount'}/>

                <button className='py-2 bg-green-900 hover:bg-green-950 duration-300 font-medium text-center mt-6 mb-4 w-full text-white rounded-lg'>
                    Initate Transfer
                </button>
            </div>
        </div>
    )
}

export default SendMoney
