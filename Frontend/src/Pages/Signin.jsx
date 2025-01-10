import React, { useContext, useState } from 'react'
import Heading from '../Components/Heading'
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import BottomWarning from '../Components/BottomWarning'
import axios from 'axios'
import ErrorAlert from '../Components/ErrorAlert'
import { AppContext } from '../Context/AppContext'

const Signin = () => {
    const {
        email, setEmail,
        password, setPassword,
        errorMessage, setErrorMessage,
        navigate, handleApiError
    } = useContext(AppContext)

    const handleSignIn = async(event) => {
        event.preventDefault()
        setErrorMessage('')

        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/sign-in', {
                username : email,
                password : password
            })

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.userId)
            navigate('/dashboard')

        } catch (error) {
            handleApiError(error, setErrorMessage)
        }
    }

    return (
        <div className='bg-gradient-to-b from-[#29a699f6] via-[#83d4aef6] to-[#bcffe0f6] h-screen w-full flex flex-col justify-center items-center'>
            <div className="card flex flex-col justify-center items-center bg-white py-2 px-7 rounded-xl shadow-xl shadow-[#3c7b74f6] w-90 h-max  ">
                <Heading label={'Sign In'} />

                <SubHeading label={'Enter your credentials to access your account'} />

                <InputBox
                    label={'Email'}
                    placeholder={'youremail@example.com'}
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}/>

                <InputBox 
                    label={'Password'}
                    type={'password'}
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}/>

                { errorMessage && <ErrorAlert errorMessage={errorMessage} /> }

                <Button 
                    label={'Sign In'}
                    onClick={handleSignIn}/>

                <BottomWarning 
                    label={'Dont have an account?'} 
                    bottomText={'Sign Up'} 
                    to={'/signup'} />
            </div>
        </div>
    )
}

export default Signin
