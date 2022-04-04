const {Pool} = require('pg');

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"pernone",
    password:"123456789",
    port:5432,

});

module.exports = pool;
