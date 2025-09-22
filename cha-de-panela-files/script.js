// Dados dos presentes
let presents = [
  { id: 1, name: "1 ano de academia grátis para os noivos", value: "R$ 50,00", status: "available", icon: "💪" },
  { id: 2, name: "Aulas de culinária para casais", value: "R$ 80,00", status: "available", icon: "👨‍🍳" },
  { id: 3, name: "Massagem relaxante para dois", value: "R$ 120,00", status: "available", icon: "💆‍♀️" },
  { id: 4, name: "Jantar romântico em casa", value: "R$ 100,00", status: "available", icon: "🕯️" },
  { id: 5, name: "Kit sobrevivência para recém-casados", value: "R$ 60,00", status: "available", icon: "🎒" },
  { id: 6, name: "Curso de dança para noivos", value: "R$ 90,00", status: "given", icon: "💃" }
];

// Chave PIX
const pixKey = "47745213886";

// Renderizar presentes
function renderPresents() {
  const grid = document.getElementById("presents-grid");
  grid.innerHTML = "";

  presents.forEach((p) => {
    const card = document.createElement("div");
    card.className = "present-card";

    card.innerHTML = `
      <div class="present-icon">${p.icon}</div>
      <h3 class="present-name">${p.name}</h3>
      <div class="present-value">${p.value}</div>
      <div class="present-status ${
        p.status === "available" ? "status-available" : p.status === "selected" ? "status-selected" : "status-given"
      }">
        ${p.status === "available" ? "Disponível" : p.status === "selected" ? "Selecionado" : "Presenteado"}
      </div>
    `;

    const button = document.createElement("button");
    button.classList.add("present-button");

    if (p.status === "available") {
      button.textContent = "Presentear";
      button.classList.add("button-available");
      button.onclick = () => handlePresentClick(p.id);
    } else if (p.status === "selected") {
      button.textContent = "Desmarcar";
      button.classList.add("button-selected");
      button.onclick = () => handlePresentClick(p.id);
    } else {
      button.textContent = "Já Presenteado";
      button.classList.add("button-given");
      button.disabled = true;
    }

    card.appendChild(button);
    grid.appendChild(card);
  });
}

// Toggle do presente
function handlePresentClick(id) {
  const i = presents.findIndex(p => p.id === id);
  if (i !== -1) {
    if (presents[i].status === "available") {
      presents[i].status = "selected";
      document.getElementById("pix-section").scrollIntoView({ behavior: "smooth" });
    } else if (presents[i].status === "selected") {
      presents[i].status = "available";
    }
    renderPresents();
  }
}

// Copiar chave PIX
function copyPixKey() {
  const btn = document.getElementById("copy-button");
  const text = btn.querySelector(".copy-text");
  const icon = btn.querySelector(".copy-icon");
  navigator.clipboard.writeText(pixKey).then(() => {
    btn.classList.add("copied");
    text.textContent = "Copiado!";
    icon.textContent = "✅";
    setTimeout(() => {
      btn.classList.remove("copied");
      text.textContent = "Copiar chave PIX";
      icon.textContent = "📋";
    }, 2000);
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  renderPresents();

  document.getElementById("copy-button").addEventListener("click", copyPixKey);

  // Upload + Nome → Enviar e-mail
  const form = document.getElementById("receipt-form");
  const statusDiv = document.getElementById("upload-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const donorName = document.getElementById("donor-name").value.trim();
      const file = document.getElementById("receipt-upload").files[0];

      if (!donorName || !file) {
        statusDiv.textContent = "⚠️ Preencha seu nome e selecione um arquivo.";
        return;
      }

      const formData = new FormData();
      formData.append("donorName", donorName);
      formData.append("receipt", file);

      try {
        const res = await fetch("http://localhost:3000/send-email", {
          method: "POST",
          body: formData
        });

        if (res.ok) {
          statusDiv.textContent = "✅ Comprovante enviado com sucesso!";
          document.getElementById("receipt-upload").value = "";
          document.getElementById("donor-name").value = "";

          // Marca presente como Presenteado
          const lastSelected = presents.find(p => p.status === "selected");
          if (lastSelected) {
            lastSelected.status = "given";
            renderPresents();
          }
        } else {
          statusDiv.textContent = "❌ Erro ao enviar comprovante.";
        }
      } catch (err) {
        console.error(err);
        statusDiv.textContent = "⚠️ Falha de conexão com o servidor.";
      }
    });
  }
});
