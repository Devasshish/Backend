const app = require('./src/app')
const mongoose = require('mongoose')
const connection = require('./config/database')
require('dotenv').config()
connection()




app.listen(3000,()=>{
    console.log("Server is running.")
})