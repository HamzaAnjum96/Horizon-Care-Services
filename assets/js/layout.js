/* Light-DOM custom elements so a single CSS file can target the rendered
   markup. Loaded before main.js so behaviour wiring finds upgraded nodes.

   <site-nav    data-base="."  data-active="home"></site-nav>
   <site-footer data-base="."></site-footer>

   data-base = "." from index.html, ".." from any pages/*.html.
   data-active matches a key in NAV_LINKS or CTA_LINK. */

const NAV_LINKS = [
  { key: 'home',      href: 'index.html',                         label: 'Home' },
  { key: 'about',     href: 'pages/about.html',                   label: 'About Us' },
  { key: 'supported', href: 'pages/supported-accommodation.html', label: 'Supported Accommodation' },
  { key: 'staffing',  href: 'pages/staffing-solutions.html',      label: 'Staffing Solutions' },
  { key: 'careers',   href: 'pages/careers.html',                 label: 'Work With Us' },
];

const CTA_LINK = {
  key: 'contact', href: 'pages/contact.html', label: 'Contact Us',
};

class SiteNav extends HTMLElement {
  connectedCallback() {
    const base   = this.dataset.base   || '.';
    const active = this.dataset.active || '';

    const link = (l) => `
      <a href="${base}/${l.href}"${active === l.key ? ' class="is-active" aria-current="page"' : ''}>${l.label}</a>
    `;

    const ctaActive = active === CTA_LINK.key;
    const cta = `
      <a href="${base}/${CTA_LINK.href}" class="nav__cta btn btn--primary${ctaActive ? ' is-active' : ''}"${ctaActive ? ' aria-current="page"' : ''}>${CTA_LINK.label}</a>
    `;

    this.innerHTML = `
      <header class="nav">
        <div class="nav__inner container">
          <a href="${base}/index.html" class="nav__logo">
            <img src="${base}/assets/images/logo.svg" alt="Horizon Care Services Ltd" />
            <div class="nav__logo-text">
              <strong>Horizon Care Services</strong>
              <span>Professional care with compassion</span>
            </div>
          </a>
          <nav class="nav__links" aria-label="Primary">
            ${NAV_LINKS.map(link).join('')}
          </nav>
          ${cta}
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
        <div class="container">
          <div class="footer__bottom">
            <nav class="footer__minimal-links" aria-label="Footer links">
              <a href="${base}/pages/legal-notice.html">Legal</a>
              <a href="${base}/pages/privacy-policy.html">Privacy Policy</a>
              <a href="${base}/pages/contact.html">Contact Us</a>
            </nav>
            <p>&copy; ${year} Horizon Care Services Ltd · 475B Cheetham Hill Road, Cheetham Hill, Manchester, M89LR</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);
