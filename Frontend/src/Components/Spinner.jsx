import React from 'react'
import '../App.css'

const Spinner = ({ loading }) => {
  return loading && (
    <div className="flex flex-col justify-center items-center h-screen ">
        <div className="spinner"></div>
        <p className='mt-4 font-semibold text-2xl text-black '>Loading...</p> 
    </div>
    
  )
}

export default Spinner
