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
            <img src="${base}/assets/images/logo-1.jpg" alt="Horizon Care Services Ltd" />
            <div class="nav__logo-text">
              <strong>Horizon Care Services</strong>
              <span>Where We Meet Your Needs</span>
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

    const pageLink = (l) => `<a href="${base}/${l.href}">${l.label}</a>`;
    const pageLinks = [...NAV_LINKS, CTA_LINK].map(pageLink).join('');

    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <a href="${base}/index.html" class="footer__logo">
                <img src="${base}/assets/images/logo-1.jpg" alt="Horizon Care Services Ltd" />
                <strong>Horizon Care Services</strong>
              </a>
              <address class="footer__address">
                9 Lilac Grove<br>
                Luton, LU3 3JG
              </address>
              <ul class="footer__contact">
                <li><a href="tel:+447572701349">07572 701 349</a> <span class="footer__contact-label">Mobile</span></li>
                <li><a href="tel:+441582354119">01582 354 119</a> <span class="footer__contact-label">Office</span></li>
                <li><a href="mailto:admin@horizon-careservices.co.uk">admin@horizon-careservices.co.uk</a></li>
              </ul>
            </div>
            <nav class="footer__nav" aria-label="Pages">
              <h3 class="footer__heading">Explore</h3>
              ${pageLinks}
            </nav>
            <nav class="footer__legal" aria-label="Legal">
              <h3 class="footer__heading">Legal</h3>
              <a href="${base}/pages/privacy-policy.html">Privacy Policy</a>
              <a href="${base}/pages/legal-notice.html">Legal Notice</a>
              <button type="button" class="footer__cookie-settings" data-cookie-settings>Cookie settings</button>
            </nav>
          </div>
          <div class="footer__bottom">
            <p>&copy; ${year} Horizon Care Services Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);
