const { default: mongoose } = require("mongoose");


const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl:{
        type: String,
        required: [true, "Image URL is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User id is required"]
    }
})

const PostModel = mongoose.model('posts', postSchema)

module.exports = PostModel