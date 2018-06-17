module.exports = function (app) {

    app.get("/api/user",findAllUsers)
    app.post("/api/register",createUser)
    app.get("/api/profile",profile)
    app.post("/api/login",login)
    app.get("/api/user/:username",findUserByUsername)
    app.put("/api/profile",updateProfile)
    app.post("/api/logout",logout)

    var userModel = require("../models/user/user.model.server");

    function findAllUsers(req,res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function logout(req,res) {
        req.session.destroy();
        return res.sendStatus(200);
    }

    function updateProfile(req,res){
        var user = req.body;
        return userModel.updateUser(user)
            .then(function (user) {
                return res.send(user);
            })
    }

    function login(req,res){
        var user = req.body;
        return userModel.findUserByCredentials(user)
            .then(function (user) {
                if(user==null){
                    return res.send({
                        username:'NOT FOUND'
                    })
                }
                else{
                    req.session['currentUser'] = user;
                    return res.send(user);
                }
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
        if(user==null){
            return res.send({
                username:'NOT FOUND'
            })
        }
        else {
            return userModel.findByUserName(user.username)
                .then(function (user) {
                    return res.send(user);
                })
        }
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