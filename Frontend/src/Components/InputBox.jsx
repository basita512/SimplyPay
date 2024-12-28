import React from 'react'

const InputBox = ({label, placeholder, onChange, value, name, type}) => {
  return (
    <div className='w-full mt-4'>

      <div className="text-black font-medium">
        {label}
      </div>

      <input 
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
        type={type}
        className=' w-full outline-none border-2 rounded-md border-gray-300 placeholder-gray-500 py-2 px-3 mt-1' />
    </div>
  )
}

export default InputBox
