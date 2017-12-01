var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');

let User = mongoose.model('User');
let Message = mongoose.model('Message');
let ChatRoom = mongoose.model('ChatRoom');

let jwt = require('express-jwt');

let auth = jwt({secret: process.env.CHAT_BACKEND_SECRET, userProperty: 'payload'});

router.get('/', auth, function(req, res, next) {
  let query = ChatRoom.find().populate(['users','messages']);
  query.exec(function (err, chatrooms) {
    if (err) { return next(err); }
    res.json(chatrooms);
  });
});

router.post('/createroom/:username', auth, function (req, res, next) {
  let query = User.findOne({username: req.params.username}).populate('groupCH');
  query.exec(function(err, user){
    if (err) return next(err);
    if(!user){
      return next(new Error('not found ' + req.params.username));
    }else{
      let chatroom = new ChatRoom();
      chatroom.owner = req.body.owner;
      chatroom.name = req.body.name;
      chatroom.tags = req.body.tags;
      chatroom.image = req.body.image;
      chatroom.public = req.body.public;
      chatroom.users.push(user);
    
      chatroom.save(function(err, ch) {
        if (err){ return next(err); }
        console.log(user);
        user.groupCH.push(ch)
        user.save(function(err,ch){});
        res.json(ch);
      });
    }
  });
  
});

router.post('/postmessage/:id', auth, function(req, res, next){
  let query = ChatRoom.findOne({_id: req.params.id});
  query.exec(function(err, chatroom){
    if (err) return next(err);
    if(!chatroom){
      return next(new Error('not found ' + req.params.id));
    }else{
      let message = new Message(req.body);
      message.save(function(err, msg){
        if (err) return next(err);
        chatroom.messages.push(msg);
        chatroom.save(function(err, room){});
        res.json(msg);
      });
    }
  });
});

router.get('/:id', auth, function(req, res, next){
  let query = ChatRoom.findById(req.params.id).populate(['users','messages']);
  query.exec(function (err, chatroom){
    if(err) {return next(err)}
    if(!chatroom){ return next(new Error('not found ' + id)); }
    res.json(chatroom);
  });
});

/*router.get('/:chatroom', auth, function(req, res) {
  res.json(req.chatroom);
});

router.param('chatroom', auth, function(req, res, next, id) {
  let query = ChatRoom.findById(id).populate(['users','messages']);
  query.exec(function (err, chatroom){
    if (err) { return next(err); }
    if (!chatroom) { return next(new Error('not found ' + id)); }
      req.chatroom = chatroom;
    return next();
  });
}); */

module.exports = router;
