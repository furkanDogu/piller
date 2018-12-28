const express = require('express');
const router = express.Router();
const welcomeService = require('../services/welcomeService');
const response = require('../helpers/response');


router.get('/', (req, res) => {
    res.status(200).send('Hello freaking world!');
});

router.get('/emre', (req, res) => {
    welcomeService.emre(req)
    .then((result) => {
        response.sendSuccess(res, result);
    })
    .catch((error) => {
        response.sendError(res, error);
    });
});
module.exports = router;