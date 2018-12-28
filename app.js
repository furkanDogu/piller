const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const welcome = require('./api/welcome');
const userRoute = require('./api/user');
const productRoute = require('./api/product');


// morgan is a tool that showns coming requests in command prompt. Very helpful for debugging
// bodyParser is encoding coming json data to js object.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// here we allow anything possible to avoid CORS errors.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Accept, Authorization, content-type, web-token,');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// default page
app.get('/', (req, res) => {
    res.send('Please use some endpoints to get API data');
});
app.use('/welcome', welcome);
app.use('/user', userRoute);
app.use('/product', productRoute);

// if all the routes are checked and there is no matched route, then given endpoint is not valid so we need to show 404 not found here.
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// this one is responsible for showing error messages of previos layer.
app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            },
            Success: false
        });
});

module.exports = app;

