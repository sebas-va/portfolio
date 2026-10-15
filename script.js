const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('sv-theme');
if (savedTheme === 'light') root.classList.add('light');
themeButton.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('sv-theme', root.classList.contains('light') ? 'light' : 'dark');
});
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.nav');
mobileMenu.addEventListener('click', () => {
  const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
  mobileMenu.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  mobileMenu.setAttribute('aria-expanded','false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const scene = document.querySelector('#desk-scene');
const sceneContainer = document.querySelector('.hero-art');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!prefersReducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
  sceneContainer.addEventListener('pointermove', e => {
    const rect = sceneContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    scene.style.transform = `translate(-50%, -50%) rotateX(${y * -6}deg) rotateY(${x * 10}deg)`;
  });
  sceneContainer.addEventListener('pointerleave', () => { scene.style.transform = 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg)'; });
}
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold: 0.09});
document.querySelectorAll('.section,.project-feature,.mini-project,.contact').forEach(el => {el.classList.add('reveal');observer.observe(el);});
