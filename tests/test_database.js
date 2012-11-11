
var db = require('../database');

db.connect()
.fail(function(err) {
  console.error("Failed to connect to MongoDB server at " + DATABASE_URL);
})
.then(function() {
  console.log('Connected!');

  db.Group.find({})
  .populate('owner')
  .exec(function (err, groups) {
    console.log('Groups: ' + typeof groups);
    console.log(groups);

    if(groups.length === 0) {
      console.log('Creating new User');
      var user = new db.User({name: 'Gandalf'});

      user.save(function (err) {
        if(err) return console.error('Failed to save user: ' + err);

        var group = new db.Group({
          name: "The Fellowship of the Ring",
          description: "Carrying rings and stuff",
          owner: user._id
        });
        group.save(function (err) {
          if(err) return console.error('Failed to save group: ' + err);
        });

      });
    }
  });
});
