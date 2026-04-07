const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const contactForm = document.querySelector('.contact-form');
const formMsg = document.querySelector('.form-msg');
const yearNode = document.getElementById('year');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (contactForm && formMsg) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      formMsg.textContent = 'Por favor completa los campos obligatorios.';
      return;
    }

    const name = new FormData(contactForm).get('nombre');
    formMsg.textContent = `Gracias ${name || ''}, recibimos tu mensaje.`.trim();
    contactForm.reset();
  });
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
