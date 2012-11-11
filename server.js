var http = require('http');
var express = require('express');

var database = require('./database');

app = express();
app.use(express.logger());

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/paypalstart', function(req, res) {
  // do paypal stuff

  res.redirect('/paypalfinish');
});

app.get('/paypalfinish', function(req, res) {
  // do other paypal stuff??

  res.send('good job!');
});

var server = app.listen(8000);
console.log('Express server started on port %s', server.address().port);

