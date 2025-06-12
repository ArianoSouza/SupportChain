import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const connection = knex({
  client: 'pg',
  // Use a DATABASE_URL fornecida pelo Render e adicione '?sslmode=require'
  // Certifique-se de que process.env.DATABASE_URL esteja configurada no Render!
  connection: process.env.DB_URL,
  pool: { min: 2, max: 10 }
});

export default connection;

