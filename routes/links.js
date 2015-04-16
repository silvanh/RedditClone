var express = require('express');
var router = express.Router();

var links = [ ];

/* CRUD links listing. */
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

/* Up/Down voting */

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

module.exports = router;
