
var db = require('../database');

var facebookId = '437589375@facebook';

var main = function() {
  console.log('Connected!');

  db.Group.findOne({}, function(err, group) {
    console.log(group);  

    db.User.findOne({externalId: facebookId}, function(err, user) {
      if(!user) {
        return createUser();
      }
      console.log(user);
    });
    
  });
};

var createUser = function() {
  var user = new db.User({
    name: 'Aragorn',
    email: 'aragorn@gondor.gov',
    externalId: facebookId,
    avatarUrl: 'http://placekitten.com/50/50',
    owing: 0
  });

  user.save(function() {
    console.log(arguments);
  });
};

db.connect()
.then(main)
.fail(function(err) {
  console.error("Failed to connect to MongoDB server at " + DATABASE_URL);
});

