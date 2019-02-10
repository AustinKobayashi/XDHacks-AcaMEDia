var QueryEngine = require('../QueryEngine.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    QueryEngine.query('news, fabio, biology', 'Vancouver').then((results) => {
        console.log(results);
    });
    res.end();
});

module.exports = router;
