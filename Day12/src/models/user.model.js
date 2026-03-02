const mongoose= require("mongoose")

const newSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {type:String,
        unique:[true,"Email already exists"]},
    }
 )

const UserModel = mongoose.model("user", newSchema)

module.exports = UserModel;