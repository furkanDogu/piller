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
    console.log(req);
    getConnection((connError, conn) => {
        if(connError) reject(connError);
            if(berror) reject(berror);
            let queryString = 'CALL sp_register_user(?, ?, ?, ?, ?, ?);'
            conn.query(queryString, [req.body.email, req.body.user_password, req.body.user_name, req.body.user_lastname, req.body.x, req.body.y] ,(dErr, result) => {
                if(dErr) reject(dErr);
                const singleData = result[0][0];
                resolve(singleData);
                conn.release();
            });
    });
});

module.exports = userService;
    
