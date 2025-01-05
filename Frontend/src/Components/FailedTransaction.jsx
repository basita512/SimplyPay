import React from 'react'

const FailedTransaction = () => {
  return (
    <div>
        <div id="failed-animation" class="flex justify-center items-center h-screen bg-red-100 shadow-lg shadow-[#2c635df6]">
            <div class="relative bg-white p-8 rounded-lg shadow-lg animate-shake">
                
                <div class="w-20 h-20 mx-auto bg-red-500 rounded-full flex justify-center items-center animate-pulse">
                    <svg class="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                
                <p class="mt-4 text-lg font-bold text-red-700 text-center">Transaction Failed!</p>
                <p class="text-sm text-gray-600 text-center">Please try again or contact support.</p>
            </div>
        </div>
    </div>
  )
}

export default FailedTransaction
