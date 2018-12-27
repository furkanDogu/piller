var express = require('express');
var app = express();
var pool = require('./db/pool');
var PORT = process.env.PORT || 5000;
const { getConnection } = pool;




app.get('/', (req, res, next) => {
    res.send('Hello World !');
});
app.get('/emre', (req, res, next) => {
    getConnection((err, conn) => {
        conn.query('SELECT * FROM firsttable', (error, result) => {
            res.status(200).json(result);
        });
        conn.release();
    });
    
});

app.listen(PORT, () => {
    console.log('listening on ' + PORT);
});
