var nodemailer = require('nodemailer');

const mailme = (em,serverotp,callback)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sendermail@gmail.com',
    pass: 'sender-app-password'
  }
});

var mailOptions = {
  from: 'sendermail@gmail.com',
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