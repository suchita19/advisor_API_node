const { Pool } = require("pg")


const advisorExists = async(advisorId)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        
        query = `SELECT * FROM users WHERE id = '${advisorId}' AND role = 'advisor'`
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

const UserExists = async(userId)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        
        query = `SELECT * FROM users WHERE id = '${userId}' AND role = 'user'`
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

const purchaseTable = async(advisorId, userId, productId, productLink)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        //create a table purchase in db
        // CREATE TABLE purchases (
        //     id SERIAL PRIMARY KEY,
        //     advisor_id INT NOT NULL,
        //     user_id INT NOT NULL,
        //     product_id INT NOT NULL,
        //     product_link VARCHAR(255) NOT NULL UNIQUE,
        //     FOREIGN KEY (advisor_id) REFERENCES users(id),
        //     FOREIGN KEY (user_id) REFERENCES users(id),
        //     FOREIGN KEY (product_id) REFERENCES products(id)
        //   );

        query = `INSERT INTO purchases (advisor_id, user_id, product_id, product_link) VALUES (${advisorId}, ${userId}, ${productId}, ${productLink})`
        const result = await client.query(query)
        return{
            code:200,
            message: 'Successfully Inserted.'
        }

    }catch(e){
        return{
            code:400,
            message:e
        }
    }finally{
        client.release(true)
    }
}
module.exports = {advisorExists,UserExists,purchaseTable}