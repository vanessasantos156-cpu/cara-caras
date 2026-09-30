import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.cara&caras,
    password: process.env.senai,
    port: process.env.DB_PORT
});

export default pool;