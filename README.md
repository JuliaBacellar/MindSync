#Backend - MindSync


## Techs 

Node.js + Express (estrutura MVC)
PostgreSQL(Neon.Tech)
Autenticação por senha + OTP por email


## Funcionalidades
- Registro de usuario com senha criptografada
- Envio de código OTP por e-mail
- Estrutura MV
- Banco de dados PostgreSQL
- Conexão via lib 'pg'
- Marca o usuario como verificado no banco
- Só deixa logar se o usuario estiver verificado
- Implementa a senha criptografada com bcrypt


## POST /api/auth/register
Registra um novo usuário

email:
senha:

Como rodar o projeto 

git clone ...
cd Back-end
npm install
node server.js

http://localhost:3000/api/auth/register
http://localhost:3000/auth/login
http://localhost:3000/auth/verify-otp
neon salva as contas
{
"email":"...",
"password":"..."
}

{
"email":"...",
"otp":"..."
}
editar arquivo .env
requisição post


-----
reações -
 user clica em um emojie envia uma requisição post /emotion com o {
    'user_id':1,
    'emotion_type': 'feliz'
 }

 salva no bd a emoção do dia 

 quando o user abre o gráfico o front faz uma requisição GET para o back  na rota /emotion

 o back responde com o tipo de emoção e o total  de vezes
 