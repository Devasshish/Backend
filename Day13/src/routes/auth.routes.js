const express = require('express');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const authRouter = express.Router();
const crypto = require('crypto')
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const isUserExist = await UserModel.findOne({ email })
    if (isUserExist) {
        return res.status(409).json({
            message: "User already exists"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest('hex')
    const user = await UserModel.create({ name, email, password:hash })
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)
    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })

})

authRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body

    const isUserExist=await UserModel.findOne({email})
    const hash = crypto.createHash("md5").update(password).digest("hex")
    if(!isUserExist){
        return res.status(404).json({
            message:"User not exist please register"
        })
    }
    const isPasswordMatched = hash===isUserExist.password
    if(!isPasswordMatched){
        return res.status(404).json({
            message : "Incorrect credentials"
        })
    }
    res.status(200).json({
        message:"User Logged In"
    })

})

module.exports = authRouter;