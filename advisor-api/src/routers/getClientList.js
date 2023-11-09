const express = require("express")
const {clientList,userSignup} = require('../models/signup_model')
const router = new express.Router()



router.get('/clients/:advisorId', async(req,res)=>{
    // Now, an advisor can view a list of all clients by sending a GET request to /clients/:advisorId where 
// :advisorId is the ID of the advisor. The API will retrieve and return a list of clients mapped to that advisor. 
// Each client will have an id, clientName, clientMobile, role, and advisorId.
    try{
        if(!Object.keys(req.query).includes('advisorId  ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter advisorId  is missing.'})
        }

        const result = await clientList(req.query.advisorId,'user')
        const clients = result.rows.map(row => ({
            id: row.id,
            clientName: row.client_name,
            clientMobile: row.mobile_number,
            role: row.role,
            advisorId: row.advisor_id,
          }));
          res.json({ success: true, clients });
      

    }catch(e){
        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }
})

router.post('/user-signup', async (req, res) => {
  
    try {
        if(!Object.keys(req.query).includes('userName  ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter userName  is missing.'})
        }
        if(!Object.keys(req.query).includes('userMobile  ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter userMobile  is missing.'})
        }
        if(req.query.userName == ""){
            return res.status(400).send({code:400,message:'userName can not be empty.'})
        }
        if(req.query.userMobile == ""){
            return res.status(400).send({code:400,message:'userMobile can not be empty.'})
        }
      // Generate a random OTP 
      const otp = Math.floor(100000 + Math.random() * 900000);
  
      // Insert user record into database
      const result = await userSignup(req.query.userMobile,'user', req.query.userName.trim(), otp)
  
      res.json({ success: true, otp });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  
  
  
  
  








module.exports = router