const getConnection = require('../db/pool');
const productService = {};


/*
productName
price,
userID,
categoryID,
desc
*/
productService.addProduct = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        let queryString = 'CALL sp_add_new_product(?, ?, ?, ?, ?)';
        conn.query(queryString, [req.body.productName, req.body.price, req.body.userID, req.body.categoryID, req.body.desc], (error) => {
            if (error) reject(error);
            resolve({ message: 'Ürün başarıyla eklendi' });
        });
    });
});

productService.bringCategories = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        let queryString = 'SELECT * FROM tbl_category';
        conn.query(queryString, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
});


module.exports = productService;