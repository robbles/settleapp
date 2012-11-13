/*jshint es5:true, laxcomma:true */
console.log(process.env.DATABASE_URL);
module.exports = {
  ENV: process.env.NODE_ENV || 'local',

  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://settleapp:xBOEidj64v@ds039267.mongolab.com:39267/settleapp',

  SECRET_KEY: process.env.SECRET_KEY || 'secret',

  FACEBOOK: {
    clientID: 200536266748566,
    clientSecret: "3d396cc170b25369d29b78ffe5b2ecb8",
    callbackURL: "/auth/facebook/callback"
  },

  EMAIL: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PW,
   }
};
