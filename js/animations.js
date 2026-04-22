window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if(navbar) navbar.classList.toggle('scrolled', scrollY > 10);
});

function initReveal() {
  setTimeout(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.in)').forEach(el => obs.observe(el));
  }, 60);
}