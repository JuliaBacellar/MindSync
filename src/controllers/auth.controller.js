//lógica de controle
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../config/jwt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = generateToken({ userId: user.id });
  res.json({ token });
};
