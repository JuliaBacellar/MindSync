//Pool gerencia conexões com PostgreSQL

const { Pool } = require('pg'); //importa pool de conexões 
require('dotenv').config();

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,// neon precisa disso
    },
});

module.exports = pool; //exporta para outros arquivos usarem