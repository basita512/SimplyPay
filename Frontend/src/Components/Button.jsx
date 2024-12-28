import React from 'react'

const Button = ({label, onClick}) => {
  return (
    <div onClick={onClick} className='w-full text-center bg-black text-white font-medium py-2 rounded-md my-4 hover:bg-[#0b0b0b] '>
      {label}
    </div>
  )
}

export default Button
