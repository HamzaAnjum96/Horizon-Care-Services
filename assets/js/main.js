/* ══════════════════════════════════════════════════
   Site behaviours
   ──────────────────────────────────────────────────
   • Nav shadow on scroll        → toggles .nav--scrolled
   • Mobile hamburger            → toggles .nav--open + aria
   • Scroll-reveal observer      → adds .is-visible to
                                   any element with the
                                   data-animate attribute
                                   (styles live in CSS).

   Runs after <site-nav>/<site-footer> custom elements
   have rendered: this script is the *last* tag before
   </body> and layout.js is registered above it.
   ══════════════════════════════════════════════════ */

const nav = document.querySelector('.nav');

if (nav) {
  let ticking = false;
  const updateNav = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
}

const hamburger = document.querySelector('.nav__hamburger');
const navLinks  = document.querySelector('.nav__links');

if (hamburger && navLinks) {
  const setOpen = (open) => {
    nav.classList.toggle('nav--open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  hamburger.addEventListener('click', () => {
    setOpen(!nav.classList.contains('nav--open'));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach((el) => reveal.observe(el));
