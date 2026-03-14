const postModel = require('../model/post.model')
const ImageKit = require('@imagekit/nodejs/index.js')
const jwt = require('jsonwebtoken')
const PostModel = require('../model/post.model')

const imagekit =new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,

})
async function createPost(req,res){
    const caption = req.body.caption

    const file =await imagekit.files.upload({
        file:await ImageKit.toFile(Buffer.from(req.file.buffer),'file'),
        fileName : 'test',
        folder:'Insta-clone'
    })

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch{
        return res.status(401).json({
            message : "Unauthorized User"
        })
    }
    
    const post = await PostModel.create({
        caption:caption,
        imgUrl:file.url,
        user:decoded.id
    })
    res.status(201).json({
        message:"Post created successfully ",
        post
    })
    
}

async function getPosts(req,res){
    const token = req.cookies.token
    let decoded
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch{
        return res.status(401).json({
            message : "Unauthorized User"
        })
    }

    const userId = decoded.id

    const posts = await PostModel.find({user:userId}).populate('user')

    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}

async function getPostDetails(req,res){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    let decoded
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch{
        return res.status(401).json({
            message : "Unauthorized User"
        })
    }
    const UserId = decoded.id
    const postId = req.params.postId

    const post = await PostModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    const isValidUser = post.user.toString() === UserId
    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden"
        })
    }
    res.status(200).json({
        message:"Post details fetched successfully",
        post
    })
}
module.exports = {
    createPost,
    getPosts,
    getPostDetails
}