// controllers/authController.js
const pool = require('../models/db'); // conexão com banco
const bcrypt = require('bcrypt'); // Criptografa senha
const { sendOTPEmail } = require('../services/emailService'); // Envia email com código OTP

function gerarOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Cria número aleatório de 6 dígitos
}

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se já existe usuário
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]); // Verifica se e-mail já existe
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Gera OTP e calcula validade
    const otp = gerarOTP();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000); // +10 min

    // Insere usuário no banco
    await pool.query(
      'INSERT INTO users (email, password, otp, otp_expiry) VALUES ($1, $2, $3, $4)',
      [email, hashedPassword, otp, otp_expiry]
    );

    // Envia OTP por e-mail
    await sendOTPEmail(email, otp);

    res.status(201).json({ message: 'Usuário registrado. Verifique seu e-mail com o código OTP.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const emailClean = email.trim().toLowerCase();

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [emailClean]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: 'Usuário já verificado' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Código OTP incorreto' });
    }

    const now = new Date();
    const expiry = new Date(user.otp_expiry);
    if (now > expiry) {
      return res.status(400).json({ message: 'Código OTP expirado' });
    }

    await pool.query('UPDATE users SET is_verified = TRUE WHERE email = $1', [emailClean]);
    return res.status(200).json({ message: 'Usuário verificado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao verificar OTP' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (!user.is_verified) {
      return res.status(401).json({ message: 'Usuário ainda não verificou o e-mail' });
    }

    const senhaConfere = await bcrypt.compare(password, user.password);
    if (!senhaConfere) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso', user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no login' });
  }
};
