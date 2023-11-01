const mongoose = require('mongoose');
const PreviousVisits = new mongoose.Schema({
    doctor:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    }
})
const User = new mongoose.Schema({
    username : {
        type:String,
        required:true,
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    previousVisits:[PreviousVisits]
})

module.exports = mongoose.model("User",User)