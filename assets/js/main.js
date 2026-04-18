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

const mobilePreviewQuery = window.matchMedia('(max-width: 768px)');
const mobilePreviewConfigs = [];
const mobilePreviewHiddenClass = 'mobile-preview__item--hidden';

const syncMobilePreview = () => {
  const isMobile = mobilePreviewQuery.matches;
  mobilePreviewConfigs.forEach((config) => {
    const { cards, previewCount, button, label } = config;
    const showAll = !isMobile || config.expanded;

    cards.forEach((card, index) => {
      card.classList.toggle(mobilePreviewHiddenClass, !showAll && index >= previewCount);
    });

    button.hidden = !isMobile;
    button.textContent = config.expanded ? `Show fewer ${label}` : `Show more ${label}`;
    button.setAttribute('aria-expanded', String(config.expanded));
  });
};

document.querySelectorAll('[data-mobile-preview]').forEach((grid) => {
  const cards = Array.from(grid.children);
  const previewCount = Number(grid.dataset.mobilePreview || 2);
  if (cards.length <= previewCount) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn--outline mobile-preview__toggle';

  const config = {
    grid,
    cards,
    previewCount,
    button,
    label: (grid.dataset.previewLabel || 'items').toLowerCase(),
    expanded: false
  };

  button.addEventListener('click', () => {
    config.expanded = !config.expanded;
    syncMobilePreview();
  });

  grid.insertAdjacentElement('afterend', button);
  mobilePreviewConfigs.push(config);
});

if (mobilePreviewConfigs.length) {
  syncMobilePreview();
  mobilePreviewQuery.addEventListener('change', () => {
    mobilePreviewConfigs.forEach((config) => {
      config.expanded = false;
    });
    syncMobilePreview();
  });
}
