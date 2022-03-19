const mongoose = require9('mongoose');
const Schema = mongoose.Schema;

const courseData= new Schema({
    id:{
        type: String,
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
    content:Array,
    quiz:{
        type:[{
            question:String,
            options:Array,
            ca:String,
            marks:Number
        }]
    }

   
});

module.exports = mongoose.model("Course",courseData);