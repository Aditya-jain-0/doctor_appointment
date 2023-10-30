const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/DB')
const Doctor = require('./models/doc')

require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(() => { console.log("User DB Connected Successfully"); })
.catch((err) => { console.log(err); });


const mailfunc = require('./mail')
const confmailfunc = require('./confmail')

app.use(cors());
app.use(express.json())

app.get('/',async(req,res)=>{
    try{
        const doctors = await Doctor.find();
        res.status(200).json(doctors)
    }catch(err){
        console.error("Error fetching doctors:", err);
        res.status(500).json({ err: 'Error fetching doctors.' });
    }
})

app.post('/', async (req, res) => {
    const { useremail: email } = req.body;
    try {
      const user = await User.findOne({ email });     
      if (user) {
        if (user.previousVisits && user.previousVisits.length > 0) {
          const latestVisit = user.previousVisits[user.previousVisits.length - 1];
          res.status(200).json({
            name: user.username,
            latestVisit: latestVisit,
          });
        } else {
          res.status(200).json({
            name: user.username,
            latestVisit: null,
          });
        }
      } else {
        res.status(401).json({ message: 'User not registered' });
      }
    } catch (error) {
      console.log(error);
    }
  });
  
function generateRandomSixDigitNumber() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomNumber;
}
app.post('/register',async(req,res)=>{
    const {username,email : em,otp,flag} = req.body;
    // console.log(flag)
    const serverotp = generateRandomSixDigitNumber();
    try {
        if(username && em){
            mailfunc(em,serverotp,(error,resp)=>{
                if(error){
                    console.log(error);
                    res.status(401).json({message:'Email not found'})
                }else{
                    console.log('Email sent: ' + resp);
                    res.status(200).json({ message: 'Email sent successfully',otp:serverotp });
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
    if(flag){
        const newUser = new User({
            username:username,
            email:em
        })
        try {
            const saveUser = await newUser.save();
            res.status(200).json({message : 'Registered succesfully'})
        } catch (error) {
            console.log(error);
        }
    }
})

app.post('/book/:timingId', async (req, res) => {
    const { username, email, docname, timing, timingId } = req.body;
    console.log(username, docname, timing, timingId);
    try {
      const doctor = await Doctor.findOne({ docname });
      doctor.slots.forEach((slot, index) => {
        console.log(`Timing: ${slot.timing}, Booked: ${slot.isBooked},tid : ${slot._id}`);
      });
      const slottoupdate = doctor.slots.find(
        (slot) => slot._id.toString() === timingId
      );
      console.log(slottoupdate);
      slottoupdate.isBooked = true;
      try {
        await doctor.save();
        confmailfunc(username, email, docname, timing, (error, resp) => {
          if (error) {
            console.log(error);
            res.status(401).json({ message: 'Email not found' });
          } else {
            console.log('Email sent: ' + resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
      res.status(200).json({ message: 'Booking successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
app.post('/addprevisit',async(req,res)=>{
    const {username,docname,timing,currdate} = req.body;
    try {
        const user = await User.findOne({username});
        user.previousVisits.push({
            doctor: docname,
            date: currdate,
            time: timing,
        })

        await user.save()
        return res.status(200).json({ message: 'Previous visit added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' })
    }
})

app.listen(PORT,()=>{
    console.log(`Server runnnig at post ${PORT}`)
})