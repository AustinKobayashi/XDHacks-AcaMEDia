var QueryEngine = require('../QueryEngine.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    QueryEngine.get_locations().then((locations) => {
        res.send(locations);
    });
});

module.exports = router;
