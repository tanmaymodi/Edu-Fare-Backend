const mongoose = require('mongoose')

const users = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 14,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const Users = mongoose.model('Users', users);
module.exports = {Users};