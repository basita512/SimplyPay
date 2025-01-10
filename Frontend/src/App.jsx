import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import SendMoney from './Pages/SendMoney'
import Spinner from './Components/Spinner'
import { AppContext } from './Context/AppContext'


const App = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false); 
        }, 500); 

        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <div>
            {
                loading ? (
                    <Spinner loading={loading}/>
                ) : (
                    <Routes>
                        <Route path='/dashboard' element={<Dashboard/>}></Route>
                        <Route path='/signin' element={<AuthGaurd> <Signin/> </AuthGaurd>}></Route>
                        <Route path='/signup' element={<AuthGaurd> <Signup/> </AuthGaurd>}></Route>
                        <Route path='/send' element={<SendMoney/>}></Route>
                    </Routes>
                )
            }              
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