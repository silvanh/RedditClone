var express = require('express');
var repo = require('../data/linksRepo');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.format({
        'text/plain': function(){
            res.send(JSON.stringify(repo.getAllLinks()));
        },
        'text/html': function(){
            res.render("index", {links: repo.getAllLinks(), session: req.session});
        },
        'application/json': function(){
            res.json(repo.getAllLinks());
        },
        'default': function() {
            res.render("index", {links: repo.getAllLinks(), session: req.session});
        }
    });
});

router.get('/:id', function(req, res, next) {
    res.format({
        'text/plain': function(){
            res.send(JSON.stringify(repo.getLink(Number(req.params.id))));
        },
        'text/html': function(){
            res.render("link", {link : repo.getLink(Number(req.params.id))});
        },
        'application/json': function(){
            res.json(repo.getLink(Number(req.params.id)));
        },
        'default': function() {
            res.render("link", {link : repo.getLink(Number(req.params.id))});
        }
    });
});

router.post('/', function(req, res, next) {
    repo.createNewLink(req.body.title, req.body.url, req.body.sender);
    res.render("index", {links: repo.getAllLinks()});
});

router.delete('/:id', function(req, res, next) {
    repo.deleteLink(Number(req.params.id));
    res.render("index", {links: repo.getAllLinks()});
});

router.put('/:id/up', function(req, res, next) {
    var link = repo.getLink(Number(req.params.id));
    repo.upVote(link);
    res.render("link", {link : repo.getLink(Number(req.params.id))});
});

router.put('/:id/down', function(req, res, next) {
    var link = repo.getLink(Number(req.params.id));
    repo.downVote(link);
    res.render("link", {link : repo.getLink(Number(req.params.id))});
});


module.exports = router;
