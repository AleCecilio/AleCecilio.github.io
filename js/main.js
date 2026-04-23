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

  // Tratamento de erros: Se uma função der erro, não quebra o resto do site!
  try { if(typeof renderSkills === 'function') renderSkills(); } catch(e) { console.warn(e); }
  try { if(typeof renderProjects === 'function') renderProjects(); } catch(e) { console.warn(e); }
  try { if(typeof initReveal === 'function') initReveal(); } catch(e) { console.warn(e); }

  // Ativa comportamento do menu mobile
  initMenuMobile();
});

// Apenas fecha o menu no celular, a rolagem e o histórico quem faz agora é o CSS!
function initMenuMobile() {
  document.body.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    
    // Verifica se clicou em um link que leva para uma seção (#)
    if (link && link.getAttribute('href')?.startsWith('#')) {
      const navLinks = document.querySelector('.nav-links');
      
      // Se o menu de sanduíche estiver aberto, fecha ele
      if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
      }
    }
  });
}

// Função para copiar o e-mail
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