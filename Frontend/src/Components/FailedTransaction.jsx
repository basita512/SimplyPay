import React from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button'

const FailedTransaction = ({ amount, receiver }) => {
    const navigate = useNavigate()

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#29a699f6] via-[#83d4aef6] to-[#bcffe0f6] ">
            <div id="failed-animation" class="flex justify-center items-center rounded-xl animate-fade-in shadow-lg shadow-[#2c635df6]">
                <div class="relative bg-white px-10 py-5 rounded-lg shadow-lg animate-shake">

                    <p className="mt-5 text-4xl font-bold text-red-700 text-center">
                        Transaction Failed!
                    </p>
                    
                    <div class="w-20 h-20 mt-14 mx-auto bg-red-700 rounded-full flex justify-center items-center animate-pulse">
                        <svg class="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    
                    {/* <p className="text-4xl mt-10 font-semibold text-center">
                        ₹{amount}.00 
                    </p>

                    <p className='my-5 text-center'>
                        Paid to <span className='font-medium'>{receiver}</span>  
                    </p> */}

                    <p class="mt-14 text-gray-600 text-center">Please try again or contact support.</p>

                    <Button label='Go to Home' onClick={() => {navigate('/dashboard')}}/>
                </div>
            </div>
        </div>
  )
}

export default FailedTransaction