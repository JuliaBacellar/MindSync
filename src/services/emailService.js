//enviar o otp pro email do usuario

const nodemailer = require ('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });
  
  async function sendOTPEmail(to, otp) {
    const mailOptions = {
      from: `Plataforma de Apoio <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Seu código de verificação',
      html: `<p>Seu código OTP é: <strong>${otp}</strong></p><p>Ele expira em 10 minutos.</p>`,
    };
  
    await transporter.sendMail(mailOptions);
  }
  
  module.exports = { sendOTPEmail };