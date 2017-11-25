let mongoose = require('mongoose');
let ObjectID = mongoose.Schema.Types.ObjectId;

var ChatRoomSchema = new mongoose.Schema({
    owner: String,
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    name: String,
    tags: [String],
    public: Boolean,
    tUsers: Number,
    likes: Number,
    maxUsers: Number,
    created: Date,
    image: String
});

ChatRoomSchema.pre('remove', function(next) {
    this.model('Message').remove({messages: this_.id}, next);
});

mongoose.model('ChatRoom', ChatRoomSchema);