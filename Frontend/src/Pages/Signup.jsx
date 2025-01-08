import React, { useContext, useState } from 'react'
import Heading from '../Components/Heading'
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import BottomWarning from '../Components/BottomWarning'
import Button from '../Components/Button'
import ErrorAlert from '../Components/ErrorAlert'
import axios from 'axios'
import { AppContext } from '../Context/AppContext'

const Signup = () => {
    const {
        firstname, setFirstname,
        lastname, setLastname,
        email, setEmail,
        password, setPassword,
        errorMessage, setErrorMessage,
        navigate, handleApiError 
    } = useContext(AppContext)

    const handleSignUpData = (event) => {
        const { name, value } = event.target
        switch (name) {
            case 'firstname' : 
                setFirstname(value)
                break
            case 'lastname' : 
                setLastname(value)
                break
            case 'email' : 
                setEmail(value)
                break
            case 'password' : 
                setPassword(value)
                break
            default :
                break
        }
    }

    const handleSigUp = async (event) => {
        event.preventDefault()
        setErrorMessage('')

        try {
            if (!firstname || !lastname || !email || !password) {
                setErrorMessage("Please fill out all fields.")
                return
            }

            const response = await axios.post('http://localhost:3000/api/v1/user/sign-up', {
                username : email,
                password : password,
                firstName : firstname,
                lastName : lastname
            })
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')

        } catch (error) {
             handleApiError(error, setErrorMessage)  
        }                     
    }

    return (
        <div className='bg-gradient-to-b from-[#29a699f6] via-[#83d4aef6] to-[#bcffe0f6] h-screen w-full flex flex-col justify-center items-center'>
            <div className="card flex flex-col justify-center items-center bg-white py-2 px-7 rounded-xl shadow-xl shadow-[#3c7b74f6] w-90 h-max  ">
                <Heading label={'Sign Up'} />
                
                <SubHeading label={'Enter your information to create an account'} />
                
                <InputBox 
                    label={'First Name'} 
                    name='firstname'
                    value={firstname}
                    placeholder={'John'} 
                    onChange={handleSignUpData} />

                <InputBox 
                    label={'Last Name'} 
                    name='lastname'
                    value={lastname}
                    placeholder={'Doe'} 
                    onChange={handleSignUpData} />

                <InputBox 
                    label={'Email'} 
                    name='email'
                    value={email}
                    placeholder={'youremail@example.com'} 
                    onChange={handleSignUpData} />

                <InputBox 
                    label={'Password'}
                    name='password'
                    value={password}
                    onChange={handleSignUpData}
                    type={'password'} />

                
                { errorMessage && <ErrorAlert errorMessage={errorMessage} /> }
                
                <Button 
                    label={'Sign Up'}
                    onClick={handleSigUp}/>

                <BottomWarning label={'Already have an account?'} bottomText={'Login'} to={'/signin'} />
            </div>

        </div>
    )
}

export default Signup
