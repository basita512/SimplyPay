const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const zod = require('zod')
const { User, Account } = require('../Database/db')
const {JWT_SECRET} = require('../config')
const authMiddleware = require('../middleware')



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
            return res.status(411).json({
                message: 'Incorrect Inputs',
                errors: response.error.issues,
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
        
        //Finding user by username
        const user = await User.findOne({
            username : req.body.username,
        })

        // If username not found
        if (!user) {
            return res.status(404).json({
                message : 'Username does not exist'
            })
        }

        //Check if the password matches
        if (user.password !== req.body.password) {
            return res.status(401).json({
                message : 'Incorrect password'
            })
        }

        // If username and password are correct
        const userId = user._id
        if (user) {
            const token = jwt.sign({userId}, JWT_SECRET)
            res.json({
                message : 'Logged In successfully',
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