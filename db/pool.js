let mysql = require('mysql');
let config = require('./db_config');

let pool  = mysql.createPool(config);

function getConnection (callback) {
    pool.getConnection((err, connection) => {
        callback(err, connection);
    });
};

module.exports = getConnection;
