// A função go agora recebe um segundo parâmetro (isPopState)
function go(page, isPopState = false) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('onclick')?.includes(`'${page}'`));
  });
  
  const pageEl = document.getElementById('page-' + page);
  if(pageEl) pageEl.classList.add('active');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  const navLinks = document.getElementById('navLinks');
  if(navLinks) navLinks.classList.remove('open');
  
  if (typeof initReveal === 'function') {
    initReveal();
  }

  // Grava a navegação no histórico do navegador
  if (!isPopState) {
    const newUrl = page === 'home' ? window.location.pathname : `#${page}`;
    history.pushState({ page: page }, '', newUrl);
  }
}

//Faz os botões nativos "Voltar" e "Avançar" do navegador funcionarem
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    go(event.state.page, true);
  } else {
    go('home', true);
  }
});

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if(navLinks) navLinks.classList.toggle('open');
}

//  Garante que a primeira página a carregar define a Home no histórico
document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.hash) {
    history.replaceState({ page: 'home' }, '', window.location.pathname);
  } else {
    const initialPage = window.location.hash.replace('#', '');
    setTimeout(() => go(initialPage, true), 300);
  }
});