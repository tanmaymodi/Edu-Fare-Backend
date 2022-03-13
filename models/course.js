const mongoose = require9('mongoose');
const Schema = mongoose.Schema;

const courseData= new Schema({
    id:{
        type: Number,
        required: [true, "course ID required"]
    },
    name:{
        type: String,
        required: [true, "course Name required"]
    },
    duration:{
        type: String,
    },
    passingCredits:Number,
    content:{
        type:[{
            lessonNmae:String,
            credits:Number,
            objectives:String,
            obtainedCredits:Number,
            isPass: Boolean,
            articles: {
                aid:Number
            },
            quiz:{
                question:String,
                answer:String,
                correctAnswer:String,
                marks:Number,
                obtainedMarks:Number
            }
        }]
    },
   
});

module.exports = mongoose.model("Course",courseData);