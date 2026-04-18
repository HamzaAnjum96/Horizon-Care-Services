/* ══════════════════════════════════════════════════
   Shared layout: <site-nav> and <site-footer>
   ──────────────────────────────────────────────────
   Light-DOM custom elements so existing .nav / .footer
   CSS keeps working unchanged. Defined here, loaded
   before main.js so behaviour wiring can find the
   resulting markup.

   Per-page usage:
     <site-nav    data-base="."  data-active="home"></site-nav>
     <site-footer data-base="."></site-footer>

     <site-nav    data-base=".." data-active="supported"></site-nav>
     <site-footer data-base=".."></site-footer>

   `data-base` is the relative path back to the repo
   root: "." for index.html, ".." for any pages/*.html.
   `data-active` highlights the matching nav link.
   ══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { key: 'home',      href: 'index.html',                       label: 'Home' },
  { key: 'supported', href: 'pages/supported-accommodation.html', label: 'Supported Accommodation' },
  { key: 'staffing',  href: 'pages/staffing-solutions.html',    label: 'Staffing Solutions' },
];

const CTA_LINK = {
  key: 'contact', href: 'pages/contact-apply.html', label: 'Contact & Apply',
};

class SiteNav extends HTMLElement {
  connectedCallback() {
    const base   = this.dataset.base   || '.';
    const active = this.dataset.active || '';

    const link = (l) => `
      <a href="${base}/${l.href}"${active === l.key ? ' class="is-active" aria-current="page"' : ''}>${l.label}</a>
    `;

    const cta = `
      <a href="${base}/${CTA_LINK.href}" class="btn btn--outline${active === CTA_LINK.key ? ' is-active' : ''}"${active === CTA_LINK.key ? ' aria-current="page"' : ''}>${CTA_LINK.label}</a>
    `;

    this.innerHTML = `
      <header class="nav">
        <div class="nav__inner container">
          <a href="${base}/index.html" class="nav__logo">
            <img src="${base}/assets/images/logo-1.jpg" alt="Horizon Care Services Ltd" />
            <div class="nav__logo-text">
              <strong>Horizon Care Services</strong>
              <span>Where We Meet Your Needs</span>
            </div>
          </a>
          <nav class="nav__links" aria-label="Primary">
            ${NAV_LINKS.map(link).join('')}
            ${cta}
          </nav>
          <button class="nav__hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const base = this.dataset.base || '.';
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="footer">
        <div class="container footer__inner">
          <div class="footer__brand">
            <img src="${base}/assets/images/logo-1.jpg" alt="Horizon Care Services Ltd" />
            <p>Where we meet your needs.</p>
          </div>
          <div class="footer__links">
            <h5>Contact</h5>
            <a href="tel:07572701349">07572 701 349</a>
            <a href="tel:01582354119">01582 354 119</a>
            <a href="mailto:admin@horizon-careservices.co.uk">admin@horizon-careservices.co.uk</a>
            <span class="footer__address">9 Lilac Grove, Luton, LU3 3JG</span>
          </div>
          <div class="footer__links">
            <h5>Legal</h5>
            <a href="${base}/pages/legal-notice.html">Legal Notice</a>
            <a href="${base}/pages/privacy-policy.html">Privacy Policy</a>
          </div>
        </div>
        <div class="footer__bottom">
          <div class="container">
            <p>&copy; ${year} Horizon Care Services Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);
