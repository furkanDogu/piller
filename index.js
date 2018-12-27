var express = require('express');
var mysql = require('mysql');
var app = express();
var PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
    res.send('Hello World !');
});

var conn = mysql.createConnection({
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b9ff67ddb3f48f",
    password: "31551bae",
    database: "heroku_2ed98b7fdb9a055"
});

conn.connect();


app.get('/emre', (req, res, next) => {
    conn.query('SELECT * FROM firsttable', (error, result) => {
        res.status(200).json(result);
    });
});

app.listen(PORT, () => {
    console.log('listening on ' + PORT);
});
