// ===============================
// 📦 DEPENDÊNCIAS
// ===============================
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// ===============================
// 🚀 CONFIGURAÇÕES BÁSICAS
// ===============================
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração CORS completa (garante resposta ao navegador)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve html/css/js

// ===============================
// 📎 CONFIGURAÇÃO DO MULTER (upload)
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf", "image/jpg"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Apenas imagens (JPG/PNG) ou PDF são permitidos."));
  },
});

// ===============================
// 💌 CONFIGURAÇÃO DO GMAIL (senha de app!)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lucas.santos.contatoempresarial@gmail.com",
    pass: "elgqupdpugtjhaet", // senha de aplicativo
  },
});

app.post("/send-email", upload.single("receipt"), async (req, res) => {
  try {
    console.log("📩 Requisição recebida:", req.body);

    const { donorName, email, phone } = req.body;
    const file = req.file;

    if (!donorName || !email || !file) {
      return res.status(400).json({
        success: false,
        message: "Por favor, preencha todos os campos e envie o comprovante.",
      });
    }

    const htmlBody = `
      <h2 style="color:#d63384;">🎁 Nova Contribuição Recebida!</h2>
      <p><strong>Nome:</strong> ${donorName}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone || "—"}</p>
      <p>📎 O comprovante está anexado a este e-mail.</p>
    `;

    // Envio do e-mail
    await transporter.sendMail({
      from: '"Chá de Panela 💕" <lucas.santos.contatoempresarial@gmail.com>',
      to: "lucas.santos.contatoempresarial@gmail.com",
      replyTo: email,
      subject: `🎁 Nova contribuição de ${donorName}`,
      html: htmlBody,
      attachments: [
        {
          filename: file.originalname,
          path: file.path,
        },
      ],
    });

    console.log(`💗 Contribuição recebida de ${donorName}`);

    // ✅ Resposta imediata de sucesso
    res.status(200).json({
      success: true,
      message: "E-mail enviado com sucesso!",
    });

    // ✅ Após responder, faz limpeza assíncrona sem travar o retorno
    setTimeout(() => {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    }, 30000);
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Erro ao enviar e-mail.",
        error: err.message,
      });
    }
  }
});
// ===============================
// 🌐 ROTA PADRÃO (opcional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ===============================
// 🚀 INICIA O SERVIDOR
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});
