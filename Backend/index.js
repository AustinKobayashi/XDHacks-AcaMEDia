const QueryEngine = require('./QueryEngine.js');
const DatabaseBuilder = require('./CloudDatabaseBuilder.js');

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

exports.QueryPubmed = (req, res) => {
    const query = req.query.term;
    const lab_id = parseInt(req.query.lab_id);

    DatabaseBuilder.query_pubmed(query, lab_id, (result) => {
        if (result){
            res.send(200)
        }else{
            res.send(500)
        }
    });
};
exports.InsertPubmedArticles = (req, res) => {

    let article_id = parseInt(req.query.id);
    let lab_id = parseInt(req.query.lab_id);

    DatabaseBuilder.get_and_insert_articles(article_id, lab_id,(result) => {
        if (result){
            res.send(200)
        }else{
            res.send(500)
        }
    });
};