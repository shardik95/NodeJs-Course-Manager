var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');

var enrollmentModel = mongoose.model('EnrollmentModel',enrollmentSchema);

function createEnrollment(enrollment) {
    return enrollmentModel.create(enrollment);
}

function findEnrollmentForStudent(userId) {
    return enrollmentModel.find({student:userId})
        .populate('section')
        .exec()
}

function findSectionForStudent(studentId){
    return enrollmentModel.find({student:studentId})
        .populate('section')
        .exec()
}

function deleteEnrollment(sectionId,studentId){
    return enrollmentModel.remove({section:sectionId,student:studentId})
}

function deleteSection(sectionId){
    return enrollmentModel.remove({
        section:sectionId
    })
}

module.exports = {
    createEnrollment:createEnrollment,
    findEnrollmentForStudent:findEnrollmentForStudent,
    findSectionForStudent:findSectionForStudent,
    deleteEnrollment:deleteEnrollment,
    deleteSection:deleteSection

}