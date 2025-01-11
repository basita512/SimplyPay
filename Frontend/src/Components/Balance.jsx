import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import '../App.css'

const Balance = () => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                console.log('Account Response: ', response)
                setBalance(response.data.balance)

            } catch (error) {
                console.log('Error fetching balance: ',error)
            }
        }
        fetchBalance()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-xl shadow-gray-300 rounded-lg p-6 max-w-sm w-1/4 text-center">
                <div className="flex items-center justify-center text-teal-800 text-5xl font-bold mb-2">
                   <AccountBalanceWalletIcon fontSize="large" />
                </div>
                <div className="text-gray-500 font-medium text-lg">Your Balance</div>
                <div className="text-gray-800 font-extrabold text-5xl mt-2">
                    {balance !== null ? `₹ ${balance.toFixed(2)}` : 'Loading...'}
                </div>
                <div className="text-sm text-gray-400 mt-2">Updated just now</div>
            </div>
        </div>
    )


}

export default Balance
