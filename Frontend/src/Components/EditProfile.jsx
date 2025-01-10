import React, { useContext, useState } from "react"
import axios from "axios"
import InputBox from "./InputBox"
import { AppContext } from "../Context/AppContext"

const EditProfile = () => {
    const [confirmPassword, setConfirmPassword] = useState('')
    const {
        firstname, setFirstname,
        lastname, setLastname,
        password, setPassword,
        errorMessage, setErrorMessage,
        handleCancelEditProfile
    } = useContext(AppContext)

    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const loggedInUser = localStorage.getItem('userId')

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!')
            return
        }

        try {
            await axios.put('http://localhost:3000/api/v1/user/update', {
                
                firstName: firstname || loggedInUser.firstName,
                lastName: lastname || loggedInUser.lastName,
                password: password || undefined
                
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust token handling
                },
            })
            console.log("Profile updated successfully");
            handleCancelEditProfile()

        } catch (error) {
            console.error("Error updating profile:", error)
        }
    }

  return (
    <div className="my-8 w-1/4">
        <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold ">Edit Profile</h2>
        <h2 className="text-gray-700">Enter the details which you want to edit</h2>
            <InputBox
                label="First Name"
                name="firstName"
                value={firstname}
                onChange={(e) =>  setFirstname(e.target.value)}
            />
            <InputBox
                label="Last Name"
                name="lastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <InputBox
                label="Password"
                placeholder="Enter a new password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <InputBox
                label="Confirm Password"
                placeholder="Re-enter new password"
                name="password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {
                errorMessage && (
                    <div className="text-red-500 font-medium">
                        {errorMessage}
                    </div>
                )
            }

            <div className="flex space-x-4">
                <button  className="bg-green-600 font-medium text-white py-2 px-4 rounded-md hover:bg-green-700">
                    Save
                </button>
                <button  className="bg-gray-500 font-medium text-white py-2 px-4 rounded-md hover:bg-gray-600"
                onClick={handleCancelEditProfile}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
  )
}

export default EditProfile
