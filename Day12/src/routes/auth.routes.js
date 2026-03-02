const express = require('express');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const isUserExist = await UserModel.findOne({ email })
    if (isUserExist) {
        return res.status(409).json({
            message: "User already exists"
        })
    }
    const user = await UserModel.create({ name, email, password })
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

module.exports = authRouter;