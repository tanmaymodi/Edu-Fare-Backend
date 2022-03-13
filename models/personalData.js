const mongoose = require('mongoose')

const studentPersonalData = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    certificate:{
        type:[{
            name: String,
            url: String
        }],
    },
    cousrseData:{
        type:[{
            id:Number,
            currentCredits:Number,
            isPass:Boolean
        }]
    }
}, {
    timestamps: true
});

const tutorPersonalData = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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


const StudentPersonalData = mongoose.model('StudentPersonalData', studentPersonalData);
const TutorPersonalData = mongoose.model('TutorPersonalData', tutorPersonalData);
module.exports = {StudentPersonalData,TutorPersonalData};