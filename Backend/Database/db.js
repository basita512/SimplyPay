const mongoose = require('mongoose')

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

const accountSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId, //Reference to 'User' model userId
        ref : 'User',
        required : true,
    },

    balance: {
        type : Number,
        required : true
    }
})

// Creating Model for 'User' collection
const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    Account, User
}