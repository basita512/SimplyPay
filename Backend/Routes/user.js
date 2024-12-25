const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const zod = require('zod')
const { User, Account } = require('../Database/db')
const {JWT_SECRET} = require('../config')
const authMiddleware = require('../middleware')

// app.use(express.json())


//----------------------- When user Sign-up ------------------------
 
const signUpBody = zod.object({
    username : zod.string().email(),
    password : zod.string().min(6),
    firstName : zod.string(),
    lastName : zod.string(),
})

router.post('/sign-up', async(req, res) => {
    try {
        const response = signUpBody.safeParse(req.body)

        // Wrong Inputs check
        if(!response.success) {
            // console.log(response)
            console.log('Validation errors:', JSON.stringify(response.error.issues, null, 2));
            return res.status(411).json({
                message: 'Incorrect Inputs',
                errors: response.error.issues,
            })
        }
    
        // Existing User check
        const existingUser = await User.findOne({
            username : req.body.email
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
    
        // Adding random balance on new account
        await Account.create({
            userId,
            balance : 1 + Math.random()*10000,
            firstName: user.firstName,
            lastName: user.lastName,
        })
    
        const token = jwt.sign({userId}, JWT_SECRET)
        res.json({
            message: 'User created successfully',
            token : token
        })

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

})



//------------------------------ When user sign-in-----------------------------------

const signInBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post('/sign-in', async(req, res) => {
    try {
        const response = signInBody.safeParse(req.body)

        if(!response.success) {
            console.log(response)
            return res.status(411).json({
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
    } catch (error) {
        console.error('Signin Error:', error);
        res.status(411).json({
            message: 'Error while logging in'
        })
    }
})



//------------------ When user wants to update details-----------------------

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put('/', authMiddleware, async(req, res) => {
    try {
        const response = updateBody.safeParse(req.body)

        if(!response.success){
            return res.status(411).json({
                message : 'Error while updating the information'
            })
        }
        
        await User.updateOne({ _id : req.userId }, req.body)
        res.json({
            message : 'Updated successfully'
        })

    } catch (error) {
        console.error('Update Error:', error); // Log the error for debugging
        res.status(500).json({ 
            message: 'Internal Server Error' 
        });
    }

})



//------------------------ When we need to get users from backend via filtering last/first name ------------------

router.get('/search', async(req, res) => {
    try {
        const filter = req.query.filter || ""

        const users = await User.find({
            $or : [{
                firstName : {
                    $regex : filter,
                    $options: 'i'
                }, 
            }, {
                lastName : {
                    $regex : filter,
                    $options: 'i'
                }
            }]
        })

        res.json({
            user : users.map( user => ({
                username : user.username,
                firstName : user.firstName,
                lastName : user.lastName,
                _id : user._id
            }))
        })

    } catch (error) {
        console.error('Cannot search Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
})

module.exports = router