const express = require("express")
const {advisorExists,UserExists,purchaseTable} = require('../models/purchaseProductModel')
const router = new express.Router()

router.post('/purchase-product', async(req,res)=>{
    // Now, an advisor can purchase products for their users by sending a POST request to /purchase-product with the required 
    // parameters (advisorId, userId, and productId). The API will generate a unique product link and record the purchase in the purchases table, 
    // then respond with the generated productLink.
    try{


        if(!Object.keys(req.query).includes('advisorId  ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter advisorId is missing.'})
        }
        if(!Object.keys(req.query).includes('userId  ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter userId is missing.'})
        }
        if(!Object.keys(req.query).includes('productId    ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter productId  is missing.'})
        }


        if(req.query.advisorId == ""){
            return res.status(400).send({code:400,message:'advisorId can not be empty.'})
        }
        if(req.query.userId == ""){
            return res.status(400).send({code:400,message:'userId can not be empty.'})
        }
        if(req.query.productId   == ""){
            return res.status(400).send({code:400,message:'productId  can not be empty.'})
        }
        //check if advisor ,user exist or not
        const advisorResult = await advisorExists(req.query.advisorId.trim())
        const userResult  = await UserExists(req.query.userId.trim())


        if (advisorResult.rows.length === 0 || userResult.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid advisor or user ID' });
        }

        // Generate a unique product link (For simplicity, we'll use a random string)
        const productLink = crypto.randomBytes(16).toString('hex');

        //// Record the purchase in the purchases table
        await purchaseTable(req.query.advisorId.trim(),req.query.userId.trim(),req.query.productId.trim(),productLink)
        res.json({ success: true, productLink });


    }catch(e){
        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }
})



module.exports = router