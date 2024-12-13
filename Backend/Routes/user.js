const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const zod = require('zod')
const user = require('../Database/db')
const {JWT_SECRET} = require('../config')

const app = express()
app.use(express.json())
const schema = zod.array(zod.number())

const signUpBody = zod.object({
    email : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string().min(8),
})

app.post('/sign-in', async(req, res) => {
    const userLogin = req.body.userLogin
    const response = signUpBody.safeParse(userLogin)

    if(!response.success) {
        console.log(response)
        res.status(411).json({
            message : 'Invalid ID and Password'
        })
    }
    
    const user = await userLogin.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if (user) {
        const token = jwt.sign({

        })
    }
})

module.exports = router