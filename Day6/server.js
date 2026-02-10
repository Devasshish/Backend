const app = require('./src/app')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://devashishmac13_db_user:Denymac1309@cluster0.7msramk.mongodb.net/Day6')
.then(()=>{
    console.log("Connected To Database");
    
})
app.listen(3000,()=>{
    console.log("Server is running ");
})