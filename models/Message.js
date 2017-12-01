let mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    text: String,
    timestamp: Date,
    user: String,
    country: String
});

mongoose.model('Message', MessageSchema);