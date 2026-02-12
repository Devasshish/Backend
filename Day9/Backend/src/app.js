const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const noteModel = require('./model/notes.model')

// POST
app.post('/notes',async (req, res) => {
    const { title, desc } = req.body

    const note = await noteModel.create({
        title,desc
    })

    res.status(201).json({
        message:"Note created",
        note
    })
})

// GET

app.get('/notes',async (req,res)=>{
    const note = await noteModel.find()
    res.status(200).json({
        message: "note fetched ",
        note
    })
})

// DELETE

app.delete('/notes/:id',async (req,res)=>{
    await noteModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message:"Deleted"
    })
})

// UPDATE 

app.patch('/notes/:id',async (req,res)=>{

    const {desc} = req.body
    await noteModel.findByIdAndUpdate(req.params.id,{desc})
    res.status(200).json({
        message:"modified data",
    })
})

module.exports = app