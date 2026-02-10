const express = require('express')
const noteModel = require('../model/notes.model')
const app = express()

app.use(express.json())

app.post('/notes',async(req,res)=>{
    const {title,desc,age} = req.body

    const note =await noteModel.create({title,desc,age})

    res.status(201).json({
        message:"note created",
        note
    })
})

app.get('/notes',async(req,res)=>{
    const note = await noteModel.find()
    res.status(200).json({
        message : "Get success",
        note
    })
})


module.exports= app
