const mongoose = require('mongoose')

const Admn = new mongoose.Schema({
    adminname:{
        type: String,
        required: true
    },
    adminpassword:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Admin",Admn)