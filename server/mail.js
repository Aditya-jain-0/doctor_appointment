var nodemailer = require('nodemailer');

const mailme = (em,serverotp,callback)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sender_email_address',
    pass: 'sender_password'
  }
});

var mailOptions = {
  from: 'sender_email_address',
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