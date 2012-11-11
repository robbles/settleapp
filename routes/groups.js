
var db = require('../database');

/*
 * GET /groups
 */
app.get('/groups', function(req, res){
  var user = '509eefe3cbb1290000000001';
  // TODO: filter by user
  db.Group.find({members: user})
  .populate('owner')
  .populate('members')
  .populate('expenses')
  .exec(function (err, groups) {
    if(err) return res.send(500, 'Failed to fetch groups:' + err);
    res.send(200, groups);
  });
});

app.get('/groups/:id', function(req, res) {
  var id = req.params.id;

  // TODO: filter by user
  db.Group.findOne({_id: id})
  .populate('owner')
  .populate('members')
  .populate('expenses')
  .exec(function (err, group) {
    res.send(200, group);
  });
});
