const dotenv = require("dotenv");
const { Pool } = require("pg");
  
dotenv.config();
const { HOST, DEV_DB, USER, PASSWORD } = process.env;
 
const Database = new Pool({
  host: HOST,
  database: DEV_DB,
  user: USER,
  password: PASSWORD,
});

module.exports = Database;
