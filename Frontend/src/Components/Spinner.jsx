import React from 'react'
import '../App.css'

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
        <div className="spinner"></div>
        <p className='mt-4 font-semibold text-2xl '>Loading...</p> 
    </div>
    
  )
}

export default Spinner
