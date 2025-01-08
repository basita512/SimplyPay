import React, { useState } from 'react'
import Heading from '../Components/Heading'
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import BottomWarning from '../Components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPasswprd] = useState('')
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSignIn = async(event) => {
        event.preventDefault()
        setErrorType('')
        setErrorMessage('')

        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/sign-in', {
                username : email,
                password : password
            })

            localStorage.setItem('token', response.data.token)
            
            setErrorType('success')
            setErrorMessage('Logged In succesfully')
            navigate('/dashboard')

        } catch (error) {
            if(error.response && error.response.data) {
                const apiMessage = error.response.data.message

                if (apiMessage === 'Invalid ID and Password') {
                    setErrorType('error')
                    setErrorMessage('Please enter valid Email Id')

                } else if(apiMessage === 'Email does not exist') {
                    setErrorType('error')
                    setErrorMessage('User does not exist. Please check your email')

                } else if (apiMessage === 'Incorrect password'){
                    setErrorType('error')
                    setErrorMessage('Invalid password. Please try again.')
                
                } else {
                    setErrorType('error')
                    setErrorType(apiMessage || 'Login failed. pLease try again.')
                }
            
            } else {
                console.log('Error during sign-in', error)
                setErrorType('error')
                setErrorMessage('Something went wrong. Please try again later')
            }
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
                    onChange={(e) => {setPasswprd(e.target.value)}}/>

                {
                    errorMessage && (
                        <div className={`mt-4 py-2 w-full text-center text-sm rounded ${
                            errorType === 'success' ? 
                                'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                        }`}>
                            {errorMessage}
                        </div>
                    )
                }

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
