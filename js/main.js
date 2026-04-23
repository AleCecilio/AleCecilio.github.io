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
  
  // 1. O "Espião Global" (Event Delegation)
  document.body.addEventListener('click', function(e) {
    // Verifica se o que foi clicado foi um link (<a>) ou algo dentro dele
    const link = e.target.closest('a');
    
    // Se não for link, ou se o link não começar com "#", deixa o navegador seguir a vida
    if (!link || !link.getAttribute('href')?.startsWith('#')) return;

    // Se chegou aqui, é um link do nosso menu!
    e.preventDefault(); 

    const targetId = link.getAttribute('href');
    if (targetId === '#') return; // Ignora link vazio

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Faz a rolagem suave
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // O PULO DO GATO: Só adiciona no histórico se for um destino novo
      if (window.location.hash !== targetId) {
        history.pushState(null, null, targetId);
      }
      
      // Fecha o menu mobile ao clicar (se estiver aberto)
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
      }
    }
  });

// 2. Faz a tela rolar quando o usuário clica no botão "Voltar" ou "Avançar"
  window.addEventListener('popstate', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se voltou até a página limpa (sem #), rola para o topo
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