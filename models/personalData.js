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
    subjects: Object,
    certificate:{
        type:[{
            name: String,
            url: String
        }],
    },
    courses: {
        type: [{
            courseId:Number,
            courseNmae:String
        }]
    },

}, {
    timestamps: true
});


const PersonalData = mongoose.model('PersonalData', personalData);
module.exports = {PersonalData};