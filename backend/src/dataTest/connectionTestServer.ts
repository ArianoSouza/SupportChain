import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const testDbConnection = knex ({
  client: 'pg', // Alterado para 'pg' para PostgreSQL
  connection: {
    host: process.env.TEST_DB_HOST , // Usando variáveis de ambiente LOCAL
    port:Number(process.env.TEST_DB_PORT) , // Usando variáveis de ambiente LOCAL
    user: process.env.TEST_DB_USER, // Usando variáveis de ambiente do LOCAL
    password: process.env.TEST_DB_PASSWORD, // Usando variáveis de ambiente do LOCAL
    database: process.env.TEST_DB_NAME, // Usando variáveis de ambiente do LOCAL
  },
  pool: { min: 2, max: 10 }
})

export default testDbConnection;


