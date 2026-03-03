const express = require('express')
const UserModel = require('../model/user.model')
const authRouter = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await UserModel.findOne({ email })
    if (userExist)
        return res.status(409).json({
            message: "User Exist"
        })
    const hash = crypto.createHash("md5").update(password).digest('hex')
    
    const user = await UserModel.create({
        name, email, password:hash
    })
    const token = jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET , {expiresIn:'2h'})
    res.cookie('token',token)
    // UserModel.create({})
    res.status(201).json({
        message: "Data got",
        user,
        token
    })
})

authRouter.post('/get-me', async(req,res)=>{
    const token = req.cookies.token
    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    console.log(decoded)
    const user = await UserModel.findById(decoded.id)
    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post('/login',async(req,res)=>{
    const {email, password}= req.body
    const userExist =await UserModel.findOne({email})
    if(!userExist){
        return res.status(409).json({
            message:"USer not exist on this email"
        })
    }
    const hash=crypto.createHash("md5").update(password).digest('hex')
    const passwordMatched = hash===userExist.password
    if(!passwordMatched){
        return res.status(400).json({
            message:"Wrong credentials"
        })
    }
    const token=jwt.sign({
        id:userExist._id,
        email:userExist.email
    },process.env.JWT_SECRET,{expiresIn:"2h"})
    res.cookie('token',token)
    res.status(200).json({
        message:"Login  request"
    })
})

module.exports = authRouter