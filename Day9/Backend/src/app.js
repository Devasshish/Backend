const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))
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

app.put('/notes/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { title, desc } = req.body

    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true }   // updated data return karega
    )

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" })
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote
    })

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
})


// wild card 

app.use("*name",(req,res)=>{
  // res.send("Mejsbhuj")
  res.sendFile(path.join(__dirname,"..",'public/index.html'))
})

module.exports = app