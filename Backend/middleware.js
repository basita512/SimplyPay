const {JWT_SECRET} = require('./config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    //Condition if the header doesn't starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status.json({
            error: 'Invalid Token'
        })
    }

    //split(' ') splits the string at spaces, resulting in an array: ['Bearer', '<token>'].
    //[1] gets the second element (the actual token).
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()

    } catch (error) {
        return res.status(403).json({})
    }
}

module.exports = 
    authMiddleware
