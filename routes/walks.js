var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('walkdb', ['walks'])
    //var db = mongojs('mongodb://daniel:mla77184b@ds137749.mlab.com:37749/walkey', ['walks'])

//Get All walks
router.get('/walks', function(req, res, next) {
    db.walks.find(function(err, walks) {
        if (err) {
            res.send(err);
        }
        res.json(walks);
    })
});

//Get Single Walks
router.get('/walks/:id', function(req, res, next) {
    db.walks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, walk) {
        if (err) {
            res.send(err);
        }
        res.json(walk);
    })
});

//Get Walks with weather
router.get('/walks/search?weather:weather', function(req, res, next) {
    db.walks.findOne({ "path.feature.weather": mongojs.ObjectId(req.params.weather) }, function(err, walk) {
        if (err) {
            res.send(err);
        }
        res.json(walk);
    })
});

//Save walk
router.post('/walks', function(req, res, next) {
    var walk = req.body;
    if (!walk.name) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.walks.save(walk, function(err, walk) {
            if (err) {
                res.send(err);
            }
            res.json(walk);
        });
    }
})

//Delete walk
router.delete('/walks/:id', function(req, res, next) {
    db.walks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, walk) {
        if (err) {
            res.send(err);
        }
        res.json(walk);
    })
});

//Update walk
router.put('/walks/:id', function(req, res, next) {
    var walk = req.body;
    var updwalk = {};

    if (walk.isDone) {
        updwalk.isDone = walk.isDone;
    }
    if (walk.title) {
        updwalk.title = walk.title;
    }
    if (!updwalk) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    }
    db.walks.update({ _id: mongojs.ObjectId(req.params.id) }, updwalk, function(err, walk) {
        if (err) {
            res.send(err);
        }
        res.json(walk);
    })
});

module.exports = router;