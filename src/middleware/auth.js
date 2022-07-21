///*|----------------------------------------------------------------------------------------------------
// *|            This source code is provided under the MIT license      	--
// *|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
// *|                See the project's LICENSE.md for details.                  					--
// *|           Copyright (C) 2022 Wasin W. All rights reserved.            		--
///*|----------------------------------------------------------------------------------------------------

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