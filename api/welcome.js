const express = require('express');
const router = express.Router();
const getConnection = require('../db/pool');

router.get('/', (req, res) => {
    res.status(200).send('Hello fucking world!');
});

router.get('/emre', (req, res) => {
    getConnection((connError, conn) => {
        conn.query('SELECT * FROM firsttable', (err, result) => {
            res.status(200).json(result);
            conn.release();
        });
    });
});
module.exports = router;