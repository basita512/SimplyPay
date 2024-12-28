import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import SendMoney from './Pages/SendMoney'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/dashboard' element={<Dashboard/>}></Route>
                <Route path='/signin' element={<Signin/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/send' element={<SendMoney/>}></Route>
            </Routes>
        </div>
    )
}

export default App
