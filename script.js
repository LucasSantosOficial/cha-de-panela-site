async function buscarDados() {
  try {
    const response = await fetch(
      "https://webhooks.coraxy.com.br/webhook/estoque"
    );
    if (!response.ok) {
      throw new Error("Deu erro!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha na requisição:", error);
  }
}

let presents;

// ⚙️ FUNÇÕES DE STATUS E RENDERIZAÇÃO

function getButtonClass(valorEmEstoque) {
  if (valorEmEstoque > 0) return "button-available";
  if (valorEmEstoque === 0) return "button-given";
}

function getButtonText(valorEmEstoque) {
  if (valorEmEstoque > 0) return "Presentear";
  if (valorEmEstoque === 0) return "Já Presenteado";
}

function renderPresents() {
  const grid = document.getElementById("presents-grid");
  grid.innerHTML = "";

  presents.forEach((present) => {
    const card = document.createElement("div");
    card.classList.add("present-card");
    const isGiven = present.estoque === 0; // Agora é true se acabou o estoque
    const button = document.createElement("button");

    if (isGiven) {
      button.disabled = true;
    } else {
      button.onclick = () => handlePresentClick(present.id);
    }

    const statusClass = present.status;
    const statusText = isGiven
      ? "Presenteado"
      : present.status === "selected"
      ? "Selecionado"
      : "Disponível";
    button.classList.add(
      "present-button",
      isGiven
        ? "button-given"
        : present.status === "selected"
        ? "button-selected"
        : "button-available"
    );
    button.textContent = isGiven
      ? "Já Presenteado"
      : present.status === "selected"
      ? "Selecionado"
      : "Presentear";

    card.innerHTML = `
      <div class="present-icon">${present.icon ?? ""}</div>
      <h3 class="present-title">${present.name ?? "Sem nome"}</h3>
      <p class="present-price">${present.value ?? ""}</p>
      <p class="present-status status-${statusClass}">${statusText}</p>
    `;

    card.appendChild(button);
    grid.appendChild(card);
  });
}

function handlePresentClick(id) {
  const p = presents.find((x) => x.id === id);
  if (!p) return;
  p.status = "selected";
  renderPresents();
  if (p.status === "selected") {
    document
      .getElementById("pix-section")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// 💳 PIX COPY

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

// 💌 ENVIO DO FORMULÁRIO (EMAIL)

async function sendDonation(e) {
  e.preventDefault();
  if (!selectedGift) {
    alert("Por favor, selecione um presente antes de enviar.");
    return;
  }

  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");
  const formData = new FormData(form);
  formData.append("giftId", selectedGift.id);
  formData.append("giftName", selectedGift.name);

  submitBtn.disabled = true;
  const original = submitBtn.textContent;
  submitBtn.textContent = "Enviando...";

  try {
    // 🔹 Envia o comprovante e dados da doação
    const response = await fetch(
      "https://webhooks.coraxy.com.br/webhook/comprovante",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      alert("💖 Contribuição enviada com sucesso! Muito obrigado!");
      // 🛍️ Marca o presente como "Presenteado" visualmente
      selectedGift.status = "given";
      renderPresents();
      selectedGift = null;

      // 🔄 Limpa o formulário
      form.reset();
    } else {
      alert("⚠️ Ocorreu um erro ao enviar. Tente novamente em alguns minutos.");
    }
  } catch (err) {
    console.error("Erro ao enviar:", err);
    alert("❌ Erro ao enviar. Verifique sua conexão e tente novamente.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = original;
  }
}

// 🎵 ANIMAÇÕES E PLAYER

document.addEventListener("DOMContentLoaded", async () => {
  presents = await buscarDados();

  renderPresents();

  const copyButton = document.getElementById("copy-button");
  if (copyButton) copyButton.addEventListener("click", copyPixKey);

  const form = document.getElementById("doacao-form");
  if (form) form.addEventListener("submit", sendDonation);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  const animated = document.querySelectorAll(
    ".intro-card, .present-card, .pix-card"
  );
  animated.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Player de música
  const player = document.getElementById("player");
  const source = document.createElement("source");
  source.src = "tapasebeijos.mp3";
  source.type = "audio/mpeg";
  player.appendChild(source);

  document.body.addEventListener(
    "click",
    () => {
      player.load();
      player.play();
    },
    { once: true }
  );
});

let selectedGift = null;

function handlePresentClick(id) {
  const p = presents.find((x) => x.id === id);
  if (!p) return;

  // Alterna o status
  if (p.status === "available") {
    if (selectedGift) selectedGift.status = "available"; // desmarca o anterior
    p.status = "selected";
    selectedGift = p;
    document
      .getElementById("pix-section")
      .scrollIntoView({ behavior: "smooth" });
  } else if (p.status === "selected") {
    p.status = "available";
    selectedGift = null;
  }
  renderPresents();
}
