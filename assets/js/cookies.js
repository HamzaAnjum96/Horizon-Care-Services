(() => {
  const STORAGE_KEY = 'hcs-cookie-consent';

  const privacyHref = () =>
    window.location.pathname.includes('/pages/')
      ? 'privacy-policy.html'
      : 'pages/privacy-policy.html';

  const buildBanner = () => {
    const bar = document.createElement('div');
    bar.className = 'cookie-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML = `
      <p class="cookie-bar__text">
        We use a small number of essential cookies to keep this site running.
        See our <a href="${privacyHref()}" class="cookie-bar__link">privacy policy</a> for details.
      </p>
      <button type="button" class="cookie-bar__accept btn btn--primary">Accept</button>
    `;
    return bar;
  };

  const showBanner = () => {
    if (document.querySelector('.cookie-bar')) return;
    const bar = buildBanner();
    document.body.appendChild(bar);
    requestAnimationFrame(() => bar.classList.add('is-visible'));

    bar.querySelector('.cookie-bar__accept').addEventListener('click', () => {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (_) {}
      bar.classList.remove('is-visible');
      const remove = () => bar.remove();
      bar.addEventListener('transitionend', remove, { once: true });
      setTimeout(remove, 600);
    });
  };

  const init = () => {
    let consent = null;
    try { consent = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (!consent) showBanner();

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-cookie-settings]');
      if (!trigger) return;
      e.preventDefault();
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      showBanner();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
