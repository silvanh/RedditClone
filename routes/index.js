var express = require('express');
var router = express.Router();

var requireLogin = function requireLogin(req, res, next) {
  if(req.session.email) {
    next();
  } else {
    res.sendfile('public/login.html');
  }
}
/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile('public/login.html');
});

router.get('/login', function(req, res) {
  if(req.session.email) {
    res.send(req.session.email);
  } else {
    res.send(null);
  }
});

router.post('/login', function(req, res) {
  req.session.email = req.body.email;
  res.redirect('/links');
});

router.post('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});



module.exports = router;
module.exports = requireLogin;
