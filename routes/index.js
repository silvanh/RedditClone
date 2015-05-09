var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.email) {
    res.redirect('/links');
  } else {
    res.sendfile('public/login.html');
  }
});

router.get('/login', function(req, res, next) {
  if(req.session.email) {
    res.send(req.session.email);
  } else {
    res.send(null);
  }
});

router.post('/login', function(req, res){
  req.session.email = req.body.email;
  res.end('done');
});

router.delete('/login', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
