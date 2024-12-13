const mongoose = require('mongoose')
const express = require('express')

// Defining schema
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true,
        min : 3,
        max : 30,
        loweecase : true,
        trim : true
    },

    password: {
        type : String,
        required : true,
        min : 6
    },

    firstName: {
        type : String,
        required : true,
        max : 50,
        trim : true
    },

    lastName: {
        type : String,
        required : true,
        max : 50,
        trim : true
    }
})

// Creating Model for 'User' collection
const User = mongoose.model('User', userSchema)

export default User