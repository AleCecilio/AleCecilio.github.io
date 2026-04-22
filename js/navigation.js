function go(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('onclick')?.includes(`'${page}'`));
  });
  
  const pageEl = document.getElementById('page-' + page);
  if(pageEl) pageEl.classList.add('active');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const navLinks = document.getElementById('navLinks');
  if(navLinks) navLinks.classList.remove('open');
  initReveal();
}

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if(navLinks) navLinks.classList.toggle('open');
}