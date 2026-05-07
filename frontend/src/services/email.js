const nodemailer = require('nodemailer');

// Configuração do "transportador" (SMTP)
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // Dados que o Mailtrap te fornece
  port: 2525,
  auth: {
    user: "seu_usuario_do_mailtrap",
    pass: "sua_senha_do_mailtrap"
  }
});

// Função que será chamada na sua rota de "Esqueci Senha"
export async function sendRecoveryEmail(email, code) {
  const info = await transport.sendMail({
    from: '"MyPokemon Support" <noreply@mypokemon.com>',
    to: email,
    subject: "Seu código de recuperação ✔",
    text: `Olá! Seu código de recuperação é: ${code}`,
    html: `<b>Olá!</b><br>Seu código de recuperação é: <h2>${code}</h2>`
  });

  return info;
}