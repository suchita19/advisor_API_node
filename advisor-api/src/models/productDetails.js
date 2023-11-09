const { Pool } = require("pg")


const checkCategoryExists = async(productCategory)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        
        query = `SELECT * FROM categories WHERE name = ${productCategory}`
        const result = await client.query(query)
        return result

    }catch(e){
        return{
            code:400,
            message:e
        }
    }finally{
        client.release(true)
    }
}

const createNewCategory = async(productCategory)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        // we'll create a table categories 

        // CREATE TABLE categories (
        //     id SERIAL PRIMARY KEY,
        //     name VARCHAR(255) NOT NULL UNIQUE
        //   );
          
        
        query = `INSERT INTO categories (name) VALUES (${productCategory}) RETURNING id`
        const result = await client.query(query)
        return result

    }catch(e){
        return{
            code:400,
            message:e
        }
    }finally{
        client.release(true)
    }
}

const checkProductRecord = async(productName, productDescription, categoryId)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        
        query = `INSERT INTO products (name, description, category_id) VALUES (${productName}, ${productDescription}, ${categoryId}) RETURNING id`
        const result = await client.query(query)
        return result

    }catch(e){
        return{
            code:400,
            message:e
        }
    }finally{
        client.release(true)
    }
}

module.exports = {checkCategoryExists,createNewCategory,checkProductRecord}