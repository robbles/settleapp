
var db = require('../database');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/*
 * GET home page.
 */
app.get('/', 
  ensureLoggedIn('/login'),
  function(req, res) {
  console.log('req.user: ' + (typeof req.user) + ' : ' + req.user);

  res.render('index', { title: 'Express', user: req.user });
});

