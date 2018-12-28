const getConnection = require('../db/pool');
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
// this service will register user
userService.registerUser = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
                if(err) reject(err);
                queryString = 'CALL sp_register_user(?, ?, ?, ?, ?, ?);'
                conn.query(queryString, [req.body.email, req.body.user_password, req.body.user_name, req.body.user_lastname, req.body.x, req.body.y] ,(dErr, result) => {
                    if(dErr) reject(dErr);
                    const singleData = result[0][0];
                    resolve(singleData);
                    conn.release();
                });
    });
});

/*
body içinde;
email,
user_password
*/ 

userService.loginUser = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
            let queryString = 'SELECT * FROM tbl_user WHERE ?? = ? AND ?? = ?';
            conn.query(queryString, ['email',req.body.email,'user_password', req.body.user_password] ,(dErr, result) => {
                if(dErr) reject(dErr);
                if (!result) reject({ message: 'Kullanıcı bulunamadı'});
                resolve(result);
                conn.release();
            });
    });
});

module.exports = userService;
    
