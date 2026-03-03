const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name:String,
    email:{
        type : String,
        unique: [true,"User exist already on this email"]
    },
    password : String
})

const UserModel = mongoose.model('user',userSchema)

module.exports=UserModel