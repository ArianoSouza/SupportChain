import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const connection = knex ({
    client: 'mysql2',
    connection:{
      host: '127.0.0.1',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'SupportChain',
      multipleStatements: true
      }
      
})

export default connection;