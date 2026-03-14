const { Schema, default: mongoose } = require("mongoose");

const UserSchema  = new Schema({
    username:{
        type:String,
        required:true,
        unique:[true , "Username already exist"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exist"]
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/s3hvr4nwr/74a3b6a8856b004dfff824ae9668fe9b.webp"
    }
})

const UserModel = mongoose.model('users',UserSchema)

module.exports=UserModel
