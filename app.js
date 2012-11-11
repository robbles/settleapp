/*jshint es5:true, laxcomma:true */
/**
 * Module dependencies.
 */

var express = require('express')
  , engines = require('consolidate')
  , http = require('http')
  , path = require('path')
  , db = require('./database')
  , settings = require('./settings')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;


app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.engine('html', engines.ejs);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(settings.SECRET_KEY));
  app.use(express.session());
  // passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Facebook
// profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: 174503192687578,
    clientSecret: "e1d324e833de949b88a8958503fe8f52",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification
    process.nextTick(function () {
      // // create user here
      // console.log(accessToken);
      // console.log(profile);
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.initialize();

require('./routes');
require('./routes/groups');
require('./routes/login');

db.connect()
.then(function() {
  console.log('Connected to MongoDB at ' + settings.DATABASE_URL);
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
})
.fail(function(err) {
  console.log('Failed to connect to database');
});