// Ativando o FAQ
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado, inicializando scripts...");

  // Inicializar o menu mobile
  initMobileMenu();

  // Inicializar as FAQs com animações aprimoradas
  initFAQs();

  // Inicializar o smooth scroll
  initSmoothScroll();

  // Inicializar efeitos fade-in
  initFadeInElements();

  // Inicializar o modal de admin
  setupAdminModal();

  // Inicializar o modal de aula experimental
  setupAulaExperimentalModal();

  // Inicializar o efeito glitch
  initGlitchEffect();

  // Inicializar o sticky navbar
  initStickyNavbar();

  // Inicializar interações com a seção de produtos
  initProductsInteractions();

  // Inicializar efeitos para elementos persuasivos
  initPersuasiveElements();

  // Código para os campos do formulário com máscaras
  const phoneMasks = document.querySelectorAll('input[type="tel"]');
  if (phoneMasks.length > 0) {
    phoneMasks.forEach((input) => {
      input.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.substring(0, 11);

        // Formatar como (XX) XXXXX-XXXX
        if (value.length > 0) {
          value = "(" + value;
          if (value.length > 3) {
            value = value.substring(0, 3) + ") " + value.substring(3);
          }
          if (value.length > 10) {
            value = value.substring(0, 10) + "-" + value.substring(10);
          }
        }

        e.target.value = value;
      });
    });
  }

  // Registrar cliques nas seções para analytics
  const sections = document.querySelectorAll("section[id]");
  sections.forEach((section) => {
    const sectionId = section.getAttribute("id");
    if (sectionId) {
      section.addEventListener("click", function () {
        recordSectionClick(sectionId);
      });
    }
  });

  // Verificar depois de 1 segundo se o botão admin foi encontrado
  // Útil para quando o DOM é modificado dinamicamente após o carregamento
  setTimeout(function () {
    if (!document.getElementById("adminAccessBtn")) {
      console.log(
        "Verificação posterior: botão admin não encontrado, tentando adicionar event listener alternativo"
      );

      // Tentar encontrar por seletor alternativo
      const alternativeBtn = document.querySelector(".admin-access-button");
      if (alternativeBtn) {
        console.log("Botão alternativo encontrado, adicionando event listener");
        alternativeBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const adminModal = document.getElementById("adminModal");
          if (adminModal) {
            adminModal.classList.remove("hidden");
            console.log("Modal admin aberto via botão alternativo");
          }
        });
      }
    }
  }, 1000);
});

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  if (menuToggle && mobileMenu && closeMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });

    closeMenu.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      document.body.style.overflow = "auto";
    });

    // Fechar o menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        document.body.style.overflow = "auto";
      });
    });
  }
}

function initFAQs() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      // Toggle active class para estilo
      this.classList.toggle("active");

      // Toggle o ícone
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-plus")) {
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      } else {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      }

      // Encontrar a resposta correspondente
      const answer = this.nextElementSibling;

      // Animação suave para exibir/ocultar
      if (answer.classList.contains("hidden")) {
        answer.classList.remove("hidden");
        answer.style.maxHeight = "0";
        answer.style.opacity = "0";

        // Força um reflow para permitir a transição
        answer.offsetHeight;

        // Aplicar classe de exibição
        answer.classList.add("show");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
      } else {
        answer.style.maxHeight = "0";
        answer.style.opacity = "0";

        // Remover após a transição
        setTimeout(() => {
          answer.classList.add("hidden");
          answer.classList.remove("show");
        }, 400);
      }
    });
  });
}

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Pular se for um link vazio ou para outra página
      if (href === "#" || href.charAt(0) !== "#") return;

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (targetElement) {
        // Ajustar para o cabeçalho fixo
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });
}

function initFadeInElements() {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

function setupAdminModal() {
  console.log("Inicializando modal de admin...");
  const adminBtn = document.getElementById("adminAccessBtn");
  const adminModal = document.getElementById("adminModal");
  const adminCloseBtn = document.getElementById("closeModal");

  if (adminBtn && adminModal) {
    console.log("Botão admin e modal encontrados, adicionando event listeners");

    // Abrir o modal ao clicar no botão
    adminBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      adminModal.classList.remove("hidden");
      console.log("Modal admin aberto");
    });

    // Fechar o modal ao clicar no botão de fechar
    if (adminCloseBtn) {
      adminCloseBtn.addEventListener("click", function () {
        adminModal.classList.add("hidden");
        console.log("Modal admin fechado via botão fechar");
      });
    }

    // Fechar o modal ao clicar fora dele
    window.addEventListener("click", function (e) {
      if (e.target === adminModal) {
        adminModal.classList.add("hidden");
        console.log("Modal admin fechado ao clicar fora");
      }
    });

    // Prevenir que o clique dentro do modal feche o mesmo
    const modalContent = adminModal.querySelector(".admin-modal-content");
    if (modalContent) {
      modalContent.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    // Processar o formulário de login
    const adminForm = document.getElementById("adminLoginForm");
    if (adminForm) {
      adminForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const passwordInput = document.getElementById("adminPassword");
        if (passwordInput && passwordInput.value === "maha1234") {
          window.location.href = "admin.html";
        } else {
          alert("Senha incorreta. Tente novamente.");
        }
      });
    }
  } else {
    console.log("Botão admin ou modal não encontrado");
  }
}

