var mysql = require('mysql');

// var con = mysql.createConnection({
//     //host: "104.198.97.44",
//     socketPath: "/cloudsql/t-solstice-224300:us-west1:acamedia-db",
//     user: "root",
//     password: "yogi03",
//     database  : 'acamedia'
// });
//
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

var pool = mysql.createPool({
    connectionLimit : 100, //important
    //host     : '127.0.0.1',
    socketPath: "/cloudsql/t-solstice-224300:us-west1:acamedia-db",
    user     : 'root',
    password : 'yogi03',
    database : 'acamedia',
    debug    :  false
});

class DatabaseHandler {

    static query_db (query, callback) {
        pool.getConnection(function(err,connection){
            if (err) {
                throw err;
            }

            console.log('connected as id ' + connection.threadId);

            connection.query(query ,function(err, rows){
                connection.release();
                if(!err) {
                    callback(rows);
                }
            });

            connection.on('error', function(err) {
                throw err;
            });
        });
        // con.query(query, function (err, result) {
        //     if (err){
        //         console.warn(query);
        //         throw err;
        //     }
        //     return callback(result);
        // });
    }
}

module.exports = DatabaseHandler;