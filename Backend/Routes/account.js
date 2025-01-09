const express = require('express')
const {authMiddleware} = require('../middleware')
const {Account} = require('../Database/db')
const mongoose = require('mongoose')

const router = express.Router()


//--------------- To check user account balance --------------------//

router.get('/balance', authMiddleware, async(req, res) => {
    //Finding the userId from the DB
    const account = await Account.findOne({
        userId : req.userId 
    })

    res.json({
        balance : account.balance
    })
})


//------------------- To tranfer amount (using Tranctions in DB) ---------------------------//

router.post("/transfer", authMiddleware, async (req, res) => {
    // To change the FROM account, add thatfrom account auth token
    try {
        const { to, amount } = req.body;

        //Fetching the SENDER account
        const account = await Account.findOne({
            userId: req.userId
        });

        // If SENDER has insufficient balance
        if (account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        //Fetching the RECIEVER account
        const toAccount = await Account.findOne({
            userId: to
        });

        //Checking if RECIEVER account is valid account
        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        //Performing the Transfer
        await Account.updateOne(
            { userId: req.userId }, 
            { $inc: { balance: -amount} }
        )

        await Account.updateOne(
            { userId: to }, 
            { $inc: { balance: amount } }
        )

        res.json({
            message: "Transfer successful"
        })

    } catch (error) {
        res.status(500).json({ 
            message: 'Transfer failed',
            error: error.message 
        })
    }
    
});

//-------------Using Transactions------------------//

// router.post('/transfer', authMiddleware, async(req, res) => {
//     // Initializing a session
//     const session = await mongoose.startSession()

//     try {
//         //Starting the session
//         session.startTransaction()
//         const { to, amount } = req.body

//         //Fetching the SENDER account
//         const fromAccount = await Account.findOne({ userId: req.userId }).session(session)

//         // If SENDER has insufficient balance
//         if (!fromAccount || fromAccount.balance < amount) {
//             await session.abortTransaction()
//             return res.status(400).json({
//                 message: 'Insufficient Balance'
//             })
//         }

//         //Fetching the RECIEVER account
//         const toAccount = await Account.findOne({ userId: to }).session(session)

//         //Checking if RECIEVER account is valid account
//         if(!toAccount) {
//             await session.abortTransaction()
//             return res.status(400).json({
//                 message : 'Invalid Account'
//             })
//         }

//         //Performing the Transfer
//         await Account.updateOne(
//             {userId : req.userId}, 
//             { $inc: { balance : -amount} }.session(session)
            
//         )

//         await Account.updateOne(
//             { userId: to},
//             { $inc: { balance : amount } }.session(session)
//         )

//         //Commit the Transaction in DB
//         await session.commitTransaction()
//         res.json({
//             message : 'Transfer successful'
//         })

//     } catch (error) {
//         //console.error('Error during transfer:', error)
//         await session.abortTransaction(); // Abort transaction on error
//         res.status(500).json({ 
//             message: 'Transfer failed',
//             error: error.message 
//         });

//     } finally {
//         session.endSession(); // Always end the session
//     }
    
// })

module.exports = router