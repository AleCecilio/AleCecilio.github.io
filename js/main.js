document.addEventListener("DOMContentLoaded", async () => {
  
  // Função para carregar os arquivos HTML
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

  // Carrega as partes do site
  await Promise.all([
    loadHTML("navbar-container", "components/navbar.html"),
    loadHTML("projects-container", "pages/projects.html"),
    loadHTML("about-container", "pages/about.html"),
    loadHTML("detail-container", "pages/project-detail.html"),
    loadHTML("contact-container", "pages/contact.html") 
  ]);

  // Carrega o footer
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

}); // <-- Fim do DOMContentLoaded


/* ══════════════════════════════════════
   SISTEMA DE NAVEGAÇÃO E HISTÓRICO
══════════════════════════════════════ */

// Esta é a função que o seu HTML chama no onclick="go('nome')"
window.go = function(sectionName) {
  
  // 1. Se for 'home', rola para o topo
  if (sectionName === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash !== '') history.pushState(null, null, ' '); // Limpa a URL
    fecharMenuMobile();
    return;
  }

  // 2. Procura a seção pelo nome (tenta com e sem '-container')
  let targetSection = document.getElementById(sectionName);
  if (!targetSection) targetSection = document.getElementById(sectionName + "-container");

  // 3. Se achou a seção, faz a mágica acontecer
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // O PULO DO GATO: Muda a URL e cria o histórico de navegação!
    const newHash = '#' + sectionName;
    if (window.location.hash !== newHash) {
      history.pushState(null, null, newHash);
    }

    fecharMenuMobile();
  } else {
    console.warn(`Seção '${sectionName}' não encontrada na página.`);
  }
};

// Faz o botão Voltar e Avançar do navegador funcionarem
window.addEventListener('popstate', () => {
  const hash = window.location.hash;
  
  if (hash) {
    // Tira o '#' da string
    const sectionName = hash.substring(1); 
    
    // Procura a seção
    let target = document.getElementById(sectionName);
    if (!target) target = document.getElementById(sectionName + "-container");
    
    // Rola para ela
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Se não tem hash, é porque voltou para a Home
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Função auxiliar para fechar o menu no celular
function fecharMenuMobile() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
  }
}

/* ══════════════════════════════════════
   OUTRAS FUNÇÕES
══════════════════════════════════════ */
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