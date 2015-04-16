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
    console.log(JSON.stringify(req.body));
    repo.createNewLink(req.body.title, req.body.url, req.body.sender);
    res.redirect('/');
});

router.delete('/:id', function(req, res, next) {
    repo.deleteLink(Number(req.params.id));
    res.redirect('/');
});

router.put('/:id/up', function(req, res, next) {
    var link = repo.getLink(Number(req.params.id));
    link.ranking+=1;
    res.redirect('/');
});

router.put('/:id/down', function(req, res, next) {
    var link = repo.getLink(Number(req.params.id));
    link.ranking-=1;
    res.redirect('/');
});

/*var router = express.Router();

var links = [ ];

// CRUD links listing.
router.get('/', function(req, res, next) {
  renderData(res, links);
});

router.get('/:id', function(req, res, next) {
  renderData(res, links[Number(req.params.id)]);
});

router.post('/', function(req, res, next) {
  readData(req, function(data) {
        if (data) {
            var linkId = links.length;
            links[linkId] = data;
            data.id = linkId;
        }
        renderData(res, data);
    });
});

router.put('/:id', function(req, res, next) {
    readData(req, function(data) {
        if (data) {
            var linkId = Number(req.params.id);
            if (links[linkId]) {
                links[linkId] = data;
                data.id = linkId;
            }
        }
        renderData(res, data);
    });
});

router.delete('/:id', function(req, res, next) {
    var linkId = Number(req.params.id);
    var data = links[linkId]
    links.splice(linkId, 1);
    renderData(res, linkId);
});

// Up/Down voting

router.post('/:id/Up', function(req, res, next) {
  readData(req, function(data) {
        if (data) {
            var linkId = links.length;
            links[linkId] = data;
            data.id = linkId;
        }
        renderData(res, data);
    });
});

router.post('/:id/Down', function(req, res, next) {
  readData(req, function(data) {
        if (data) {
            var linkId = links.length;
            links[linkId] = data;
            data.id = linkId;
        }
        renderData(res, data);
    });
});

function readData(req, callback) {
    var body = '';
    req.on(
        'readable' ,
        function () {
            var rawBody = req.read();
            if (rawBody) {
                if (typeof rawBody === 'string') {
                    body += rawBody;
                } else if (typeof rawBody === 'object' && rawBody instanceof Buffer) {
                    body += rawBody.toString('utf8');
                }
            }
        });
    req.on(
        'end',
        function() {
            callback(body ? JSON.parse(body) : null);
        });
}

function renderData(res, data) {
    res.writeHead(200, {
        "Content-Type" : "application/json"
    });

    res.end(JSON.stringify({
        data : data || null
    }));
}
*/
module.exports = router;
