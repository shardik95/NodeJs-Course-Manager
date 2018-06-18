module.exports = function (app) {

    app.get("/api/course/:courseId/section",findSectionById);
    app.post("/api/course/:courseId/section",createSection);
    app.post("/api/section/:sectionId/enrollment",enrollStudent);
    app.delete("/api/section/:sectionId/enrollment",unenrollStudent);
    app.get("/api/section",getSection)

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionById(req,res) {
        var courseId = req.params.courseId;
        return sectionModel.findSectionByCourse(courseId)
            .then(sections=>res.send(sections))
    }

    function createSection(req,res){
        var section = req.body;
        return sectionModel.createSection(section)
            .then(section=>res.send(section))
    }

    function enrollStudent(req,res){
        var sectionId = req.params.sectionId;
        var student = req.session['currentUser'];

        var enrollment = {
            section:sectionId,
            student:student._id
        }

        sectionModel.decrementSeats(sectionId)
            .then(()=>enrollmentModel.createEnrollment(enrollment))
            .then(enrollment=>res.send(enrollment));
    }

    function getSection(req,res){
        var student = req.session['currentUser'];
        enrollmentModel.findSectionForStudent(student._id)
            .then(sections=>res.send(sections))
    }

    function unenrollStudent(req,res){
        var sectionId = req.params.sectionId;
        var student = req.session['currentUser'];

        sectionModel.incrementSeats(sectionId)
            .then(()=>enrollmentModel.deleteEnrollment(sectionId,student._id))
            .then(enrollment=>res.send(enrollment));
    }

}