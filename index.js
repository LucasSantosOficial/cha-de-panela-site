const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fetch = require("node-fetch");
const FormData = require("form-data");

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

app.post("/proxy", upload.any(), async (req, res) => {
  const formData = new FormData();

  for (const key in req.body) {
    formData.append(key, req.body[key]);
  }

  req.files.forEach((file) => {
    formData.append(file.fieldname, file.buffer, file.originalname);
  });

  try {
    const response = await fetch(
      "https://onimusha123.app.n8n.cloud/webhook/comprovante",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.text();
    res.status(200).send(result);
  } catch (err) {
    console.error("Erro ao enviar para n8n:", err);
    res.status(500).send("Erro ao enviar para n8n");
  }
});

app.listen(3001, () => console.log("🚀 Proxy rodando na porta 3001"));
