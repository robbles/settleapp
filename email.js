var nodemailer = require("nodemailer");
var config = require('./config');

var ENABLED = (config.ENV === 'production');

// smtpTransport function creates a new Transport object for SMTP
var smtpTransport;
if(ENABLED) {
  console.log('Using SMTP transport');
  smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: config.EMAIL.USER,
      pass: config.EMAIL.PASS
    }
  });
} else {
  console.log('warning: using fake email service');
  smtpTransport = {
    sendMail: function(opt, callback) {
      console.log('Sending email:');
      console.log(opt);
      callback(false);
    }
  };
}

// sendEmail is main function that takes care of sending the email.
// It takes the following:
//    opt: which includes from, to, subject, body
//    callback: callback function
exports.sendEmail = function(opt, callback) {
  smtpTransport.sendMail({
    from: opt.from, // sender address
    to: opt.to, // comma separated list of receivers
    subject: opt.subject, // Subject line
    text: opt.text // plaintext body
  }, callback);
};

