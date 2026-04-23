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
  document.body.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    
    if (link && link.getAttribute('href')?.startsWith('#')) {
      e.preventDefault(); 
      
      const targetHash = link.getAttribute('href'); // Ex: clica em "#about"
      if (targetHash === '#') return;

      // 1. Tenta achar a seção com o nome exato (Ex: id="about")
      let targetSection = document.querySelector(targetHash);
      
      // 2. LÓGICA INTELIGENTE: Se não achou, tenta colocar "-container" no final (Ex: id="about-container")
      // Isso resolve o problema de o link se chamar "#about" e a div se chamar "about-container"
      if (!targetSection) {
        targetSection = document.querySelector(targetHash + "-container");
      }
      
      if (targetSection) {
        // Deu certo! Rola a tela
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // MUDA A URL E SALVA O HISTÓRICO
        if (window.location.hash !== targetHash) {
          history.pushState(null, null, targetHash);
        }
        
        // Fecha o menu do celular se estiver aberto
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
      } else {
        // SE DER ERRO, JOGA UM POP-UP NA SUA TELA PARA VOCÊ VER!
        alert(`❌ ERRO DE LINK: Você clicou em "${targetHash}".\n\nMas não existe nenhum elemento na página com id="${targetHash.replace('#', '')}" ou id="${targetHash.replace('#', '')}-container".\n\nAbra o navbar.html e arrume o nome do link!`);
      }
    }
  });

  // Garante que o botão voltar/avançar ache a seção, mesmo se ela tiver "-container" no nome
  window.addEventListener('popstate', () => {
    if (window.location.hash) {
      let target = document.querySelector(window.location.hash);
      if (!target) {
        target = document.querySelector(window.location.hash + "-container");
      }
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