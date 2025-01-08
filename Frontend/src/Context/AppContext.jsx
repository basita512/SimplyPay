import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    const handleApiError = (error, setErrorMessage) => {
        if(error.response && error.response.data) {
            const apiMessage = error.response.data.message

            if (apiMessage === 'Incorrect Inputs') {
                setErrorMessage('Enter valid Inputs')

            } else if (apiMessage === 'User belonging to this Email ID already exists') {
                setErrorMessage(apiMessage)
            
            } else if (apiMessage === 'Invalid ID and Password') {
                setErrorMessage('Please enter valid Email Id')

            } else if(apiMessage === 'Username does not exist') {
                setErrorMessage('User does not exist. Please check your email Id')

            } else if (apiMessage === 'Incorrect password'){
                setErrorMessage('Incorrect password. Please try again.')
            
            } 
        } else {
            console.error('Error during API call:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        }
    }


    const value = {
        email, setEmail,
        password, setPassword,
        firstname, setFirstname,
        lastname, setLastname,
        errorMessage, setErrorMessage,
        navigate, handleApiError
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}
