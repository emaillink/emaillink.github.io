class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header" id="site-header">
        <nav class="nav-container">
          <a href="/" class="logo" aria-label="EmailLink Generator Home">
            <span class="logo-icon">✉</span>
            <span class="logo-text">Email<strong>Link</strong></span>
          </a>
          <ul class="nav-links" id="nav-links">
            <li><a href="/#generator" class="nav-link">Generator</a></li>
            <li><a href="/#how-it-works" class="nav-link">How It Works</a></li>
            <li><a href="/#features" class="nav-link">Features</a></li>
            <li><a href="/#guide" class="nav-link">Guide</a></li>
            <li><a href="/#faq" class="nav-link">FAQ</a></li>
            <li><a href="/#generator" class="nav-cta">Create Link Free</a></li>
          </ul>
          <button class="hamburger" id="hamburger" aria-label="Toggle navigation" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>
    `;

    this.setupScrollBehavior();
    this.setupMobileMenu();
    this.setupSmoothScroll();
  }

  setupScrollBehavior() {
    const header = this.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  setupMobileMenu() {
    const hamburger = this.querySelector('#hamburger');
    const navLinks = this.querySelector('#nav-links');
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  setupSmoothScroll() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const headerH = this.querySelector('.site-header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }
}

customElements.define('site-header', SiteHeader);
