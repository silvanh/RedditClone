var express = require('express');
var router = express.Router();

var requireLogin = function requireLogin(req, res, next) {
  if(req.session.email) {
    next();
  } else {
    res.redirect('/login.html');
  }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/login.html');
});

router.get('/login', requireLogin, getLoginInformation);

function getLoginInformation(req, res) {
   res.send(req.session.email);
};

router.post('/login', function(req, res) {
  req.session.email = req.body.email;
  res.redirect('/links');
});

router.post('/logout', requireLogin, logout);

function logout(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/login.html');
    }
  });
};

module.exports = router;
module.exports.requireLogin = requireLogin;
