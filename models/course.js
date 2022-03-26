const mongoose = require('mongoose');
const dompurify = require('dompurify');
const {JSDOM} = require('jsdom');
const marked = require('marked');

const dompurifier = dompurify(new JSDOM().wndow)

const Schema = mongoose.Schema;


const courseData= new Schema({
    cid:{
        type: String,
        required: [true, "course ID required"]
    },
    name:{
        type: String,
        required: [true, "course Name required"]
    },
    duration:{
        type: String,
        required: true
    },
    
    description: String,
    banner: {
        type: String
    }
   
});
const Course = mongoose.model('Course', courseData);

module.exports = Course;