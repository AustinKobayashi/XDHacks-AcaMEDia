var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query('use acamedia;', function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
});

class DatabaseHandler {

    static query_db (query, callback) {
        con.query(query, function (err, result) {
            if (err){
                console.warn(query);
                throw err;
            }
            return callback(result);
        });
    }
}

module.exports = DatabaseHandler;
