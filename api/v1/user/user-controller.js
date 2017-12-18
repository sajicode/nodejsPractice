var userModel = require("./user-model.js"),
    auth = require("../auth/auth.js");

exports.interceptIds = function(req, res, next, id) {
    userModel.find(id, (err, data) => {
        if(err) {
            return next(new Error("...."))
        }
        req.user = data;
        next();
    })
}

exports.addUsers = function(req, res, next) {
    var user = req.body;

    var person = new userModel(user)
    person.save(function(err, data) {
        if(err) {return next(new Error("cannot add user"))}

        data = data.toObject();
        
        res.status(200).json(data);
    })
}

exports.getUser = function(req, res, next) {
    if(!req.user) {
        return next(new Error("cannot get user"));
    }

    res.status(200).json(req.user);
}

exports.fetchUsers = function(req, res, next) {
    userModel.find(function(err, data) {
        if(err) {
            return next(new Error("could not fetch all users"));
        }
    });
}

exports.updateUser = function(req, res, next) {
    usermodel.update({_id: req.user._id}, req.body, (err,res) => {
        if(err) {
            return next(new Error("could not update user"));
        }
    })
    res.status(200).json(data);
}

exports.deleteUser = function(req, res, next) {
    userModel.remove({_id: req.user._id}, req.body, (err, res) => {
        if(err) {
            return next(new Error("cannot delete user"));
        }
    });
    res.status(200).json(req.user);
}