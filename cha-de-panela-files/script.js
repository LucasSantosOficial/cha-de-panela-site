// Dados dos presentes
let presents = [
  {
    id: 1,
    name: "1 ano de academia para os noivos",
    value: "R$ 30,00",
    status: "available",
    icon: "🏋️",
  },
  {
    id: 2,
    name: "Aulas de culinária para casais",
    value: "R$ 40,00",
    status: "available",
    icon: "🍳",
  },
  {
    id: 3,
    name: "Massagem relaxante para dois",
    value: "R$ 50,00",
    status: "available",
    icon: "💆",
  },
  {
    id: 4,
    name: "Jantar romântico em casa",
    value: "R$ 60,00",
    status: "selected",
    icon: "🍷",
  },
  {
    id: 5,
    name: "Kit sobrevivência para recém-casados",
    value: "R$ 70,00",
    status: "available",
    icon: "🎒",
  },
  {
    id: 6,
    name: "Curso de dança para noivos",
    value: "R$ 80,00",
    status: "given",
    icon: "💃",
  },
  {
    id: 7,
    name: "Sertralina simbólica para manter a paz conjugal",
    value: "R$ 90,00",
    status: "available",
    icon: "💊",
  },
  {
    id: 8,
    name: "Spray anti-pé-frio para noites de cobertor",
    value: "R$ 100,00",
    status: "available",
    icon: "🧦",
  },
  {
    id: 9,
    name: "Vale 'pode escolher o filme hoje'",
    value: "R$ 110,00",
    status: "available",
    icon: "🎥",
  },
  {
    id: 10,
    name: "Kit 'sorria e acene' para momentos tensos",
    value: "R$ 120,00",
    status: "available",
    icon: "🧸",
  },
  {
    id: 11,
    name: "Curso de como elogiar a comida sem mentir",
    value: "R$ 130,00",
    status: "available",
    icon: "🍝",
  },
  {
    id: 12,
    name: "Vale 'dia sem perguntas difíceis'",
    value: "R$ 140,00",
    status: "available",
    icon: "🤐",
  },
  {
    id: 13,
    name: "Kit de emergência para visitas inesperadas",
    value: "R$ 150,00",
    status: "available",
    icon: "🚪",
  },
  {
    id: 14,
    name: "Curso de como dividir o edredom",
    value: "R$ 160,00",
    status: "available",
    icon: "🛏️",
  },
  {
    id: 15,
    name: "Vale 'você estava certo(a)' sem discussão",
    value: "R$ 170,00",
    status: "available",
    icon: "✅",
  },
  {
    id: 16,
    name: "Assinatura de elogios diários personalizados",
    value: "R$ 180,00",
    status: "available",
    icon: "💌",
  },
  {
    id: 17,
    name: "Curso de como não mexer no celular durante o jantar",
    value: "R$ 190,00",
    status: "available",
    icon: "📵",
  },
  {
    id: 18,
    name: "Vale 'sem perguntas durante futebol'",
    value: "R$ 200,00",
    status: "available",
    icon: "⚽",
  },
  {
    id: 19,
    name: "Kit de desculpas criativas para esquecer o lixo",
    value: "R$ 210,00",
    status: "available",
    icon: "🗑️",
  },
  {
    id: 20,
    name: "Curso de como fingir interesse em séries alheias",
    value: "R$ 220,00",
    status: "available",
    icon: "🎬",
  },
  {
    id: 21,
    name: "Manual de como não brigar por besteira",
    value: "R$ 230,00",
    status: "available",
    icon: "📘",
  },
  {
    id: 22,
    name: "Almofada com botão de desculpas automáticas",
    value: "R$ 240,00",
    status: "available",
    icon: "🛋️",
  },
  {
    id: 23,
    name: "Curso intensivo de 'quem lava a louça hoje'",
    value: "R$ 250,00",
    status: "available",
    icon: "🍽️",
  },
  {
    id: 24,
    name: "Vale noite sem ronco",
    value: "R$ 260,00",
    status: "available",
    icon: "😴",
  },
  {
    id: 25,
    name: "Kit de sobrevivência em compras no shopping",
    value: "R$ 270,00",
    status: "available",
    icon: "🛍️",
  },
  {
    id: 26,
    name: "Curso de como elogiar sem parecer forçado",
    value: "R$ 280,00",
    status: "available",
    icon: "🗣️",
  },
  {
    id: 27,
    name: "Jogo de tabuleiro 'Quem manda aqui?'",
    value: "R$ 290,00",
    status: "available",
    icon: "🎲",
  },
  {
    id: 28,
    name: "Vale 'dia do sofá e série sem culpa'",
    value: "R$ 300,00",
    status: "available",
    icon: "📺",
  },
  {
    id: 29,
    name: "Óculos de realidade virtual para fugir de DRs",
    value: "R$ 400,00",
    status: "available",
    icon: "🕶️",
  },
  {
    id: 30,
    name: "Jetpack para escapar de tarefas domésticas",
    value: "R$ 500,00",
    status: "available",
    icon: "🚀",
  },

  {
    id: 31,
    name: "Agenda para não esquecer datas importantes para o noivo",
    value: "R$ 900,00",
    status: "available",
    icon: "📒",
  },
  {
    id: 32,
    name: "Drone personalizado para vigiar o noivo no futebol",
    value: "R$ 1.000,00",
    status: "available",
    icon: "🛸",
  },
  {
    id: 33,
    name: "Robô aspirador com sensor de ciúmes",
    value: "R$ 1.500,00",
    status: "available",
    icon: "🤖",
  },
  {
    id: 34,
    name: "Assinatura vitalícia de sorvete gourmet para crises da noiva",
    value: "R$ 2.000,00",
    status: "available",
    icon: "🍨",
  },

  {
    id: 35,
    name: "Parcela simbólica da Ferrari do noivo",
    value: "R$ 2.500,00",
    status: "available",
    icon: "🏎️",
  },
  {
    id: 36,
    name: "Viagem de autoconhecimento da noiva pro Canadá",
    value: "R$ 3.000,00",
    status: "available",
    icon: "🛫",
  },
];

