var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../database');
var email = require('../email');
var config = require('../config');

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
  var invited = req.body.invited || [];

  console.log('Request to create group:');
  console.log(req.body);

  db.Group.create(name, description, owner, invited,
  function(err, group) {
    if(err) {
      console.log('Error creating group: ' + err);
      return res.send(500, 'Failed to create group:' + err);
    }
    console.log('Created group ' + group._id + ': ' + group.invited.length + ' people invited');

    // Return 201 to the user
    res.send(201, group);

    // Send emails to invited people
    invited.forEach(function(invitee) {
      console.log('Sending invite email to ' + invitee + '...');

      // Render the template for each email
      app.render('invite',
        {
          invitee: invitee,
          inviter: owner,
          group: group.name,
          link: 'http://link-goes-here.com/fake'
        }, function(err, body){
          // Send the email
          email.sendEmail({
            from: 'SettleApp Mailer <' + config.EMAIL.USER + '>',
            to: invitee,
            subject: "You've been invited to SettleApp!",
            text: body
          }, function(err) {
            if(err) { return console.warn('Error sending email: ' + err); }
            console.log('Sent invite email to ' + invitee + ' successfully');
          });
      });
    });

  });
});

