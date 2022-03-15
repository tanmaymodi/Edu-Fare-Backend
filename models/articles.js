const mongoose = require9('mongoose');
const Schema = mongoose.Schema;

const articles= new Schema({
    id:Number,
    heading:String,
    description:String,
    explaination:String,
    images:Object,
    models3d:Object,
    by:String,
    sanitizedHtml: String,
    mid: String,
    did: Number,
});

module.exports = mongoose.model("Articles",articles);