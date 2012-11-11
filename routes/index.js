
var db = require('../database');

/*
 * GET home page.
 */

app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.get('/login', function(req, res){
  res.render('login', { title: 'Express' });
});
