///*|----------------------------------------------------------------------------------------------------
// *|            This source code is provided under the MIT license      	--
// *|  and is provided AS IS with no warranty or guarantee of fit for purpose.  --
// *|                See the project's LICENSE.md for details.                  					--
// *|           Copyright (C) 2022 Wasin W. All rights reserved.            		--
///*|----------------------------------------------------------------------------------------------------

const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer') //Handle image upload
const sharp = require('sharp') //Resize and reformat image
const { sendWelcomeEmail } = require('../email/account')
const { sendCancelationEmail } = require('../email/account')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a jpg or jpeg or png file'))
        }
        cb(undefined, true)
    }
})

router.post('/users', async (req,res)=>{ //Sign Up and Log in

    const user = new User(req.body)
    try{
        await user.save()
        //Send a welcome email
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({
            user, 
            token
        })
    }catch(error){
        res.status(400).send(error)
    }
    
})

router.post('/users/login', async (req , res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()
        res.send({user , token})
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async(req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    }catch(error){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res) =>{
    try{
        
        req.user.tokens = [] //Clear array
        await req.user.save()

        res.send()
    }catch(error){
        res.status(500).send()
    }
})

// Get all users
router.get('/users/me', auth , async (req, res)=>{ //Run auth middleware, then next() runs handler
    // Sends user from Auth middleware back to the client.
    res.send(req.user) 
})


router.patch('/users/me', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try{
        //No need to find user because auth middleware attachs user for you
        //const user = await User.findById(req.params.id)

        updates.forEach((update)=> req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res)=>{
    try{
        //No need to find and delete because auth middleware attachs user for you
        //const user = await User.findByIdAndDelete(req.user._id)
    
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(error){
        res.status(500).send(error)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {

    // no "desc" in upload property, Multer sends file to this function.
    //req.user.avatar = req.file.buffer

    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()

    res.send()
}, (error, req, res, next) =>{ //Let's Express know this function is for handling Unknown error
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res)=>{
    try{
        req.user.avatar = undefined
        await req.user.save()

        res.send()
    }catch(error){
        res.status(500).send(error)
    }
})

// Get user avatar
router.get('/users/:id/avatar',  async( req, res)=>{
    
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error('No user or no avatar information')
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(error){
        res.status(404).send(error)
    }
})

module.exports = router