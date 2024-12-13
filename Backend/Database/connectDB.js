const express = require('express')
const mongoose = require('mongoose')

const connectDB = async (DATABASE_URL) => {
    try {
        await mongoose.connect(DATABASE_URL)
        console.log('Database connected...')
    } catch (error) {
        console.log('MongoDB connection error: ', error)
    }
}

export default connectDB