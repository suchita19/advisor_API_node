const { Pool } = require("pg")



const insert_signup_credentials = async(mobile_number, role, otp)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        // create a user table in db 
        // CREATE TABLE users (
        //     id SERIAL PRIMARY KEY,
        //     mobile_number VARCHAR(15) NOT NULL,
        //     role VARCHAR(20) NOT NULL,
        //     otp INT NOT NULL
        //   );


        query = `INSERT INTO users (mobile_number, role, otp) VALUES (${mobile_number},${role},${otp})`
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


const add_client_credentials = async(clientMobile, role, clientName)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        // Update the db table schema to include a new column for client_name
        // ALTER TABLE users ADD COLUMN client_name VARCHAR(255);



        query = `INSERT INTO users (mobile_number, role, client_name) VALUES (${clientMobile}, ${role},${clientName}) RETURNING id`
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

const clientList = async(advisorId,role)=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        query = `SELECT * FROM users WHERE advisor_id = ${advisorId} AND role = ${role}`
        const result = await client.query(query)
        return result

    }catch(e){

    }finally{
        client.release(true)
    }
}

const userSignup = async(userMobile,role,userName,otp )=>{
    const pool = new Pool(schema)
    const client = await pool.connect();
    let query = ''
    try{
        query = `INSERT INTO users (mobile_number, role, client_name, otp) VALUES (${userMobile}, ${role}, ${userName}, ${otp}) RETURNING id`
        await client.query(query)
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
module.exports = {insert_signup_credentials,add_client_credentials,clientList,userSignup}