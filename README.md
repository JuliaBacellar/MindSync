#Backend - MindSync


Techs 

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

##Rotas
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
neon salva as contas
{
"email":"...",
"password":"..."
}


}


