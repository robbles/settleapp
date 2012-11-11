
app.get('/login/', function(req, res){
  res.send("do passport login");
});

app.get('/loginComplete/', function(req, res){
  res.send("done login yayyy");
});

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

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
  passport.authenticate('facebook', { successReturnToOrRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {

});

app.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/');
});