var mongoose = require("mongoose"),
    customerSchema;

mongoose.connect("mongodb://localhost/banking"); //connecting mongoose to mongodb & creating banking database

//creating database structure
customerSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: Number, required: true, unique: true},
    address: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    accountType: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

//encypting the password
customerSchema.pre("save", function(next) {
    this.password = this.encryptPassword(this.password);
    next();
})

customerSchema.methods = {
    encryptPassword: function(plaintext) {
        if(!plaintext) { return " ";}

        var salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(plaintext, salt);
    },

    authenticate: function(plaintext) {
        return bcrypt.compareSync("plaintext", this.password);
    }
}

module.exports = mongoose.model("customer", customerSchema);