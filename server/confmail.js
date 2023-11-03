var nodemailer = require('nodemailer');

const confmailme = (username,email,docname,timing,callback)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sender_email_address',
        pass: 'sender_password'
    }
  });
  
  var mailOptions = {
    from: 'sender_email_address',
    to: email,
    subject: 'Booking Confirmation',
    text: `Hi, ${username} \n
     Your Appointment with ${docname} at ${timing} is Confirmed \n
     See You there`
  };
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, info.response);
    }
  });
}
module.exports = confmailme