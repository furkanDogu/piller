const getConnection = require('../db/pool');

const welcomeService = {};

welcomeService.emre = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        conn.query('SELECT * FROM firsttable', (err, result) => {
            if(err) reject(err);
            resolve(result);
            conn.release();
        });
    });
});

module.exports = welcomeService;
    
