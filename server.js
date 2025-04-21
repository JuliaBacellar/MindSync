const express = require('express'); //framework do servidor
const cors = require('cors'); 
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes'); //importa as rotas de autenticação

dotenv.config(); //carrega as variaveis .env


const app = express(); //cria o app express
app.use(cors()); //libera o acesso a requisições
app.use(express.json()); //leitura json

app.use('/auth', authRoutes); //todas as rotas de auth começam com api/auth

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});
