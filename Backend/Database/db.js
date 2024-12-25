const mongoose = require('mongoose')
const DatabaseURL = "mongodb://localhost:27017/Payment-App"

mongoose.connect(DatabaseURL)
    .then(() => {
        console.log('DB is connected to:', DatabaseURL);
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });


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

    firstName: {
        type: String,
        maxlength: 50,
        trim: true,
    },

    lastName: {
        type: String,
        maxlength: 50,
        trim: true,
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