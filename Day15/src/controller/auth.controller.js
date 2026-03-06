const UserModel = require('../model/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
async function register(req, res) {
    const { username, email, password, bio, profilePic } = req.body

    const user = await UserModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (user) {
        return res.status(400).json({
            message: "Username or email already exist"
        })
    }
    const hash = await crypto.createHash("md5").update(password).digest('hex')
    const newUser = await UserModel.create({
        username,
        email,
        password: hash,
        bio,
        profilePic
    })

    const token = jwt.sign({
        id: newUser._id
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.cookie('token', token)
    return res.status(201).json({
        message: "User registered successfully",
        user: {

            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic,
            bio: newUser.bio
        }
    })
}

async function login(req, res) {
    const { username, email, password } = req.body

    const user = await UserModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
    const hash = crypto.createHash('md5').update(password).digest('hex')
    const isPasswordValid = hash === user.password
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.cookie('token', token)

    return res.status(200).json({
        message: "Login successful",
        user: {
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio
        }
    })
}

module.exports = {
    register,
    login
}