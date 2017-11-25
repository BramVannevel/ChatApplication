var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');

let User = mongoose.model('User');
let Message = mongoose.model('Message');
let ChatRoom = mongoose.model('ChatRoom');

let jwt = require('express-jwt');

let auth = jwt({secret: process.env.CHAT_BACKEND_SECRET, userProperty: 'payload'});

router.get('/', function(req, res, next) {
    Message.find(function(err, messages) {
      if (err) { return next(err); }
      res.json(messages);
    });
  });
  
  router.post('/', function (req, res, next) {
    let message = new Message(req.body);
    message.save(function(err, post) {
      if (err){ return next(err); }
      res.json(message);
    });
  }); 
  
  router.get('/:id', auth, function(req, res, next) {
    Message.findById(req.params.id, function(err, message) {
      if (err) return next(err);
      if (!message) 
        return next(new Error('not found ' + req.params.id));
      res.json(message);
    });
  });
  

  module.exports = router;