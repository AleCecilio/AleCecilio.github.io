document.addEventListener("DOMContentLoaded", async () => {
  
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

  await Promise.all([
    loadHTML("navbar-container", "components/navbar.html"),
    loadHTML("projects-container", "pages/projects.html"),
    loadHTML("about-container", "pages/about.html"),
    loadHTML("detail-container", "pages/project-detail.html"),
    loadHTML("contact-container", "pages/contact.html") 
  ]);

  const footerContainers = document.querySelectorAll('.footer-container');
  for (let container of footerContainers) {
    try {
      const res = await fetch("components/footer.html");
      container.innerHTML = await res.text();
    } catch (e) {}
  }

  // Executa as animações se elas existirem
  try { if(typeof renderSkills === 'function') renderSkills(); } catch(e) {}
  try { if(typeof renderProjects === 'function') renderProjects(); } catch(e) {}
  try { if(typeof initReveal === 'function') initReveal(); } catch(e) {}

  // INICIA A NAVEGAÇÃO À PROVA DE FALHAS
  initNavigation();
});

function initNavigation() {
  // 1. Intercepta todos os cliques do site
  document.body.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    
    if (link && link.getAttribute('href')?.startsWith('#')) {
      e.preventDefault(); // Impede o bug do pulo seco
      
      const targetHash = link.getAttribute('href'); // Pega o "#nome"
      if (targetHash === '#') return;

      // Procura a seção na página
      const targetSection = document.querySelector(targetHash);
      
      if (targetSection) {
        // Se achou a seção, rola suavemente
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // PULO DO GATO: Força o salvamento no histórico!
        if (window.location.hash !== targetHash) {
          history.pushState(null, null, targetHash);
        }
        
        // Fecha o menu do celular
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
      } else {
        // SE DER ERRO, ELE TE AVISA AQUI!
        console.error(`🔴 ERRO: Você clicou em "${targetHash}", mas não existe nenhum <div id="${targetHash.replace('#', '')}"> no seu index.html!`);
      }
    }
  });

  // 2. Faz o botão voltar e avançar do navegador funcionar
  window.addEventListener('popstate', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function copiarEmail() {
  navigator.clipboard.writeText("moreiraalessandro901@gmail.com");
  const btn = document.getElementById("btnCopiar");
  
  if (btn) {
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = "✅ E-mail Copiado!";
    btn.style.backgroundColor = "var(--gray-800)";
    btn.style.borderColor = "var(--gray-800)";
    
    setTimeout(() => {
      btn.innerHTML = textoOriginal;
      btn.style.backgroundColor = "var(--accent)";
      btn.style.borderColor = "var(--accent)";
    }, 2500);
  }
}