const express =require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')

const app = express()
app.use(cookieParser())

app.use(express.json())


app.use("/auth",authRouter)
app.use("/posts",postRouter)
module.exports=app