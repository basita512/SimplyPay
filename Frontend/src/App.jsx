import React, { useContext, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import SendMoney from './Pages/SendMoney'
import { AppContext } from './Context/AppContext'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/dashboard' element={<Dashboard/>}></Route>
                <Route path='/signin' element={<AuthGaurd> <Signin/> </AuthGaurd>}></Route>
                <Route path='/signup' element={<AuthGaurd> <Signup/> </AuthGaurd>}></Route>
                <Route path='/send' element={<SendMoney/>}></Route>
            </Routes>
        </div>
    )
}

export default App

const AuthGaurd = ({ children }) => {
    const { navigate } = useContext(AppContext)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [token, navigate])

    return children
}