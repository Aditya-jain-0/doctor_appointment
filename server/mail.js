var nodemailer = require('nodemailer');

const mailme = (em,serverotp,callback)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodejstest80@gmail.com',
    pass: 'ambgtgjzpvuupjjy'
  }
});

var mailOptions = {
  from: 'nodejstest80@gmail.com',
  to: em,
  subject: 'Email Verfication',
  text: `OTP :- ${serverotp}`
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, info.response);
    }
  });
}

module.exports = mailme