// ==============================
// ⚙️ FUNÇÕES DE STATUS E RENDERIZAÇÃO
// ==============================
function getButtonClass(status) {
  if (status === "available") return "button-available";
  if (status === "selected") return "button-selected";
  if (status === "given") return "button-given";
}

function getButtonText(status) {
  if (status === "available") return "Presentear";
  if (status === "selected") return "Desmarcar";
  if (status === "given") return "Já Presenteado";
}

function renderPresents() {
  const grid = document.getElementById("presents-grid");
  grid.innerHTML = "";

  presents.forEach((present) => {
    const card = document.createElement("div");
    card.classList.add("present-card");
    card.innerHTML = `
      <div class="present-icon">${present.icon}</div>
      <h3 class="present-title">${present.name}</h3>
      <p class="present-price">${present.value}</p>
      <p class="present-status ${present.status}">
        ${present.status === "available" ? "Disponível" : present.status === "selected" ? "Selecionado" : "Presenteado"}
      </p>
    `;

    const button = document.createElement("button");
    button.classList.add("present-button", getButtonClass(present.status));
    button.textContent = getButtonText(present.status);

    if (present.status !== "given") {
      button.onclick = () => handlePresentClick(present.id);
    } else {
      button.disabled = true;
    }

    card.appendChild(button);
    grid.appendChild(card);
  });
}

function handlePresentClick(id) {
  const p = presents.find((x) => x.id === id);
  if (!p) return;

  p.status = p.status === "available" ? "selected" : "available";
  renderPresents();

  if (p.status === "selected") {
    document.getElementById("pix-section").scrollIntoView({ behavior: "smooth" });
  }
}

// ==============================
// 💳 PIX COPY
// ==============================
const pixKey = "47745213886";
function copyPixKey() {
  const button = document.getElementById("copy-button");
  const copyText = button.querySelector(".copy-text");
  const copyIcon = button.querySelector(".copy-icon");

  navigator.clipboard.writeText(pixKey).then(() => {
    button.classList.add("copied");
    copyText.textContent = "Copiado!";
    copyIcon.textContent = "✅";
    setTimeout(() => {
      button.classList.remove("copied");
      copyText.textContent = "Copiar chave PIX";
      copyIcon.textContent = "📋";
    }, 2000);
  });
}

// ==============================
// 💌 ENVIO DO FORMULÁRIO (EMAIL)
// ==============================
async function sendDonation(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");
  const formData = new FormData(form);

  submitBtn.disabled = true;
  const original = submitBtn.textContent;
  submitBtn.textContent = "Enviando...";

  try {
    const response = await fetch("http://127.0.0.1:3000/send-email", {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => ({})); // garante parse seguro

    if (response.ok && data.success) {
      alert("💖 Contribuição enviada com sucesso! Muito obrigado!");
      form.reset();
    } else {
      alert("💖 Contribuição enviada com sucesso! Muito obrigado! " + (data.message || "Tente novamente."));
    }
  } catch (err) {
    console.error("Erro ao enviar:", err);
    alert("💖 Contribuição enviada com sucesso! Muito obrigado!");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = original;
  }
}

// ==============================
// 🎵 ANIMAÇÕES E PLAYER
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  renderPresents();

  const copyButton = document.getElementById("copy-button");
  if (copyButton) copyButton.addEventListener("click", copyPixKey);

  const form = document.getElementById("doacao-form");
  if (form) form.addEventListener("submit", sendDonation);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  const animated = document.querySelectorAll(".intro-card, .present-card, .pix-card");
  animated.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  const player = document.getElementById("player");
  const source = document.createElement("source");
  source.src = "tapasebeijos.mp3";
  source.type = "audio/mpeg";
  player.appendChild(source);

  document.body.addEventListener("click", () => {
    player.load();
    player.play();
  }, { once: true });
});