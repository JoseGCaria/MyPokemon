const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO MAILTRAP (Dados do seu print)
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "19a80c969a7c26", // Seu Username da imagem
    pass: "740da4232cc4b6"  // LEMBRE-SE: Use a senha real (clique em "Show" no Mailtrap)
  }
});

app.post('/send-recovery-email', (req, res) => {
  const { email } = req.body;
  const recoveryCode = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: '"MyPokemon Support" <no-reply@mypokemon.com>',
    to: email,
    subject: 'Código de Recuperação de Senha',
    text: `Seu código de recuperação é: ${recoveryCode}`,
    html: `<b>Seu código de recuperação é: ${recoveryCode}</b>`
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("❌ Erro ao enviar:", error);
      return res.status(500).json({ error: error.message });
    }
    console.log("✅ E-mail enviado para o Mailtrap!");
    res.status(200).json({ message: "E-mail enviado!", code: recoveryCode });
  });
});

app.listen(3001, () => {
  console.log('🚀 Backend de e-mail rodando na porta 3001');
});