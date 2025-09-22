// Dados dos presentes
let presents = [
  {
    id: 1,
    name: "1 ano de academia grátis para os noivos",
    value: "R$ 50,00",
    status: "available", // available, selected, given
    icon: "💪",
  },
  {
    id: 2,
    name: "Aulas de culinária para casais",
    value: "R$ 80,00",
    status: "available",
    icon: "👨‍🍳",
  },
  {
    id: 3,
    name: "Massagem relaxante para dois",
    value: "R$ 120,00",
    status: "available",
    icon: "💆‍♀️",
  },
  {
    id: 4,
    name: "Jantar romântico em casa",
    value: "R$ 100,00",
    status: "selected",
    icon: "🕯️",
  },
  {
    id: 5,
    name: "Kit sobrevivência para recém-casados",
    value: "R$ 60,00",
    status: "available",
    icon: "🎒",
  },
  {
    id: 6,
    name: "Curso de dança para noivos",
    value: "R$ 90,00",
    status: "given",
    icon: "💃",
  },
];

// Chave PIX
const pixKey = "47745213886";

// Função para obter texto do status
function getStatusText(status) {
  switch (status) {
    case "available":
      return "Disponível";
    case "selected":
      return "Selecionado";
    case "given":
      return "Presenteado";
    default:
      return "Disponível";
  }
}

// Função para obter classe CSS do status
function getStatusClass(status) {
  switch (status) {
    case "available":
      return "status-available";
    case "selected":
      return "status-selected";
    case "given":
      return "status-given";
    default:
      return "status-available";
  }
}

// Função para obter classe CSS do botão
function getButtonClass(status) {
  switch (status) {
    case "available":
      return "button-available";
    case "selected":
      return "button-selected";
    case "given":
      return "button-given";
    default:
      return "button-available";
  }
}

// Função para obter texto do botão
function getButtonText(status) {
  switch (status) {
    case "available":
      return "Presentear";
    case "selected":
      return "Selecionado";
    case "given":
      return "Já Presenteado";
    default:
      return "Presentear";
  }
}

// Função para renderizar os presentes
function renderPresents() {
  const grid = document.getElementById("presents-grid");
  grid.innerHTML = "";

  presents.forEach((present) => {
    const presentCard = document.createElement("div");
    presentCard.classList.add("present-card");

    presentCard.innerHTML = `
            <div class="present-icon">${present.icon}</div>
            <h3 class="present-title">${present.name}</h3>
            <p class="present-price">${present.value}</p>
            <p class="present-status ${present.status}">
                ${
                  present.status === "available"
                    ? "Disponível"
                    : present.status === "selected"
                    ? "Selecionado"
                    : "Já Presenteado"
                }
            </p>
        `;

    const button = document.createElement("button");
    button.classList.add("present-button", getButtonClass(present.status));
    button.textContent = getButtonText(present.status);

    if (present.status === "available") {
      button.textContent = "Presentear";
      button.classList.add("button-available");
      button.onclick = () => handlePresentClick(present.id);
    } else if (present.status === "selected") {
      button.textContent = "Desmarcar";
      button.classList.add("button-selected");
      button.onclick = () => handlePresentClick(present.id);
    } else {
      button.textContent = "Já Presenteado";
      button.classList.add("button-given");
      button.disabled = true;
    }

    presentCard.appendChild(button);
    grid.appendChild(presentCard);
  });
}

// Função para lidar com clique no presente
// Função para lidar com clique no presente (agora toggle)
// Função para lidar com clique no presente (agora funciona como toggle)
function handlePresentClick(presentId) {
  const presentIndex = presents.findIndex((p) => p.id === presentId);

  if (presentIndex !== -1) {
    // Alterna entre "available" e "selected"
    presents[presentIndex].status =
      presents[presentIndex].status === "available" ? "selected" : "available";

    renderPresents();

    // Se acabou de virar selecionado, rola até o PIX
    if (presents[presentIndex].status === "selected") {
      document
        .getElementById("pix-section")
        .scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Função para copiar chave PIX
function copyPixKey() {
  const button = document.getElementById("copy-button");
  const copyText = button.querySelector(".copy-text");
  const copyIcon = button.querySelector(".copy-icon");

  // Tentar copiar para a área de transferência
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(pixKey)
      .then(() => {
        showCopySuccess();
      })
      .catch(() => {
        fallbackCopyTextToClipboard(pixKey);
      });
  } else {
    fallbackCopyTextToClipboard(pixKey);
  }

  function showCopySuccess() {
    button.classList.add("copied");
    copyText.textContent = "Copiado!";
    copyIcon.textContent = "✅";

    setTimeout(() => {
      button.classList.remove("copied");
      copyText.textContent = "Copiar chave PIX";
      copyIcon.textContent = "📋";
    }, 2000);
  }

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Evitar scroll para baixo
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        showCopySuccess();
      } else {
        alert("Não foi possível copiar automaticamente. Chave PIX: " + pixKey);
      }
    } catch (err) {
      alert("Não foi possível copiar automaticamente. Chave PIX: " + pixKey);
    }

    document.body.removeChild(textArea);
  }
}

// Função para adicionar novo presente (para facilitar futuras adições)
function addNewPresent(name, value, icon) {
  const newId = Math.max(...presents.map((p) => p.id)) + 1;
  const newPresent = {
    id: newId,
    name: name,
    value: value,
    status: "available",
    icon: icon,
  };

  presents.push(newPresent);
  renderPresents();
}

// Função para remover presente
function removePresent(presentId) {
  presents = presents.filter((p) => p.id !== presentId);
  renderPresents();
}

// Função para atualizar status do presente
function updatePresentStatus(presentId, newStatus) {
  const presentIndex = presents.findIndex((p) => p.id === presentId);
  if (presentIndex !== -1) {
    presents[presentIndex].status = newStatus;
    renderPresents();
  }
}

// Inicialização quando a página carrega
document.addEventListener("DOMContentLoaded", function () {
  // Renderizar presentes
  renderPresents();

  // Configurar botão de copiar PIX
  const copyButton = document.getElementById("copy-button");
  if (copyButton) {
    copyButton.addEventListener("click", copyPixKey);
  }

  // Adicionar animações suaves aos elementos quando entram na tela
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const animatedElements = document.querySelectorAll(
    ".intro-card, .present-card, .pix-card"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Exportar funções para uso global (opcional)
window.addNewPresent = addNewPresent;
window.removePresent = removePresent;
window.updatePresentStatus = updatePresentStatus;
window.handlePresentClick = handlePresentClick;
