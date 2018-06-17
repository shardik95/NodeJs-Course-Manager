var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");

var userModel = mongoose.model('UserModel',userSchema);

function findAllUsers() {
    return userModel.find();
}

function createUser(user) {
    return userModel.create(user);
}

function findByUserName(username){
    return userModel.findOne({username:username})
}

module.exports = {
    findAllUsers:findAllUsers,
    createUser:createUser,
    findByUserName:findByUserName
}