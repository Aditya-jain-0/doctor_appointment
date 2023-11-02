var nodemailer = require('nodemailer');

const confmailme = (username,email,docname,timing,callback)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodejstest80@gmail.com',
        pass: 'ambgtgjzpvuupjjy'
    }
  });
  
  var mailOptions = {
    from: 'nodejstest80@gmail.com',
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