const mongoose = require('mongoose')

const personalData = new mongoose.Schema({
    type:{
        type:String,
        required: true
        
    },
    username: {
        type: String,
        required: true,
    },
    address: String,
    gender: String,
    school: String,
    subjects: Array,
    certificate:{
        type:[{
            name: String,
            url: String
        }],
    },
    courses: {
        type: [{
            courseId:Number,
            courseName:String,
            marks:Number,
            oMarks:Number
        }]
    },

}, {
    timestamps: true
});


const PersonalData = mongoose.model('PersonalData', personalData);
module.exports = {PersonalData};