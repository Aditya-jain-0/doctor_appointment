const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/DB')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL)
.then(() => { console.log("DB Connected Successfully"); })
.catch((err) => { console.log(err); });

const mailfunc = require('./mail')

app.use(cors());
app.use(express.json())

app.post('/',async(req,res)=>{
    const {useremail : email} = req.body;
    // console.log(email)
    try {
        const user = await User.findOne({email});
        if(user){
            res.status(200).json({name : user.username})
        }else{
            res.status(401).json({message : 'User not registered'})
        }
    } catch (error) {
            console.log(error);      
    }
})
function generateRandomSixDigitNumber() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomNumber;
}
app.post('/register',async(req,res)=>{
    const {username,email : em} = req.body;
    console.log(username,em)
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

})

app.listen(PORT,()=>{
    console.log(`Server runnnig at post ${PORT}`)
})