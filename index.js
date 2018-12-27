var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
    res.send('Hello World !');
});

app.get('/emre', (req, res, next) => {
    var obj = JSON.stringify({
        ad: 'Furkan',
        tasakAdi: 'Emre'
    });
    res.send(obj);
});


app.listen(PORT, () => {
    console.log('listening on ' + PORT);
});
