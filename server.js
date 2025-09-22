const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lucas.santos.contatoempresarial@gmail.com",
    pass: "hjje bcec dgsn gtto", // senha de app, não a senha normal
  },
});

app.post("/send-email", upload.single("receipt"), async (req, res) => {
  try {
    const donorName = req.body.donorName || "Sem nome informado";

    await transporter.sendMail({
      from: '"Chá de Panela" <lucas.santos.contatoempresarial@gmail.com>',
      to: "lucas.santos.contatoempresarial@gmail.com",
      subject: "🎁 Novo presente no Chá de Panela",
      text: `O convidado ${donorName} enviou um comprovante.`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    });

    res.send("Email enviado com sucesso.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao enviar email");
  }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
