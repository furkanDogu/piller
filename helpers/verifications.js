const jwt = require('jsonwebtoken');


// a middleware that checks if the token is expired.
const verifyToken = (req, res, next) => {
    console.log(req.headers);
    var token = req.headers['web-token'];
    if (!token) {
        return res.status(403).json({ auth: false, message: 'No token provided'});
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token'});
        req.role = decoded.role;
        req.userID = decoded.userID;
        next();
    });
}

