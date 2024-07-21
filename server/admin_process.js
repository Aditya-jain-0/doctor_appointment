const express = require('express');
const router = express.Router();

const Doctor = require('./models/doc')
const Admin = require('./models/admindata')

router.post('/', async (req, res) => {
    const { username: adminname, password: adminpassword } = req.body;
    try {
        const user = await Admin.findOne({ adminname, adminpassword });
        if (user) {
            res.status(200).json({ message: 'user found' })
        } else {
            res.status(401).json({ message: 'nope' })
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ err: 'Error fetching' });
    }
})

router.get('/getadmindata', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ doctors })
    } catch (err) {
        console.error("Error fetching:", err);
        res.status(500).json({ err: 'Error fetching .' });
    }
})


router.post('/:docname/:docid',async(req,res)=>{
    const {doctorid,doctorname} = req.body;
    try {
        const data = await Doctor.findOne({_id : doctorid});
        if(data){
            res.status(200).json({data});
        }else{
            res.status(404).json({message : "Doctor not found"})
        }
    } catch (error) {
        res.status(500).json({ message : "Internal Server Error"})
    }
})

router.post('/:docname/:docid/changestatus',async(req,res)=>{
    const {doctorid,doctorstatus} = req.body;
    console.log(doctorid,doctorstatus);
    
    try {
        const data = await Doctor.findOne({_id : doctorid});
        console.log(data);
    } catch (error) {
        
    }
})

module.exports = router;
