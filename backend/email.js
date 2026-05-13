const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1fc0aa3aa8f95a",
    pass: "3cceb8a3c5bde7"
  }
});

const sendRecoveryEmail = async (email, code) => {
  return await transport.sendMail({
    from: '"MyPokemon Support" <noreply@mypokemon.com>',
    to: email,
    subject: "Seu código de recuperação ✔",
    text: `Olá! Seu código de recuperação é: ${code}`,
    html: `<b>Olá!</b><br>Seu código de recuperação é: <h2>${code}</h2>`
  });
};

// Mude para esta forma de exportar:
module.exports = { sendRecoveryEmail };