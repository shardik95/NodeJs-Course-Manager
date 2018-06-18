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

function findAllSections(){
    return sectionModel.find();
}

function deleteSection(sectionId){
    return sectionModel.remove({_id:sectionId})
}

function updateSection(sectionId,section){
    return sectionModel.update({_id:sectionId},{
        $set:section
    })
}

function findSectionById(sectionId){
    return sectionModel.find({_id:sectionId})
}


module.exports = {
    createSection:createSection,
    findSectionByCourse:findSectionByCourse,
    decrementSeats:decrementSeats,
    incrementSeats:incrementSeats,
    findAllSections:findAllSections,
    deleteSection:deleteSection,
    updateSection:updateSection,
    findSectionById:findSectionById

}
