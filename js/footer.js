class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--footer-bg)"/>
          </svg>
        </div>
        <div class="footer-body">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="/" class="logo footer-logo" aria-label="EmailLink Home">
                <span class="logo-icon">✉</span>
                <span class="logo-text">Email<strong>Link</strong></span>
              </a>
              <p class="footer-tagline">The fastest, easiest way to generate perfect mailto links for your website, emails, and campaigns.</p>
              <div class="footer-badges">
                <span class="badge">100% Free</span>
                <span class="badge">No Sign-up</span>
                <span class="badge">Instant</span>
              </div>
            </div>
            <div class="footer-col">
              <h4>Tools</h4>
              <ul>
                <li><a href="#generator">Mailto Link Generator</a></li>
                <li><a href="#generator">HTML Email Link Builder</a></li>
                <li><a href="#generator">Clickable Email Link</a></li>
                <li><a href="#generator">Email Hyperlink Creator</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Learn</h4>
              <ul>
                <li><a href="#guide">Mailto HTML Guide</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#examples">Code Examples</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>About</h4>
              <ul>
                <li><a href="https://emaillink.github.io" rel="noopener">EmailLink.github.io</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#use-cases">Use Cases</a></li>
                <li><a href="#faq">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${year} EmailLink Generator — <a href="https://emaillink.github.io">emaillink.github.io</a>. Free HTML mailto link tool.</p>
            <p class="footer-legal">No data stored. Works entirely in your browser.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
