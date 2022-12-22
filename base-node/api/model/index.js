const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name : String,    
    day :  String ,
    position: String,
    time: String
})

module.exports = mongoose.model('aka' , ItemSchema)