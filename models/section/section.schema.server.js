var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    name:String,
    courseId:Number,
    maxSeats:Number,
    availableSeats:Number,
    students:[String]
},{collection:'section'});

module.exports = sectionSchema;