const express = require('express'); //framework do servidor
const cors = require('cors'); 
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes'); //importa as rotas de autenticação
const diaryRoutes = require('./src/routes/diaryRoutes'); // rota diario


dotenv.config(); //carrega as variaveis .env

const psychologistRoutes = require('./src/routes/psychologistRoutes');
const app = express(); //cria o app express
app.use(cors()); //libera o acesso a requisições
app.use(express.json()); //leitura json

app.use('/auth', authRoutes); //todas as rotas de auth começam com /auth
app.use('/diary', diaryRoutes);  //todas as rotas do diário começam com diário
app.use('/psychologists', psychologistRoutes);
// app.use('/emotion', emotionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});


//swagger
const { swaggerUi, swaggerSpec } = require('./src/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
