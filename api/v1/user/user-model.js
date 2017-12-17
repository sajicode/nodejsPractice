var mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    UserSchema;

UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

//encrypting the password
UserSchema.pre("save", function (next) {
    this.password = this.encryptPpassword(this.password);
    next();
})

UserSchema.methods = {
    encryptPpassword: function(plaintext) {
        if(!plaintext) { return " ";}

        var salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(plaintext, salt);
    },

    authenticate: function(plaintext) {
        return bcrypt.compareSync(plaintext, this.password);
    }
}

moduel.exports = mongoose.model("user", UserSchema);