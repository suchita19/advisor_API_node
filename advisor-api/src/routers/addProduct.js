const express = require("express")
const {checkCategoryExists,createNewCategory,checkProductRecord} = require('../models/productDetails')
const router = new express.Router()

router.post('/add-product', async(req,res)=>{
    // Now, an admin can add products by sending a POST request to /add-product with the required 
    // parameters (productName, productDescription, and productCategory). The API will create a category if it doesn't exist, 
    // create the product, and respond with the id, name, and category of the added product. 
    try{


        if(!Object.keys(req.query).includes('productName  ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter productName is missing.'})
        }
        if(!Object.keys(req.query).includes('productDescription  ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter productDescription is missing.'})
        }
        if(!Object.keys(req.query).includes('productCategory   ')){
            return res.status(400).send({code:400,message:'Bad request. Mandatory parameter productCategory is missing.'})
        }


        if(req.query.productName == ""){
            return res.status(400).send({code:400,message:'productName can not be empty.'})
        }
        if(req.query.productDescription == ""){
            return res.status(400).send({code:400,message:'productDescription can not be empty.'})
        }
        if(req.query.productCategory  == ""){
            return res.status(400).send({code:400,message:'productCategory can not be empty.'})
        }
        
        //check if category exists
        const categoryResult = await checkCategoryExists(req.query.productCategory.trim())
        let categoryId;

        if (categoryResult.rows.length === 0) {
            // Create a new category if it doesn't exist
            const categoryInsertResult = await createNewCategory(req.query.productCategory.trim())
            categoryId = categoryInsertResult.rows[0].id;
          } else {
            categoryId = categoryResult.rows[0].id;
          }
      
        // insert product records in the db
        const productResult  = await checkProductRecord(req.query.productName.trim(),req.query.productDescription.trim(),req.query.productCategory.trim())
        const productId = productResult.rows[0].id;
        return  res.json({ success: true, id: productId, name: req.query.productName, category: req.query.productCategory});


        
      

    }catch(e){
        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }
})

module.exports = router