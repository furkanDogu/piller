const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const response = require('../helpers/response');


router.post('/register', (req, res) => {
   userService.registerUser(req)
   .then((result) => {  
       response.sendSuccess(res, result);
   }) 
   .catch((error) => {
       response.sendError(res, error);
   });
});

router.post('/login', (req, res) => {
    userService.loginUser(req)
    .then((result) => {
        response.sendSuccess(res, result);
    })
    .catch((error) => {
        response.sendError(res, error);
    });
});
router.get('/:userID', (req,res) => {
    userService.getUsers(req)
    .then((result) => {
        response.sendSuccess(res, result);
    }).catch((error) => {
        response.sendError(res, error);
    });
});

module.exports = router;
