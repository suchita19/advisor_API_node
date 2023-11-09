const express = require("express")
const { Pool } = require("pg")
const {insert_signup_credentials} = require('../models/signup_model')
const router = new express.Router()


router.use(express.json())

// Database connection setup
const pool = new Pool({
    user: zfunds_advisors,
    host: '10.10.21.568',
    database: postgres,
    password: postgres,
    port: 5432,
  });
var client = await pool.connect();

router.post('/signup', async(req,res)=>{
    try{
        // user will give mobileNumber as a parameter
        // below arethe validation to check the mobilenumber
        if(!Object.keys(req.query).includes('mobileNumber ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter mobileNumber is missing.'})
        }
        if(isNaN(mobileNumber)){
            return res.status(400).send({code:400,message:'Invalid mobileNumber format'})
        }
        if(req.query.mobileNumber == ''){
            return res.status(400).send({code:400,message:'mobileNumber can not be empty.'})
        }


        // Generate a random OTP (here, we'll generate a 6-digit OTP)
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Insert advisor record into database
        const signup_result = await insert_signup_credentials(req.query.mobileNumber,'advisor',otp)
        if(signup_result.code == 200){
            const token = crypto.randomBytes(16).toString('hex');
            return res.json({sucess:true,otp,token})
        }else{
            return res.status(500).json({ success: false, message: 'Internal Server Error' });

        }


    }catch(e){
        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }finally{
        client.release(true)
    }
})

// So when a POST request is made to /signup with a mobileNumber, it generates a random OTP, 
// inserts a new advisor record into the database, and returns the OTP along with a token 





module.exports = router;
  