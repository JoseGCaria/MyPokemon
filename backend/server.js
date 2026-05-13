const express = require('express');
const cors = require('cors');
// IMPORTA AQUI:
const { sendRecoveryEmail } = require('./email'); 

const app = express();
app.use(cors());
app.use(express.json());

const recoveryCodes = {}; 

app.post('/send-recovery-email', async (req, res) => {
  const { email } = req.body;
  const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();

  recoveryCodes[email] = recoveryCode;

  try {
    // USA A FUNÇÃO DO ARQUIVO EMAIL.JS:
    await sendRecoveryEmail(email, recoveryCode);
    
    console.log(`Código ${recoveryCode} enviado para ${email}`);
    res.status(200).json({ message: "E-mail enviado!" });
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
});

// 2. NOVA ROTA: PARA VALIDAR O CÓDIGO E MUDAR A SENHA
app.post('/reset-password', (req, res) => {
  const { email, code, newPassword } = req.body;

  // Verifica se o código enviado pelo usuário bate com o que salvamos
  if (recoveryCodes[email] && recoveryCodes[email] === code) {
    
    console.log(`Senha alterada com sucesso para: ${email}`);
    
    // Remove o código para ele não ser usado de novo
    delete recoveryCodes[email]; 

    return res.status(200).json({ message: "Senha alterada com sucesso!" });
  } else {
    console.log("Tentativa com código inválido");
    return res.status(400).json({ message: "Código inválido ou expirado." });
  }
});

app.get('/', (req, res) => {
  res.send('Backend MyPokemon está funcionando!');
});

app.listen(3001, () => {
  console.log('Backend rodando em http://localhost:3001');
});