module.exports = function (app) {

    app.get("/api/course/:courseId/section",findSectionForCourse);
    app.post("/api/course/:courseId/section",createSection);
    app.post("/api/student/section/:sectionId",enrollStudent);
    app.delete("/api/student/section/:sectionId",unenrollStudent);
    app.get("/api/section",getSection)
    app.get("/api/student/section",getAllSections)
    app.delete("/api/section/:sectionId",deleteSection)
    app.put("/api/section/:sectionId",updateSection)
    app.get("/api/section/:sectionId",getSectionById)

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function getSectionById(req,res) {
        var sectionId = req.params.sectionId;
        return sectionModel.findSectionById(sectionId)
            .then(section=>res.send(section));
    }

    function findSectionForCourse(req,res) {
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

    function getAllSections(req,res) {
        sectionModel.findAllSections()
            .then(sections=>(
                res.send(sections)
            ))
    }

    function unenrollStudent(req,res){
        var sectionId = req.params.sectionId;
        var student = req.session['currentUser'];

        sectionModel.incrementSeats(sectionId)
            .then(()=>enrollmentModel.deleteEnrollment(sectionId,student._id))
            .then(enrollment=>res.send(enrollment));
    }

    function deleteSection(req,res) {
        var sectionId = req.params.sectionId;
        sectionModel.deleteSection(sectionId)
            .then(()=>enrollmentModel.deleteSection(sectionId))
            .then(response=>res.send(response))

    }

    function updateSection(req,res) {
        var sectionId = req.params.sectionId;
        var section = req.body;
        sectionModel.updateSection(sectionId,section)
            .then(response=>res.send(response))
    }

}