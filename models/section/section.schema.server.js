var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    name:String,
    courseId:Number,
    maxSeats:Number,
    availableSeats:Number
},{collection:'section'});

module.exports = sectionSchema;