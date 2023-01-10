import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const {Pool} = pkg;

export const connectionDb = new Pool({
    connectionString: process.env.BASE_URL
})