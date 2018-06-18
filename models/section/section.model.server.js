var mongoose = require('mongoose');

var sectionSchema = require('./section.schema.server');

var sectionModel = mongoose.model('SectionModel',sectionSchema);

function createSection(section){
    return sectionModel.create(section);
}

function findSectionByCourse(courseId){
    return sectionModel.find({'courseId':courseId});
}

function decrementSeats(sectionId){
    return sectionModel.update({
        _id : sectionId
    },{
        $inc:{
            availableSeats: -1
        }
    })
}

function incrementSeats(sectionId){
    return sectionModel.update({
        _id : sectionId
    },{
        $inc:{
            availableSeats: +1
        }
    })
}


module.exports = {
    createSection:createSection,
    findSectionByCourse:findSectionByCourse,
    decrementSeats:decrementSeats,
    incrementSeats:incrementSeats,
}
