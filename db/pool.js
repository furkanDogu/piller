let mysql = require('mysql');
let config = require('./db_config');

let pool  = mysql.createPool({
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b9ff67ddb3f48f",
    password: "31551bae",
    database: "heroku_2ed98b7fdb9a055"
});

var getConnection = (callback) => {
    pool.getConnection((err, connection) => {
        callback(err, connection);
    });
};

module.exports = getConnection;
