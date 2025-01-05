import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button'

const Success = ({ amount, receiver }) => {
    const navigate = useNavigate()

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#29a699f6] via-[#83d4aef6] to-[#bcffe0f6] ">
            <div id="success-animation" className="flex justify-center items-center">
                <div className="relative bg-white px-10 py-5 rounded-xl animate-fade-in shadow-lg shadow-[#2c635df6]">

                    <p className="mt-5 text-4xl font-bold text-green-900 text-center">
                        Transaction Successful!
                    </p>
                    
                    <div className="w-20 h-20 mt-14 mx-auto bg-gradient-to-r from-green-500 to-green-600 rounded-full flex justify-center items-center animate-bounce">
                        <svg
                            className="w-10 h-10 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    
                    <p className="text-4xl mt-10 font-semibold text-center">
                        ₹{amount}.00 
                    </p>

                    <p className='my-5 text-center'>
                        Paid to <span className='font-medium'>{receiver}</span>  
                    </p>

                    <Button label='Go to Home' onClick={() => {navigate('/dashboard')}}/>
                   
                </div>
            </div>
        </div>
    );
};

export default Success;


