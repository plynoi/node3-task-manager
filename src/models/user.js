///*|----------------------------------------------------------------------------------------------------
// *|            This source code is provided under the MIT license      	--
// *|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
// *|                See the project's LICENSE.md for details.                  					--
// *|           Copyright (C) 2022 Wasin W. All rights reserved.            		--
///*|----------------------------------------------------------------------------------------------------

const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        unique: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('A password must not contain word "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps: true
})

//Virtual property

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', // Field User._id is mapped to Task.owner
    foreignField: 'owner' //Field on task
})

userSchema.methods.generateAuthToken =  async function (){ //Need binding, so use standard function
    const user = this

    //const secret = 'thisismynewcourse'
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({_id: user._id.toString()}, secret)

    user.tokens = user.tokens.concat({token}) // Save token
    await user.save() // Save to database
    return token
}

// Override toJSON method and change it behavior. 
// Anytime Express call JSON.stringify(user), automatics trigger this method.
userSchema.methods.toJSON = function (){ //
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({ email })
    
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcryptjs.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}


// Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8)
    }

    next() // Continue save to DB
})

// Create a middle to delete user tasks when user is removed

userSchema.pre('remove', async function(next){
    const user = this

    await Task.deleteMany({
        owner: user._id
    })
    
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
