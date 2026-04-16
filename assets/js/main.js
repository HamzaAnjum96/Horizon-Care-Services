// Nav scroll effect
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 4px 24px rgba(107,45,139,.10)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}

// Mobile hamburger
const hamburger = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  // Close menu on link click
  document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// Intersection Observer – fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.intro__card, .service-card, .phil-card, .about__content, .about__image-wrap, .contact__info, .contact__form'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Add CSS for fade-up animation
const style = document.createElement('style');
style.textContent = `
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1); }
  .fade-up.visible { opacity: 1; transform: none; }
  .intro__card:nth-child(2) { transition-delay: .1s; }
  .intro__card:nth-child(3) { transition-delay: .2s; }
  .phil-card:nth-child(2) { transition-delay: .1s; }
  .phil-card:nth-child(3) { transition-delay: .2s; }
  .phil-card:nth-child(4) { transition-delay: .3s; }
`;
document.head.appendChild(style);
