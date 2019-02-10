var DatabaseBuilder = require('../DatabaseBuilder.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    DatabaseBuilder.add_articles_to_database();
    res.end();
});

module.exports = router;
