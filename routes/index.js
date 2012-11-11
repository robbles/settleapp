
var db = require('../database');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
 * GET /groups
 */
exports.groups = function(req, res){
  // TODO: filter by user
  db.Group.find({})
  .populate('owner')
  .exec(function (err, groups) {
    res.send(200, groups);
  });
};

exports.group = function(req, res) {
  var id = req.params.id;

  // TODO: filter by user
  db.Group.findOne({_id: id})
  .populate('owner')
  .populate('members')
  .populate('expenses')
  .exec(function (err, group) {
    res.send(200, group);
  });
};
