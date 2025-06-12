import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

console.log("--- DEBUG START ---");
console.log("process.env.DB_URL (no código):", process.env.DB_URL);
console.log("--- DEBUG END ---");

const connection = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DB_URL, // Use connectionString para a URL completa
    ssl: false // <--- ADICIONE ESTA LINHA PARA DESABILITAR SSL EXPLICITAMENTE
  },
  pool: { min: 2, max: 10 }
});

export default connection;

