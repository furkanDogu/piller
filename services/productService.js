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

productService.bringAllProducts = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        let queryString = '';
        if (req.params.id) {
            queryString = 'SELECT * FROM view_products_on_sale WHERE userID != ? AND productID = ?';
            conn.query(queryString, [req.body.userID, req.params.id], (error, result) => {
                if(error) reject(error);
                if(result.length === 0) reject({ message: 'Aradığınız ürün bulunamadı'});
                let newProduct = { ...result[0] };
                newProduct.price = newProduct.price + ' ₺';
                resolve(newProduct);
            });
        } else {
            queryString = 'SELECT * FROM view_products_on_sale WHERE userID != ?';
            conn.query(queryString,[req.body.userID],(error, result) => {
                const newResult = result.map((product) => {
                    let obj = { ...product };
                    console.log(obj);
                    obj.price = obj.price + ' ₺';
                    return obj;
                });
                if (error) reject(error);
                resolve(newResult);
            });
        }
        
    });
});


module.exports = productService;