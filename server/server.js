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

app.use(cors());
app.use(express.json())

app.post('/',async(req,res)=>{
    const {useremail : email} = req.body;
    console.log(email)
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

app.listen(PORT,()=>{
    console.log(`Server runnnig at post ${PORT}`)
})