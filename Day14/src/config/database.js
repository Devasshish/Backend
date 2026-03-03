const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Databse connected")
    })
}

module.exports = connectDB