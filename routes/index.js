var express = require('express');
var router = express.Router();
var repo = require('../data/linksRepo');

var testUser = { name: 'Geronimo', email: 'yourname@reddit.com', password:'pw'};

var requireLogin = function requireLogin(req, res, next) {
  if(typeof req.session === 'undefined') res.render('index', {isLoggedIn: isLoggedIn(req)});
  if(req.session.email == testUser.email) {
    next();
  } else {
    res.render('index', {isLoggedIn: false});
  }
}

function isLoggedIn(req) {
  if(typeof req.session === 'undefined') return false;
  return req.session.email === testUser.email;
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {links: repo.getAllLinks(), testUser: testUser, isLoggedIn: isLoggedIn(req)});
});

router.get('/login', requireLogin, getLoginInformation);

function getLoginInformation(req, res) {
   res.send(JSON.stringify(testUser));
};

router.post('/login', function(req, res) {
  req.session.email = req.body.email;
  res.render('index', {links: repo.getAllLinks(), testUser: testUser, isLoggedIn: isLoggedIn(req)});
});

router.post('/logout', requireLogin, logout);

function logout(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {isLoggedIn: isLoggedIn(req)});
    }
  });
};

module.exports = router;
module.exports.requireLogin = requireLogin;
module.exports.isLoggedIn = isLoggedIn;
module.exports.testUser = testUser;
