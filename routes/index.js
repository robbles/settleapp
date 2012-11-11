
var db = require('../database');

/*
 * GET home page.
 */
app.get('/', function(req, res){
  console.log(req.user);
  res.render('index', { title: 'SettleApp', user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { title: 'SettleApp' });
});
