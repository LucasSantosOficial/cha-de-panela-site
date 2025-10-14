import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

// ======================
// 🔐 CONFIGURAÇÃO CORS
// ======================
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500", // seu ambiente local
      "https://lucassantosoficial.github.io", // seu GitHub Pages
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// 📂 UPLOAD DE COMPROVANTE
// ======================
const upload = multer({ dest: "uploads/" });

// ======================
// 💌 ROTA PARA ENVIO DE E-MAIL
// ======================
app.post("/send-email", upload.single("comprovante"), async (req, res) => {
  try {
    const { nome, email, mensagem, giftId, giftName } = req.body;
    const file = req.file;
    const filePath = file ? path.resolve(file.path) : null;

    // ======================
    // ✉️ CONFIGURAÇÃO SMTP (GMAIL)
    // ======================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // seu email (configurado na Vercel)
        pass: process.env.EMAIL_PASS, // senha de app do Gmail
      },
    });

    // ======================
    // 📨 CONTEÚDO DO E-MAIL
    // ======================
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "lucas.santos.contatoempresarial@gmail.com", // altere se quiser outro destino
      subject: `🎁 Novo presente recebido - ${giftName || "Sem título"}`,
      text: `
        💌 Novo envio pelo site do Chá de Panela!
        -----------------------------
        Nome: ${nome || "Não informado"}
        Email: ${email || "Não informado"}
        Mensagem: ${mensagem || "Sem mensagem"}
        Presente: ${giftName || "Não informado"} (ID: ${giftId || "?"})
        -----------------------------
      `,
      attachments: filePath
        ? [
            {
              filename: file.originalname,
              path: filePath,
            },
          ]
        : [],
    };

    // ======================
    // 🚀 ENVIO DO E-MAIL
    // ======================
    await transporter.sendMail(mailOptions);

    // apaga arquivo temporário
    if (filePath) fs.unlinkSync(filePath);

    res.json({ success: true, message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message:
        "Erro ao enviar o e-mail. Verifique as credenciais e tente novamente.",
    });
  }
});

// ======================
// 🌐 ROTA DE TESTE
// ======================
app.get("/", (req, res) => {
  res.send("Servidor do Chá de Panela está online 💌");
});

// ======================
// 🚀 EXPORT PARA VERCEL
// ======================
export default app;
