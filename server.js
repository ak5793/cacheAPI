// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var randomstring = require('randomstring');
var connectionString = "mongodb://localhost:27017/FashionCloudDB"

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect(connectionString); // connect to our database

var RandomObject = require('./app/models/randomObject');


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// Test Route
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the Cache API' });
});

// Routes matching pattern /randomObjects
// ----------------------------------------------------
router.route('/randomObjects') // create an object in cache
    .post(function(req, res) {
      var randomObject = new RandomObject();
      randomObject.name = req.body.name;
      randomObject.save(function(err) {
          if (err)
              res.send(err);
          res.json({ message: "Object created in the cache"})
      });
    })

    .get(function(req, res) {  // obtain all objects from cache
      RandomObject.find(function(err, randomObjects) {
        if (err)
            res.send(err);
        res.json(randomObjects);
      });
    })

    .delete(function(req, res) { // delete all objects from cache
      RandomObject.remove({}, function(err) {
        if (err)
            res.send(err);
        res.json({ message: "Cache has been flushed"})
      });
    });

// Routes matching pattern /randomObjects/:randomObject_id
// ----------------------------------------------------
router.route('/randomObjects/:randomObject_id')

    .get(function(req, res) { // obtain specific object
        RandomObject.findById(req.params.randomObject_id, function(err, randomObject) {
            if (err) { // if object not found in cache, include it into the cache
                console.log("Cache miss");
                var randomObject = new RandomObject();
                randomObject.name = randomstring.generate(8);
                randomObject.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: "Object created in the cache"})
                });
            } else {
            console.log("Cache hit");
            res.json(randomObject);
          }
        });
    })

    .put(function(req, res) {  // update specific object
        RandomObject.findById(req.params.randomObject_id, function(err, randomObject) {
            if (err)
                res.send({message: "Cannot update a nonexistant object"});
            randomObject.name = req.body.name;

            randomObject.save(function(err) {
                if (err)
                    res.send({err});
                res.json({ message: 'Object updated in the cache' });
            });
        });
      })

      .delete(function(req, res) { // delete specific object
        RandomObject.remove({
            _id: req.params.randomObject_id
        }, function(err, randomObject) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted object from cache' });
        });
    });
// =============================================================================
app.use('/api', router);

// START SERVER
app.listen(port);
console.log("Server now running on port " + port);
