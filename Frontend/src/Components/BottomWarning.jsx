import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({label, bottomText, to}) => {
  return (
    <div className='flex text-sm justify-center pb-3 font-medium'>
      <div>
        {label}
      </div>
      
      <Link to={to} className='pointer underline pl-1 cursor-pointer' >
        {bottomText}
      </Link>
    </div>
  )
}

export default BottomWarning
