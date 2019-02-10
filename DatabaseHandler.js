var mysql = require('mysql');

var con = mysql.createConnection({
    host: "104.198.97.44",
    // socketPath: "/cloudsql/t-solstice-224300:us-west1:acamedia-db",
    user: "root",
    password: "yogi03",
    database  : 'acamedia'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
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
