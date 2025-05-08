import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const connection = knex ({
    client: 'mysql2',
    connection:{
      host: '127.0.0.1',
      user: 'root',
      password: 'M@thias1098',
      database: 'SupportChain',
      multipleStatements: true
      }
      
})

export default connection;