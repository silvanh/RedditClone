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

module.exports = router;
