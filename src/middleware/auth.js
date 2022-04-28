const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) =>{
    // console.log('auth middleware')
    // next()
    const bearer = 'Bearer '
    const secret = process.env.JWT_SECRET
    try{
        const token = req.header('Authorization').replace(bearer, '')
        const decoded = jwt.verify(token,secret)
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token':token
        })

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }catch(error){
        res.status(401).send({
            error: 'Pelase authenticated.'
        })
    }

}

module.exports = auth