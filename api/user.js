const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const response = require('../helpers/response');


router.post('/register', (res, req, next) => {
   userService.registerUser(req)
   .then((result) => {
       response.sendSuccess(res, result);
   }) 
   .catch((error) => {
       response.sendError(res, error);
   });
});

module.exports = router;