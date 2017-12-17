var mongoose = require("mongoose"),
    customerSchema;

mongoose.connect("mongodb://localhost/banking"); //connecting mongoose to mongodb & creating banking database

//creating database structure
customerSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    address: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    accountType: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("customer", customerSchema);