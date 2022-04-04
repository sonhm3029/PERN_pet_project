const Pool = require("pg").Pool;
require("dotenv").config();

console.log(process.env.DBUSER,
    process.env.DBPASSWORD)

const pool = new Pool({
    user: process.env.DBUSER,
    password:process.env.DBPASSWORD,
    host:"localhost",
    port:5432,
    database:"mydb",
})

module.exports = pool;
