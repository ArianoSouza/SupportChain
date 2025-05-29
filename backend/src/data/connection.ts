import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const connection = knex ({
  client: 'pg', // Alterado para 'pg' para PostgreSQL
  connection: {
    host: process.env.DB_HOST , // Usando variáveis de ambiente do Render
    port:Number(process.env.DB_PORT) , // Usando variáveis de ambiente do Render
    user: process.env.DB_USER, // Usando variáveis de ambiente do Render
    password: process.env.DB_PASSWORD, // Usando variáveis de ambiente do Render
    database: process.env.DB_NAME, // Usando variáveis de ambiente do Render
    ssl: { rejectUnauthorized: false } // PostgreSQL na Render requer SSL
  },
  pool: { min: 2, max: 10 }
})

export default connection;

