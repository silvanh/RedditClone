var express = require('express');
var repo = require('../data/linksRepo');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.format({
        'text/plain': function(){
            res.send(JSON.stringify(repo.getAllLinks()));
        },
        'text/html': function(){
            res.render("index", {links: repo.getAllLinks()});
        },
        'application/json': function(){
            res.json(repo.getAllLinks());
        },
        'default': function() {
            res.render("index", {links: repo.getAllLinks()});
        }
    });
  
});

module.exports = router;
