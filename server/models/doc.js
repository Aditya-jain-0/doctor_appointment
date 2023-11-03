const mongoose = require('mongoose');

const Slot = new mongoose.Schema({
    timing: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        required: true,
    }
});

const Doctor = new mongoose.Schema({
    docname: {
        type: String,
        required: true
    },
    isavail:{
        type:Boolean,
        required:true,
    },
    profession: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    slots: [Slot]
});

module.exports = mongoose.model("Doctor", Doctor);
