import React, { useState } from 'react'
import Heading from '../Components/Heading'
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import BottomWarning from '../Components/BottomWarning'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate()
    const [signUpData, setSignUpData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })

    const handleSignUpData = (event) => {
        const {name, value} = event.target
        setSignUpData((prevData) => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    return (
        <div className='bg-gradient-to-b from-[#29a699f6] via-[#83d4aef6] to-[#bcffe0f6] h-screen w-full flex flex-col justify-center items-center'>
            <div className="card flex flex-col justify-center items-center bg-white py-2 px-7 rounded-xl shadow-xl shadow-[#3c7b74f6] w-90 h-max  ">
                <Heading label={'Sign Up'} />
                
                <SubHeading label={'Enter your information to create an account'} />
                
                <InputBox 
                    label={'First Name'} 
                    name='firstname'
                    value={signUpData.firstname}
                    placeholder={'John'} 
                    onChange={handleSignUpData} />

                <InputBox 
                    label={'Last Name'} 
                    name='lastname'
                    value={signUpData.lastname}
                    placeholder={'Doe'} 
                    onChange={handleSignUpData} />

                <InputBox 
                    label={'Email'} 
                    name='email'
                    value={signUpData.email}
                    placeholder={'youremail@example.com'} 
                    onChange={handleSignUpData} />

                <InputBox 
                    label={'Password'}
                    name='password'
                    value={signUpData.password}
                    onChange={handleSignUpData}
                    type={'password'} />
                
                <Button 
                    label={'Sign Up'}
                    onClick={async () => {
                        try {
                            if (!signUpData.firstname || !signUpData.lastname || !signUpData.email || !signUpData.password) {
                                alert("Please fill out all fields.");
                                return;
                            }

                            const response = await axios.post('http://localhost:3000/api/v1/user/sign-up', {
                                username : signUpData.email,
                                password : signUpData.password,
                                firstName : signUpData.firstname,
                                lastName : signUpData.lastname
                            })
                            localStorage.setItem('token', response.data.token)
                            navigate('/dashboard')
                        } catch (error) {
                            console.error("Signup error:", error);
                            alert("Signup failed. Please try again.");
                        }                     
                    }}/>

                <BottomWarning label={'Already have an account?'} bottomText={'Login'} to={'/signin'} />
            </div>

        </div>
    )
}

export default Signup
