import React from 'react'
import Heading from '../Components/Heading'
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import BottomWarning from '../Components/BottomWarning'

const Signin = () => {
    return (
        <div className='bg-gradient-to-b from-[#29a699f6] via-[#83d4aef6] to-[#bcffe0f6] h-screen w-full flex flex-col justify-center items-center'>
            <div className="card flex flex-col justify-center items-center bg-white py-2 px-7 rounded-xl shadow-xl shadow-[#3c7b74f6] w-90 h-max  ">
                <Heading label={'Sign In'} />

                <SubHeading label={'Enter your credentials to access your account'} />

                <InputBox
                    label={'Email'}
                    placeholder={'youremail@example.com'}/>

                <InputBox 
                    label={'Password'}/>

                <Button 
                    label={'Sign In'}/>

                <BottomWarning 
                    label={'Dont have an account?'} bottomText={'Sign Up'} to={'/signup'} />
            </div>
        </div>
    )
}

export default Signin
