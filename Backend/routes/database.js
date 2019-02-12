var DatabaseBuilder = require('../DatabaseBuilder.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/old', function(req, res, next) {
    // res.send('respond with a resource');
    DatabaseBuilder.add_articles_to_database();
    res.end();
});

router.get('/', function (req, res, next) {

    res.render("database", {});
});


router.post('/', function(req, res, next) {
    let query_term = req.body.query_term;
    let query_term_parts = query_term.split(" ");
    let query = query_term_parts.join("+");

    let lab_id = parseInt(req.body.lab_id);

    DatabaseBuilder.query_pubmed(query, lab_id);
    res.send(200);
});

module.exports = router;
