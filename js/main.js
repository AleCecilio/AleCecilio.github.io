document.addEventListener("DOMContentLoaded", async () => {
  // Carrega as partes do site
  const loadHTML = async (id, path) => {
    const el = document.getElementById(id);
    if (el) {
      try {
        const response = await fetch(path);
        if (response.ok) el.innerHTML = await response.text();
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

  // Animações
  try { if(typeof renderSkills === 'function') renderSkills(); } catch(e) {}
  try { if(typeof renderProjects === 'function') renderProjects(); } catch(e) {}
  try { if(typeof initReveal === 'function') initReveal(); } catch(e) {}

  // Fecha o menu mobile quando clica em QUALQUER link do site (navbar ou footer)
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('a') && e.target.closest('a').getAttribute('href')?.startsWith('#')) {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    }
  });
});

function copiarEmail() {
  navigator.clipboard.writeText("moreiraalessandro901@gmail.com");
  const btn = document.getElementById("btnCopiar");
  if (btn) {
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = "✅ E-mail Copiado!";
    btn.style.backgroundColor = "var(--gray-800)";
    setTimeout(() => {
      btn.innerHTML = textoOriginal;
      btn.style.backgroundColor = "var(--accent)";
    }, 2500);
  }
}