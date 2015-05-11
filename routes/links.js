var express = require('express');
var repo = require('../data/linksRepo');
var router = express.Router();
var index = require('./index.js');

router.get('/', getLinks);

function getLinks(req, res, next) {
    res.format({
        'text/plain': function() {
            res.send(JSON.stringify(repo.getAllLinks()));
        },
        'text/html': function() {
            res.render("index", {links: repo.getAllLinks(), session: req.session, isLoggedIn: index.isLoggedIn(req)});
        },
        'application/json': function() {
            res.json(repo.getAllLinks());
        },
        'default': function() {
            res.render("index", {links: repo.getAllLinks(), session: req.session, isLoggedIn: index.isLoggedIn(req)});
        }
    });
};

router.get('/:id', getLinkById);

function getLinkById(req, res, next) {
    res.format({
        'text/plain': function() {
            res.send(JSON.stringify(repo.getLink(Number(req.params.id))));
        },
        'text/html': function() {
            res.render("link", {link : repo.getLink(Number(req.params.id))});
        },
        'application/json': function() {
            res.json(repo.getLink(Number(req.params.id)));
        },
        'default': function() {
            res.render("link", {link : repo.getLink(Number(req.params.id))});
        }
    });
};

router.post('/', index.requireLogin, createLink);

function createLink(req, res, next) {
    repo.createNewLink(req.body.title, req.body.url, req.body.sender);
    res.render("index", {links: repo.getAllLinks(), session: req.session, isLoggedIn: index.isLoggedIn(req)});
};

router.delete('/:id', index.requireLogin, deleteLink);

function deleteLink(req, res, next) {
    repo.deleteLink(Number(req.params.id));
    res.render("index", {links: repo.getAllLinks(), session: req.session, isLoggedIn: index.isLoggedIn(req)});
};

router.put('/:id/up', index.requireLogin, upVote);

function upVote(req, res, next) {
    var link = repo.getLink(Number(req.params.id));
    repo.upVote(link);
    res.send(JSON.stringify(repo.getLink(Number(req.params.id))));
};

router.put('/:id/down', index.requireLogin, downVote);

function downVote(req, res, next) {
    var link = repo.getLink(Number(req.params.id));
    repo.downVote(link);
    res.send(JSON.stringify(repo.getLink(Number(req.params.id))));
};


module.exports = router;
