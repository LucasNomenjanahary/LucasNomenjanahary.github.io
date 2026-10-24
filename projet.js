/* ============================================================
   LUCAS — PORTFOLIO · projet.js (version améliorée)
   ============================================================ */

// ---------- EmailJS — INITIALISATION ----------
// ⚠️  Remplace ces valeurs par tes propres clés sur https://www.emailjs.com
const EMAILJS_PUBLIC_KEY  = 'VOTRE_PUBLIC_KEY';   // ex: 'abc123XYZ'
const EMAILJS_SERVICE_ID  = 'VOTRE_SERVICE_ID';   // ex: 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';  // ex: 'template_xxxxxxx'

emailjs.init(EMAILJS_PUBLIC_KEY);

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
const toggle     = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mmLinks    = document.querySelectorAll('.mm-link');

toggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mmLinks.forEach(l => l.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
}));

// ---------- Reveal on scroll (IntersectionObserver) ----------
const reveals  = document.querySelectorAll('.reveal');
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

// ---------- Compteur animé (stats About) ----------
// Anime les chiffres quand la section about entre dans l'écran
function animateCounter(el, target, duration = 1200) {
  // Si la valeur contient une lettre (ex: "L1"), on ne l'anime pas
  if (isNaN(parseInt(target))) return;

  const suffix = target.replace(/[0-9]/g, ''); // ex: "+" dans "5+"
  const num    = parseInt(target);
  const start  = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * num) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el, el.textContent.trim());
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

// ---------- Tilt effect sur les cartes projet ----------
document.querySelectorAll('.projet-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4; // max 4deg
    const rotateY = ((x - cx) / cx) *  4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---------- Contact form — EmailJS ----------
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();

  const form      = e.target;
  const btn       = form.querySelector('#submitBtn');
  const btnText   = btn.querySelector('.btn-text');
  const btnLoader = btn.querySelector('.btn-loader');
  const status    = document.getElementById('formStatus');

  // UI : chargement
  btnText.style.display   = 'none';
  btnLoader.style.display = 'inline';
  btn.disabled            = true;
  status.className        = 'form-status';
  status.style.display    = 'none';

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

    // Succès
    status.textContent  = '✓ Message envoyé ! Je te répondrai dès que possible.';
    status.className    = 'form-status success';
    form.reset();

    setTimeout(() => {
      status.className = 'form-status';
    }, 5000);

  } catch (err) {
    // Erreur
    status.textContent = '✗ Erreur lors de l\'envoi. Contacte-moi directement par email.';
    status.className   = 'form-status error';
    console.error('EmailJS error:', err);
  } finally {
    btnText.style.display   = 'inline';
    btnLoader.style.display = 'none';
    btn.disabled            = false;
  }
});
