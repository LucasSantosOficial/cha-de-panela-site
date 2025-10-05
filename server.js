const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lucas.santos.contatoempresarial@gmail.com",
    pass: "xvar ikha mtyo rkne", // senha de app gerada no Gmail
  },
});

// 📎 Rota para envio de comprovante com arquivo
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

    res.send("Email com comprovante enviado com sucesso.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao enviar email com comprovante");
  }
});

// 🎁 Rota para envio de presentes por e-mail
app.post("/send-presents", async (req, res) => {
  try {
    const donorName = req.body.donorName || "Convidado Anônimo";
    const presents = req.body.presents || [];

    const htmlContent = presents
      .map(
        (p) => `
      <p><strong>${p.name}</strong> - ${p.value} (${p.status}) ${p.icon}</p>
    `
      )
      .join("");

    await transporter.sendMail({
      from: '"Chá de Panela" <lucas.santos.contatoempresarial@gmail.com>',
      to: "pokeshortsoficial@gmail.com",
      subject: `🎁 Nova contribuição de ${donorName}`,
      html: `
  <h2 style="color:#d63384;">Contribuições recebidas:</h2>
  <ul style="font-family:sans-serif;">
    ${presents
      .map(
        (p) =>
          `<li>${p.icon} <strong>${p.name}</strong> — ${p.value} (${p.status})</li>`
      )
      .join("")}
  </ul>
`,
    });

    res.send("Contribuição enviada por e-mail com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao enviar contribuição por e-mail");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
