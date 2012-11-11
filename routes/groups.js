var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../database');

/*
 * GET /groups
 */
app.get('/groups', ensureLoggedIn('/login'),
function(req, res) {
  db.Group.find({members: req.user})
  .populate('owner')
  .populate('members')
  .populate('expenses')
  .exec(function (err, groups) {
    if(err) return res.send(500, 'Failed to fetch groups:' + err);
    res.send(200, groups);
  });
});

app.get('/groups/:id', ensureLoggedIn('/login'),
function(req, res) {
  var id = req.params.id;

  db.Group.findOne({_id: id, members: req.user})
  .populate('owner')
  .populate('members')
  .populate('expenses')
  .exec(function (err, group) {
    if(err) return res.send(500, 'Failed to fetch group:' + err);
    if(!group) return res.send(404, 'Group not found: ' + id);
    return res.send(200, group);
  });
});

app.post('/groups', ensureLoggedIn('/login'),
function(req, res) {
  var owner = req.user;
  var name = req.body.name;
  var description = req.body.description || 'No Description';
  var invited = (typeof req.body.invited !== 'undefined')? req.body.invited.split(',') : [];

  db.Group.create(name, description, owner, invited,
  function(err, group) {
    if(err) return res.send(500, 'Failed to create group:' + err);
    return res.send(201, group);
  });
});

