import React from 'react'

const InputBox = ({label, placeholder, onchange, value, name}) => {
  return (
    <div className='w-full mt-4'>

      <div className="text-black font-medium">
        {label}
      </div>

      <input 
        onChange={onchange}
        placeholder={placeholder}
        value={value}
        name={name}
        className=' w-full outline-none border-2 rounded-md border-gray-300 placeholder-gray-500 py-2 px-3 mt-1' />
    </div>
  )
}

export default InputBox
