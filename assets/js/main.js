'use strict';

const bar = document.getElementById('bar');
const mainNav = document.getElementById('mainNav');
const ham = document.getElementById('ham');
const mob = document.getElementById('mobNav');
let mobOpen = false, ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (scrollY / h * 100) + '%';
      mainNav.classList.toggle('scrolled', scrollY > 36);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

ham.addEventListener('click', () => {
  mobOpen = !mobOpen;
  ham.classList.toggle('open', mobOpen);
  ham.setAttribute('aria-expanded', String(mobOpen));
  mob.classList.toggle('open', mobOpen);
  mob.setAttribute('aria-hidden', String(!mobOpen));
  document.body.style.overflow = mobOpen ? 'hidden' : '';
});

function closeMob() {
  mobOpen = false;
  ham.classList.remove('open');
  ham.setAttribute('aria-expanded', 'false');
  mob.classList.remove('open');
  mob.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape' && mobOpen) closeMob(); });

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const fbtn = document.getElementById('fbtn');
if (fbtn) fbtn.addEventListener('click', () => {
  const n = document.getElementById('fn').value.trim();
  const e = document.getElementById('fe').value.trim();
  if (!n || !e) {
    fbtn.textContent = '⚠ Nombre y email requeridos';
    setTimeout(() => {
      fbtn.innerHTML = 'Enviar mensaje <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }, 2500);
    return;
  }
  fbtn.textContent = 'Enviando…';
  fbtn.disabled = true;
  setTimeout(() => {
    fbtn.textContent = '✓ Mensaje enviado. ¡Gracias!';
    fbtn.style.background = '#16a34a';
    setTimeout(() => {
      fbtn.innerHTML = 'Enviar mensaje <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      fbtn.style.background = '';
      fbtn.disabled = false;
    }, 3500);
  }, 1000);
});
