const mongoose = require9('mongoose');
const Schema = mongoose.Schema;

const articles= new Schema({
    id:Number,
    heading:String,
    explaination:String,
    images:Object,
    models3d:Object
   
});

module.exports = mongoose.model("Articles",articles);