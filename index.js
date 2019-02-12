const QueryEngine = require('./QueryEngine.js');

/* GET users listing. */
exports.Location = (req, res) => {
    // res.send('respond with a resource');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    QueryEngine.get_locations().then((locations) => {
        res.send(locations);
    });
};

exports.Query = (req, res) => {
    // res.send('respond with a resource');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    QueryEngine.query(req.query.term, req.query.location).then((results) => {
        console.log(results);
        res.send(results);
    });
};