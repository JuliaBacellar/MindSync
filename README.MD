Techs 

Node.js + Express (estrutura MVC)
Prisma ORM + PostgreSQL(Neon.Tech)
Autenticação por senha + OTP por email


Funcionalidades

Autenticação

Cadastro --> Armazena e-mail + senha (hash)
Login --> Confere senha -> gera OTP -> envia OTP
Verificação de OTP --> Confere código e tempo -> Acesso concedido
implementação de cadastro de usuario com criptografia da senha usando bycrypt


Comandos

npm install express cors dotenv prisma @prisma/client bcrypt nodemailer

npm install -D nodemon

mudança no schema prisma e a estrutura do BD: 
npx prisma migrate dev --name descricao

alterei schema sem mexer no BD : npx prisma generate


estrutura arquivo env :

DATABASE_URL = postgresql://"...."require
EMAIL_USER= "user"@gmail.com
EMAIL_PASS = "senhadoapp" 

rodar a aplicação ! = npm run dev

npm install @prisma/client prisma"# PORRAFUNCIONA" 
#   P O R R A F U N C I O N A  
 