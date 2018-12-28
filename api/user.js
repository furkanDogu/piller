const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const response = require('../helpers/response');


router.post('/register', (req, res, next) => {
   userService.registerUser(req)
   .then((result) => {  
       response.sendSuccess(res, result);
   }) 
   .catch((error) => {
       response.sendError(res, error);
   });
});

router.post('/login', (req, res, next) => {
    userService.loginUser(req)
    .then((result) => {
        response.sendSuccess(res, result);
    })
    .catch((error) => {
        response.sendError(res, error);
    });
});

module.exports = router;