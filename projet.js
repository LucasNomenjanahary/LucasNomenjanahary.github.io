/* ============================================================
   LUCAS — PORTFOLIO · projet.js
   ============================================================ */

// ---------- Cursor (desktop only) ----------
if (window.matchMedia('(pointer: fine)').matches) {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });
} else {
  document.querySelector('.cursor-dot').style.display  = 'none';
  document.querySelector('.cursor-ring').style.display = 'none';
}

// ---------- Nav scroll ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ---------- Mobile menu ----------
const toggle    = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mmLinks   = document.querySelectorAll('.mm-link');

toggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mmLinks.forEach(l => l.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
}));

// ---------- Reveal on scroll ----------
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// ---------- Skill bars ----------
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-col').forEach(col => skillObserver.observe(col));

// ---------- Contact form ----------
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Envoyé ✓';
  btn.style.background = '#4a9e6b';
  setTimeout(() => {
    btn.textContent = 'Envoyer';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});
