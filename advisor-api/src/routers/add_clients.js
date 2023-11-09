const express = require("express")
const {add_client_credentials} = require('../models/signup_model')
const router = new express.Router()




router.post('/add-client',async(req,res)=>{
    try{
        if(!Object.keys(req.query).includes('clientName')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter clientName is required.'})
        }
        if(!Object.keys(req.query).includes('clientMobile')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter clientMobile is required.'})
        }
        if(req.query.clientName == ""){
            return res.status(400).send({code:400,message:'clientName can not be empty.'})
        }
        if(req.query.clientMobile == ""){
            return res.status(400).send({code:400,message:'clientMobile can not be empty.'})
        }


        const result = await add_client_credentials(req.query.clientMobile.trim(),'user',req.query.clientName.trim())
        const addedUser = {
            id: result.rows[0].id,
            clientName,
            clientMobile,
            role: 'user',
          };
        return res.json({success:true,user:addedUser})
    }catch(e){
        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }
})

module.exports = router