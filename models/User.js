let mongoose = require('mongoose');
let ObjectID = mongoose.Schema.Types.ObjectId;

let crypto = require('crypto');
let jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    email: String,
    username: {type: String, lowercase: true, unique: true},
    hash: String,
    salt: String,
    country: String,
    likedCR: [String],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    privateCH: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom'}],
    groupCH: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom'}]
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(32).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 
	  10000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	let hash = crypto.pbkdf2Sync(password, this.salt, 
	  10000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, process.env.CHAT_BACKEND_SECRET);
};

mongoose.model('User', UserSchema);