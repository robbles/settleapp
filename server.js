var http = require('http');
var express = require('express');

var database = require('./database');

app = express();
app.use(express.logger());

app.get('/', function(req, res){
    res.send();
});

// FB login
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: 174503192687578,
    clientSecret: e1d324e833de949b88a8958503fe8f52,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.

      // create user here
      return done(null, profile);
    });
  }
));

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
});

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});


app.get('/login', function(req, res) {
	// serve login page
});


app.get('/paypalstart', function(req, res) {
  // do paypal stuff

  res.redirect('/paypalfinish');
});

app.get('/paypalfinish', function(req, res) {
  // do other paypal stuff??

  res.send('good job!');
});


// ensure authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

var server = app.listen(8000);
console.log('Express server started on port %s', server.address().port);