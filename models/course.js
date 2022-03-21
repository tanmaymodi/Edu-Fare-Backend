const mongoose = require('mongoose');
const dompurify = require('dompurify');
const {JSDOM} = require('jsdom');
const marked = require('marked');

const dompurifier = dompurify(new JSDOM().wndow)

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
const Course = mongoose.model('Course', courseData);

module.exports = Course;