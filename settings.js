/*jshint es5:true, laxcomma:true */
console.log(process.env.DATABASE_URL);
module.exports = {

  DATABASE_URL: process.env.DATABASE_URL,

  SECRET_KEY: process.env.SECRET_KEY || 'secret',

  FACEBOOK: {
    clientID: 174503192687578,
    clientSecret: "e1d324e833de949b88a8958503fe8f52",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }
};
