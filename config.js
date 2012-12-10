/*jshint es5:true, laxcomma:true */

var getFromEnv = function(setting, required) {
  if(setting in process.env) {
    return process.env[setting];
  }
  if(required === true) {
    throw new Error(setting + ' must be set in environment!');
  }
  return null;
};

module.exports = {
  ENV: getFromEnv('NODE_ENV'),

  DATABASE_URL: getFromEnv('DATABASE_URL', true),

  SECRET_KEY: getFromEnv('SECRET_KEY', true),

  FACEBOOK: {
    clientID: getFromEnv('FACEBOOK_CLIENT_ID', true),
    clientSecret: getFromEnv('FACEBOOK_CLIENT_SECRET', true),
    callbackURL: '/auth/facebook/callback'
  },

  EMAIL: {
       USER: getFromEnv('EMAIL_USER'),
       PASS: getFromEnv('EMAIL_PW'),
   }
};
