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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const query = req.query.term;
    const lab_id = parseInt(req.query.lab_id);
    console.log("LAB ID = " + lab_id);
    console.log("QUERY = " + req.query.term);
    if (query === null || lab_id == null) return res.send(500);
    DatabaseBuilder.query_pubmed(query, lab_id, (result) => {
        if (result > 0){
            res.status(500);
            res.send(result + " attempts have failed");
        }else if (result === 0){
            res.status(200);
            res.send("Success")
        }else{
            res.status(500);
            res.send("Other Failure");
        }
    });
};
exports.InsertPubmedArticles = (req, res) => {

    let article_id = parseInt(req.query.id);
    let lab_id = parseInt(req.query.lab_id);
    console.log("LAB ID = " + lab_id);
    console.log("Article ID = " + article_id);
    if (lab_id == null || article_id == null) return res.send(500);

    DatabaseBuilder.get_and_insert_articles(article_id, lab_id,(result) => {
        if (result){
            res.send(200)
        }else{
            res.send(500)
        }
    });
};