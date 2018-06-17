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

function findUserByCredentials(user){
    return userModel.findOne({username:user.username,password:user.password})
}

function updateUser(user){
    return userModel.update({
        _id:user._id
    },{
        $set: {
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address
        }
    })
}

module.exports = {
    findAllUsers:findAllUsers,
    createUser:createUser,
    findByUserName:findByUserName,
    findUserByCredentials:findUserByCredentials,
    updateUser:updateUser
}