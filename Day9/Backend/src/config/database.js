const mongoose = require('mongoose')

const connection = () => {
    mongoose.connect('mongodb+srv://devashishmac13_db_user:Denymac1309@cluster0.7msramk.mongodb.net/Day9')
        .then(() => {
            console.log("DB Connected");
        })
}

module.exports = connection