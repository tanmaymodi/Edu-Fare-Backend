const mongoose = require('mongoose')


const studentDetails = new mongoose.Schema({
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
    gender: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const tutorDetails = new mongoose.Schema({
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
    subjects: {
        type: Object,
        required: true
    }

}, {
    timestamps: true
});


const StudentDetails = mongoose.model('StudentDetails', studentDetails);
const TutorDetails = mongoose.model('TutorDetails', tutorDetails);
module.exports = {StudentDetails,TutorDetails};