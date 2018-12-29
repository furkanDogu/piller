const express = require('express');
const router = express.Router();
const response = require('../helpers/response');
const productService = require('../services/productService');


router.post('/', (req, res) => {
    productService.addProduct(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});

router.get('/categories' ,(req, res) => {
    productService.bringCategories(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});

router.get('/myProducts/:userID/:id?', (req, res) => {
    productService.bringMyProducts(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});

router.get('/:userID/:id?', (req, res) => {
    productService.bringAllProducts(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    }); 
});



router.get('/search/:userID/:key', (req, res) => {
    productService.bringProductBySearch(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});


router.post('/buy', (req, res) => {
    productService.buyProduct(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});

router.get('/sold/mySoldProducts/:userID', (req, res) => {
    productService.bringSoldProducts(req)
    .then((result) => {
        response.sendSuccess(res, result);
    })
    .catch((error) => {
        response.sendError(res, error);
    });
});

router.get('/bought/myBoughtProducts/:userID', (req, res) => {
    productService.bringBoughtProducts(req)
    .then((result) => {
        response.sendSuccess(res, result);
    })
    .catch((error) => {
        response.sendError(res, error);
    });
    
});

module.exports = router;