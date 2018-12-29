const express = require('express');
const router = express.Router();
const response = require('../helpers/response');
const productService = require('../services/productService');


router.post('/', (req, res, next) => {
    productService.addProduct(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});

router.get('/categories' ,(req, res, next) => {
    productService.bringCategories(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});

router.get('/myProducts/:userID', (req, res, next) => {
    productService.bringMyProducts(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});

router.get('/:userID/:id?', (req, res, next) => {
    productService.bringAllProducts(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    }); 
});



router.get('/search/:userID/:key', (req, res, next) => {
    productService.bringProductBySearch(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});


module.exports = router;