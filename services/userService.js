const getConnection = require('../db/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = {};


/*
body içinde: 
email,
user_password,
user_name,
user_lastname,
x,
y
*/ 
userService.registerUser = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        bcrypt.hash(req.body.user_password, 10, (berror, hash) => {
            if(berror) reject(berror);
            let queryString = 'CALL sp_register_user(?, ?, ?, ?, ?, ?);'
            conn.query(queryString, [req.body.email, req.body.user_password, req.body.user_name, req.body.user_lastname, req.body.x, req.body.y] ,(dErr, result) => {
                if(dErr) reject(dErr);
                resolve(result);
                conn.release();
            });
        });
       
    });
});

module.exports = userService;
    
