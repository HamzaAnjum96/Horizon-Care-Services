// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Header scroll shadow
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Inject stagger indices for card/metric grids
(function () {
  ['card-grid', 'metric-grid'].forEach(cls => {
    document.querySelectorAll('.' + cls).forEach(grid => {
      [...grid.children].forEach((el, i) => el.style.setProperty('--stagger-index', i));
    });
  });
})();

// Scroll-triggered entrance animations
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.card, .metric, .cta-band');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  targets.forEach(el => io.observe(el));
})();
