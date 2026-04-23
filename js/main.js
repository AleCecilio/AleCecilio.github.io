document.addEventListener("DOMContentLoaded", async () => {
  
  // Função para carregar os arquivos HTML dentro do index
  const loadHTML = async (id, path) => {
    const el = document.getElementById(id);
    if (el) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          el.innerHTML = await response.text();
        }
      } catch (err) {
        console.error("Erro ao carregar " + path, err);
      }
    }
  };

  // Carrega todas as partes do site ao mesmo tempo
  await Promise.all([
    loadHTML("navbar-container", "components/navbar.html"),
    loadHTML("projects-container", "pages/projects.html"),
    loadHTML("about-container", "pages/about.html"),
    loadHTML("detail-container", "pages/project-detail.html"),
    loadHTML("contact-container", "pages/contact.html") 
  ]);

  // Carrega o footer nas 4 páginas injetadas
  const footerContainers = document.querySelectorAll('.footer-container');
  for (let container of footerContainers) {
    try {
      const res = await fetch("components/footer.html");
      container.innerHTML = await res.text();
    } catch (e) {}
  }

  // Só depois de carregar o HTML que a gente injeta as listas e animações
  renderSkills();
  renderProjects();
  initReveal();

  // NOVO: Inicia a navegação com suporte a Histórico
  initNavigation();
});

// Função para gerenciar o clique no menu e o histórico do navegador
function initNavigation() {
  // 1. Intercepta o clique nos links do menu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); 

      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Ignora se for link vazio

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Faz a rolagem suave
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });

        // Salva a nova seção no histórico do navegador
        history.pushState(null, null, targetId);
        
        // (Opcional) Se o menu mobile estiver aberto, fecha ele ao clicar num link
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
      }
    });
  });

  // 2. Faz a tela rolar quando o usuário clica no botão "Voltar" ou "Avançar" do navegador
  window.addEventListener('popstate', () => {
    // Se a URL tiver um # (ex: site.com/#sobre)
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se não tiver # (ex: site.com/), rola de volta para o topo (Home)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// Função para copiar o e-mail na página de contato
function copiarEmail() {
  navigator.clipboard.writeText("moreiraalessandro901@gmail.com");
  const btn = document.getElementById("btnCopiar");
  
  if (btn) {
    const textoOriginal = btn.innerHTML;
    
    // Muda o visual para dar feedback que funcionou
    btn.innerHTML = "✅ E-mail Copiado!";
    btn.style.backgroundColor = "var(--gray-800)";
    btn.style.borderColor = "var(--gray-800)";
    
    // Volta ao normal depois de 2.5 segundos
    setTimeout(() => {
      btn.innerHTML = textoOriginal;
      btn.style.backgroundColor = "var(--accent)";
      btn.style.borderColor = "var(--accent)";
    }, 2500);
  }
}