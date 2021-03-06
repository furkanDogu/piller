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
            conn.release();
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
            conn.release();
        });
    });
});

productService.bringAllProducts = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        let queryString = '';
        if (req.params.id) {
            queryString = 'SELECT * FROM view_products_on_sale WHERE userID != ? AND productID = ?';
            conn.query(queryString, [req.params.userID, req.params.id], (error, result) => {
                if(error) reject(error);
                if(result.length === 0) reject({ message: 'Aradığınız ürün bulunamadı'});
                let newProduct = { ...result[0] };
                newProduct.price = newProduct.price + ' ₺';
                queryString = 'SELECT * FROM tbl_favorite WHERE userID = ? AND productID = ?';
                conn.query(queryString, [req.params.userID, req.params.id], (error, result) => {
                    if(error) reject(error);
                    if(result.length === 0) {
                        resolve({...newProduct, isFav: false });
                    } else {
                        let favProduct = {...newProduct, isFav: true};
                        resolve(favProduct);
                    }
                });
            });
        } else {
            queryString = 'SELECT * FROM view_products_on_sale WHERE userID != ? ORDER BY pr_date';
            conn.query(queryString,[req.params.userID],(error, result) => {
                if (error) reject(error);
                const newResult = result.map((product) => {
                    let obj = { ...product };
                    obj.price = obj.price + ' ₺';
                    return obj;
                });
                resolve(newResult);
            });
        }
        conn.release();
        
    });
});
productService.bringMyProducts = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if (connError) reject(connError);
        let queryString = '';
        if (req.params.id) {
            queryString = 'SELECT * FROM view_products_by_user WHERE userID = ? AND productID = ?';
            conn.query(queryString, [req.params.userID, req.params.id] ,(error, result) => {
                if(error) reject(error);
                if(result.length === 0) reject({ message: 'Aradığınız ürün bulunamadı'});
                let newProduct = { ...result[0] };
                newProduct.price = newProduct.price + ' ₺';
                resolve(newProduct);
                conn.release();
            });

        } else {
            queryString = 'SELECT * FROM view_products_by_user WHERE userID = ?';
            conn.query(queryString, [req.params.userID], (err, result) => {
                if(err) reject(err);
                const newResult = result.map((product) => {
                    let obj = { ...product };
                    obj.price = obj.price + ' ₺';
                    return obj;
                }); 
                resolve(newResult);
                conn.release();
            });
        }
        
        
    });
});

productService.bringProductBySearch = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError); 
        let queryString = "SELECT * FROM view_products_on_sale WHERE userID != ? AND productName LIKE"+" '%"+ req.params.key+"%'";
        conn.query(queryString, [req.params.userID], (error, result) => {
            if (error) reject(error);
            if (result.length === 0) {
                queryString = 'SELECT * FROM view_products_on_sale WHERE userID != ? ORDER BY pr_date';
                conn.query(queryString, [req.params.userID], (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                    conn.release();
                }); 
            } else {
                resolve(result);
                conn.release();
            }
            
        });
    });
});

productService.buyProduct = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if (connError) reject(connError);
        let queryString = 'CALL sp_buy_product(?,?)'
        conn.query(queryString, [req.body.userID, req.body.productID], (error, result) => {
            if(error) reject(error);
            resolve(result);
            conn.release();
        });
    });
});


productService.bringSoldProducts = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        let queryString = '';
        if (req.params.id) { 
            queryString = "SELECT * FROM view_sold_products WHERE userID = ? AND productID = ?";
            conn.query(queryString, [req.params.userID, req.params.id], (error, result) => {
                if (error) reject(error);
                if(result.length === 0) reject({ message: 'Aradığınız ürün bulunamadı'});
                let newProduct = { ...result[0] };
                newProduct.price = newProduct.price + ' ₺';
                resolve(newProduct);
            });
        } else {
            queryString = "SELECT * FROM view_sold_products WHERE userID = ?";
            conn.query(queryString, [req.params.userID], (error, result) => {
            if (error) reject(error);
            const newResult = result.map((product) => {
                let obj = { ...product };
                obj.price = obj.price + ' ₺';
                return obj;
            }); 
            resolve(newResult);
            conn.release();
        }); 
        }
        
    });
});

productService.bringBoughtProducts = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        let queryString = '';
        if(req.params.id) {
            queryString = "SELECT * FROM view_bought_products WHERE buyerID = ? AND productID = ?";
            conn.query(queryString, [req.params.userID, req.params.id] , (error, result) => {
                if (error) reject(error);
                if(result.length === 0) reject({ message: 'Aradığınız ürün bulunamadı'});
                let newProduct = { ...result[0] };
                newProduct.price = newProduct.price + ' ₺';
                resolve(newProduct);
            });
        } else {
            queryString ="SELECT * FROM view_bought_products WHERE buyerID = ?";
            conn.query(queryString, [req.params.userID], (error, result) => {
                if (error) reject(error);
                const newResult = result.map((product) => {
                    let obj = { ...product };
                    obj.price = obj.price + ' ₺';
                    return obj;
                }); 
                resolve(newResult);
                conn.release();
            }); 
        }        
    });
});

productService.addRequestedProduct = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if (connError) reject(connError);
        let queryString = 'CALL sp_add_request (?, ?, ?, ?, ?)';
        conn.query(queryString, [
            req.body.productName,
            parseInt(req.body.categoryID),
            parseInt(req.body.userID),
            parseFloat(req.body.price),
            req.body.pr_desc
        ], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
});

productService.bringRequestedProducts = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if (connError) reject(connError);
        let queryString = 'SELECT * FROM view_requested_products WHERE userID != ?';
        conn.query(queryString,[req.params.userID],(error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
});

productService.adjustRequestedProduct = (req) => new Promise((resolve, reject) => {
    getConnection((connError, conn) => {
        if(connError) reject(connError);
        let queryString = 'CALL sp_adjust_request(?, ?)';
        conn.query(queryString, [req.body.requestID, req.body.userID], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
});


module.exports = productService;