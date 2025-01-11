import React from 'react'
import '../App.css'

const Title = () => {
    const text = "SimplyPay"
    return (
      <div className="waviy space-x-1 mb-12">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
        </style>

        <h1 className='text-2xl text-center text-white'>
            Welcome to
        </h1>

        {text.split("").map((char, index) => (
            <span key={index} style={{ "--i": index + 1 }}>
                {char === " " ? "\u00A0" : char}
            </span>
        ))}
      </div>
        )
}

export default Title
