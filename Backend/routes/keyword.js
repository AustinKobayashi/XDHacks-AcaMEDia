var KeywordExtractor = require('../KeywordExtractor.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    KeywordExtractor.extract_keywords('./files');
    res.end();
});

module.exports = router;
