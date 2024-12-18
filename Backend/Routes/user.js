const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const zod = require('zod')
const { User } = require('../Database/db')
const {JWT_SECRET} = require('../config')

const app = express()
app.use(express.json())
const schema = zod.array(zod.number())

// When user Sign-up
const signUpBody = zod.object({
    email : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string().min(8),
})

app.post('/sign-up', async(req, res) => {
    const response = signUpBody.safeParse(req.body)

    // Wrong Inputs check
    if(!response.success) {
        console.log(response)
        return res.status(411).json({
            message: 'Incorrect Inputs'
        })
    }

    // Existing User check
    const existingUser = await User.findOne({
        username : req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message : 'User belonging to this Email ID already exists'
        })
    }

    //If new User
    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    })
    const userId = user._id

    const token = jwt.sign({userId}, JWT_SECRET)
    res.json({
        message: 'User created successfully',
        token : token
    })
})


// When user sign-in
const signInBody = zod.object({
    username : req.body.username,
    password : req.body.password
})

app.post('/sign-in', async(req, res) => {
    //const userLogin = req.body.userLogin
    const response = signInBody.safeParse(userLogin)

    if(!response.success) {
        console.log(response)
        res.status(411).json({
            message : 'Invalid ID and Password'
        })
    }
    
    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })
    const userId = user._id

    // If user exists
    if (user) {
        const token = jwt.sign({userId}, JWT_SECRET)
        res.json({
            token : token
        })
        return
    }

    res.status(411).json({
        message: 'Error while logging in'
    })

})

module.exports = router