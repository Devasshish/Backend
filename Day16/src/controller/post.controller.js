const postModel = require('../model/post.model')
const ImageKit = require('@imagekit/nodejs')
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

module.exports = {
    createPost
}