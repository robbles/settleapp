
var db = require('../database');

/*
 * GET home page.
 */
app.get('/', function(req, res){
  console.log(req.user);
  res.render('index', { title: 'Express', user: req.user });
});

