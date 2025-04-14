// npx prisma db pull
// depois de conectado:
// npx prisma migrate dev --name init

// ✅ Checklist antes de testar
// Você rodou as migrações do Prisma?
// Se ainda não, rode isso no terminal pra criar a tabela User no seu banco MySQL:

// bash
// Copiar código
// npx prisma migrate dev --name init
// Verificou se o banco MySQL está rodando e a URL do .env tá certinha?

// Exemplo de URL .env:

// env
// Copiar código
// DATABASE_URL="mysql://root:minhasenha@localhost:3306/meubanco"
// 👤 Cadastrar um usuário manualmente (por enquanto)
// Já que só criamos a rota de login por enquanto, vamos inserir um usuário direto no banco pra poder testar o login.

// Opção 1: via Prisma Studio (interface visual)

// bash
// Copiar código
// npx prisma studio
// Acesse localhost:5555, vá na tabela User e clique em “Add Record” pra adicionar algo assim:

// email: teste@teste.com

// password: (criptografado, então vamos fazer isso no terminal)

// Abre um terminal Node pra gerar a senha hash:

// bash
// Copiar código
// node
// > const bcrypt = require('bcryptjs');
// > bcrypt.hashSync('123456', 10)
// // copie o hash e cole no campo password no Studio
// 🚀 Rodar o servidor e testar o login
// Inicia o servidor:

// bash
// Copiar código
// node server.js
// Teste no Postman, Insomnia ou via curl:

// POST http://localhost:3000/auth/login

// Body (JSON):

// json
// Copiar código
// {
//   "email": "teste@teste.com",
//   "password": "123456"
// }
// Se tudo der certo, você vai receber isso:

// json
// Copiar código
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
// }
// 🔐 (Extra) Testar se o middleware protege uma rota
// Se quiser garantir que o auth.middleware.js funciona, cria rapidinho uma rota protegida pra testar:

// routes/user.routes.js
// js
// Copiar código
// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/auth.middleware');

// router.get('/me', auth, (req, res) => {
//   res.json({ message: 'Acesso autorizado!', user: req.user });
// });

// module.exports = router;
// E no app.js:
// js
// Copiar código
// const userRoutes = require('./routes/user.routes');
// app.use('/user', userRoutes);
// Agora, testa assim no Postman:

// GET http://localhost:3000/user/me

// Header:
// Authorization: Bearer SEU_TOKEN_AQUI

// E se tudo estiver certo, vai retornar algo tipo:

// json
// Copiar código
// {
//   "message": "Acesso autorizado!",
//   "user": {
//     "userId": 1,
//     "iat": ...,
//     "exp": ...
//   }
// }
