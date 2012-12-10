/*jshint es5:true, laxcomma:true */

var db = require('../database');
var config = require('../config');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

// display login buttons
app.get('/login', function(req, res){
  res.render('login', { title: 'Express' });
});

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
  function(req, res){}
);

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successReturnToOrRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {}
);

// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Facebook
// profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK.clientID,
    clientSecret: config.FACEBOOK.clientSecret,
    callbackURL: config.FACEBOOK.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Access token: ' + accessToken);
    console.log(profile);

    var externalId = profile.id + '@' + profile.provider;

    // lookup user
    db.User.findOne({externalId: externalId}, function(err, user) {
      if(err) {
        console.log('Error finding user: ' + err);
        return done(err);
      }
      if(!user) {
        console.log('User ' + externalId + ' not found, creating...');

        var newUser = new db.User({
          name: profile.displayName,
          email: profile.emails[0].value,
          externalId: externalId,
          avatarUrl: "https://graph.facebook.com/"+profile.id+"/picture?type=small",
          owing: 0
        });

        newUser.save(function(err, user) {
          if(err) {
            console.log('Error creating user: ' + err);
            return done(err);
          }
          console.log('Created user ' + user._id);
          return done(null, user);
        });
      }
      else {
        console.log('User found: ' + user._id);
        return done(null, user);
      }
    });

  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.initialize();


app.get('/logout', function(req, res){
  console.log('logout fired');
  req.logOut();
  res.redirect('/');
});
