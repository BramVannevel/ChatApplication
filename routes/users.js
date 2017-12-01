var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');
let jwt = require('express-jwt');

let User = mongoose.model('User');
let Message = mongoose.model('Message');
let ChatRoom = mongoose.model('ChatRoom');

let auth = jwt({ secret: process.env.CHAT_BACKEND_SECRET, userProperty: 'payload' });


router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) { return next(err); }
    res.json(users);
  });
});

router.post('/connectGroup/:username', auth, function(req, res, next){
  let query = User.findOne({username: req.params.username}).populate('groupCH');
  query.exec(function(err, user){
    if (err) return next(err);
    if(!user){
      return next(new Error('not found ' + req.params.username));
    }else{
      let q2 = ChatRoom.findOne({name:req.body.name});
      q2.exec(function(err,chatroom){
        if (err) return next(err);
        if (chatroom){
          console.log(chatroom);
          console.log(user);
          user.groupCH.push(chatroom);
          chatroom.users.push(user);
          user.save(function(err,user){});
          chatroom.save(function(err, ch){
            res.json(ch)
          });
        }else {
          return next(new Error('not found ' + req.body.name));
        }
      });
    }
  });
});

router.post('/addfriend/:username', auth, function (req, res, next) {
  let query = User.findOne({ username: req.params.username }).populate('friends');
  query.exec(function (err, user) {
    if (err) return next(err);
    if (!user) {
      return next(new Error('not found ' + req.params.username));
    } else {
      let q2 = User.findOne({ username: req.body.username });
      q2.exec(function (err, friend) {
        if (err) return next(err);
        if (friend) {
          let prCH = new ChatRoom();
          prCH.owner = req.params.username;
          prCH.users.push(friend);
          prCH.users.push(user);

          prCH.save(function (err, prCH){
            user.privateCH.push(prCH);
            friend.privateCH.push(prCH);
            user.friends.push(friend);
            friend.friends.push(user);
  
            user.save(function (err, user) {});
            friend.save(function (err, friend){});
  
            res.json(friend);
          }); 
        }
        else {
          return next(new Error('not found ' + req.body.username));
        }
      });
    }
  });
});

router.get('/findbyname/:name', auth, function (req, res, next) {
  let query = User.findOne({ username: req.params.name }).populate(['friends','privateCH','groupCH']);
  query.exec(function (err, user) {
    if (err) return next(err);
    if (!user)
      return next(new Error('not found ' + req.params.name));
    res.json(user);
  });
});

router.post('/', auth, function (req, res, next) {
  let user = new User(req.body);
  user.save(function (err, post) {
    if (err) { return next(err); }
    res.json(user);
  });
});

router.get('/findbyid/:id', auth, function (req, res, next) {
  let query = User.findById(req.params.id).populate('friends');
  query.exec(function (err, user) {
    if (err) return next(err);
    if (!user)
      return next(new Error('not found ' + req.params.id));
    res.json(user);
  });
});

router.post('/register', function (req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password)
  user.save(function (err) {
    if (err) { return next(err); }
    return res.json({ token: user.generateJWT() })
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/checkusername', function (req, res, next) {
  User.find({ username: req.body.username },
    function (err, result) {
      if (result.length) {
        res.json({ 'username': 'alreadyexists' })
      } else {
        res.json({ 'username': 'ok' })
      }
    });
});

router.post('/checkemail', function (req, res, next) {
  User.find({ email: req.body.email },
    function (err, result) {
      if (result.length) {
        res.json({ 'email': 'alreadyexists' })
      } else {
        res.json({ 'email': 'ok' })
      }
    });
});

module.exports = router;
