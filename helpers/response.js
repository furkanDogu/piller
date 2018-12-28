const response = {};

response.sendSuccess = (res, data) => {
    res.status(200).json({
        data,
        Success: true
    });
};
response.sendError = (res, error) => {
    res.status(500).json({
        error,
        Success: false
    });
};
module.exports = response;