module.exports = function (app) {

    app.get("/api/user",findAllUsers)
    app.post("/api/user",createUser)
    app.get("/api/profile",profile)
    app.get("/api/user/:username",findUserByUsername)

    var userModel = require("../models/user/user.model.server");

    function findAllUsers(req,res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function createUser(req,res) {
        var user =  req.body;
        return userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                return res.send(user)
            })
    }

    function profile(req,res) {
        var user = req.session['currentUser'];
        return res.send(user);
    }

    function findUserByUsername(req,res){
        var username = req.params.username;
        return userModel.findByUserName(username)
            .then(function (user) {
               if(user==null){
                   return res.send({
                       username:'NOT FOUND'
                   })
               }
               else{
                   return res.send(user);
               }

            })
    }

}