var express = require('express');
var app = express();
var pool = require('./db/pool');
var PORT = process.env.PORT || 5000;
const { getConnection } = pool;




app.get('/', (req, res, next) => {
    res.send('Hello World2');
});
app.get('/emre', (req, res, next) => {
    getConnection((connError, conn) => {
        conn.query('SELECT * FROM firsttable', (error, result) => {
            if(connError) res.status(400).json(connError);
            res.status(200).json(result);
            
        });
    });
    
});

app.listen(PORT, () => {
    console.log('listening on ' + PORT);
});
