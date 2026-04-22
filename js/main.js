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
});