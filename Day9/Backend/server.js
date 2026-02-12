const app = require('./src/app')

const mongoose = require('mongoose')

const connection = require('./src/config/database')

connection()

app.listen(3000, () => {
    console.log("Server is running on 3000");

})