//auth.js without token actualization
var userModel = require("../user/user-model.js"),
    studentModel = require("../student/student-model");

exports.verifyUser = function(req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    if(!username || !password) {
        return next(new Error("Please enter your username and password"));
    }

    userModel.findOne({username: req.body.username}, function (err, data) {
        if(err) {
            return next(new Error("cannot find user"));
        }

        if (!data.authenticate(password)) {
            return next(new Error("Invalid username and/or password"));
        }

        req.user = data;
        next();
    })

    studentModel.findOne({ username: req.body.username }, function (err, data) {
        if (err) {
            return next(new Error("cannot find user"));
        }

        if (!data.authenticate(password)) {
            return next(new Error("Invalid username and/or password"));
        }

        req.user = data;
        next();
    });


}