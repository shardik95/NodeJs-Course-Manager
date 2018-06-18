module.exports = function (app) {

    app.get("/api/course/:courseId/section",findSectionById);
    app.post("/api/course/:courseId/section",createSection);

    var sectionModel = require('../models/section/section.model.server')

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

}