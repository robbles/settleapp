
var db = require('../database');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/*
 * GET home page.
 */

app.get('/', 
  ensureLoggedIn('/login'),
  function(req, res) {

    console.log('req.user: ' + (typeof req.user) + ' : ' + req.user);

    db.Group.findByUser(req.user, function(err, groups) {
      if(err) {
        console.log('Error finding user: ' + err);
        return res.send(500, 'Error fetching groups for: ' + req.user);
      }
      console.log(groups.length + ' groups found');

      res.render('index', { title: 'SettleApp', user: req.user, groups: groups });
    });
});