function initGlitchEffect() {
  // Adicionar efeito de glitch aos elementos
  const glitchElements = document.querySelectorAll(".glitch");

  function randomGlitch() {
    glitchElements.forEach((element) => {
      // 20% de chance de aplicar o glitch
      if (Math.random() < 0.2) {
        element.classList.add("active");

        // Remover após um tempo aleatório entre 100ms e 300ms
        setTimeout(() => {
          element.classList.remove("active");
        }, 100 + Math.random() * 200);
      }
    });

    // Chamar novamente após um tempo aleatório
    setTimeout(randomGlitch, 2000 + Math.random() * 3000);
  }

  // Iniciar o efeito após 2 segundos
  setTimeout(randomGlitch, 2000);
}

function initStickyNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
}

function initProductsInteractions() {
  const productCards = document.querySelectorAll(".product-card");

  if (productCards.length === 0) return;

  // Hover effect nas imagens
  productCards.forEach((card) => {
    const buyButton = card.querySelector(".neon-button");
    const productName = card.querySelector("h3").textContent;

    // Atualiza o texto do botão de compra
    if (buyButton) {
      // Adiciona classe para animação de pulsar
      buyButton.addEventListener("mouseenter", () => {
        buyButton.classList.add("pulsating");
      });

      buyButton.addEventListener("mouseleave", () => {
        buyButton.classList.remove("pulsating");
      });
    }
  });

  // Contador regressivo para estimular a urgência
  const countdownElements = document.querySelectorAll(".urgency-badge");

  countdownElements.forEach((badge) => {
    if (badge.textContent.includes("Encerra")) {
      // Cria um contador para essas badges
      const endTime = new Date();
      endTime.setHours(
        endTime.getHours() + Math.floor(Math.random() * 12) + 12
      );

      const updateCountdown = () => {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
          badge.textContent = "ENCERRADO";
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        badge.textContent = `Encerra em ${hours}h ${minutes}m`;

        setTimeout(updateCountdown, 60000); // Atualiza a cada minuto
      };

      updateCountdown();
    }
  });
}

function initPersuasiveElements() {
  // Elemento com efeito glitch
  const glitchElements = document.querySelectorAll(".glitch");

  if (glitchElements.length > 0) {
    setInterval(() => {
      const randomElement =
        glitchElements[Math.floor(Math.random() * glitchElements.length)];
      randomElement.classList.add("active");

      setTimeout(() => {
        randomElement.classList.remove("active");
      }, 500);
    }, 3000);
  }

  // Efeito para textos persuasivos
  const persuasiveTexts = document.querySelectorAll(".persuasive-text");

  if (persuasiveTexts.length > 0) {
    persuasiveTexts.forEach((text) => {
      text.addEventListener("mouseenter", () => {
        text.style.textShadow = "0 0 10px rgba(0, 245, 160, 0.7)";
      });

      text.addEventListener("mouseleave", () => {
        text.style.textShadow = "none";
      });
    });
  }

  // Adiciona efeito de destacar quando o elemento entra no viewport
  const highlightOnView = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Adiciona efeito de destaque
        entry.target.classList.add("highlight-active");

        // Remove após alguns segundos
        setTimeout(() => {
          entry.target.classList.remove("highlight-active");
        }, 2000);

        // Observa novamente após um intervalo para repetir o efeito quando for visível novamente
        observer.unobserve(entry.target);
        setTimeout(() => {
          observer.observe(entry.target);
        }, 5000);
      }
    });
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const persuasiveObserver = new IntersectionObserver(highlightOnView, options);
  persuasiveTexts.forEach((text) => persuasiveObserver.observe(text));
}

// Função para registrar cliques em seções para analytics
function recordSectionClick(sectionId) {
  // Obter dados existentes ou inicializar
  let clickData = JSON.parse(localStorage.getItem("mahaplay_clicks") || "{}");

  // Se não existir entrada para esta seção, inicializar
  if (!clickData[sectionId]) {
    clickData[sectionId] = 0;
  }

  // Incrementar contador
  clickData[sectionId]++;

  // Salvar dados
  localStorage.setItem("mahaplay_clicks", JSON.stringify(clickData));

  console.log(`Clique registrado na seção: ${sectionId}`);
}

// Função para gerenciar o modal de aula experimental
function setupAulaExperimentalModal() {
  const aulaBtn = document.getElementById("aula-experimental-btn");
  const aulaModal = document.getElementById("modal-aula-experimental");
  const closeAulaBtn = document.getElementById("close-modal-aula");

  if (aulaBtn && aulaModal) {
    // Abrir o modal ao clicar no botão
    aulaBtn.addEventListener("click", function () {
      aulaModal.classList.remove("hidden");
      aulaModal.classList.add("flex");
      document.body.style.overflow = "hidden"; // Impedir rolagem de fundo
    });

    // Fechar o modal ao clicar no botão de fechar
    if (closeAulaBtn) {
      closeAulaBtn.addEventListener("click", function () {
        aulaModal.classList.add("hidden");
        aulaModal.classList.remove("flex");
        document.body.style.overflow = "auto"; // Restaurar rolagem
      });
    }

    // Fechar o modal ao clicar fora dele
    aulaModal.addEventListener("click", function (e) {
      if (e.target === aulaModal) {
        aulaModal.classList.add("hidden");
        aulaModal.classList.remove("flex");
        document.body.style.overflow = "auto"; // Restaurar rolagem
      }
    });
  }
}
