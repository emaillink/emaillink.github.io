// ── Mailto Generator Core ──────────────────────────────────────────────────
const state = {
  to: '', cc: '', bcc: '', subject: '', body: '',
  linkText: 'Send us an email',
  btnBg: '#e8612c', btnTxt: '#ffffff',
  style: 'text', openTracking: false,
};

function encodeMailto() {
  const params = [];
  if (state.cc)      params.push('cc='      + encodeURIComponent(state.cc));
  if (state.bcc)     params.push('bcc='     + encodeURIComponent(state.bcc));
  if (state.subject) params.push('subject=' + encodeURIComponent(state.subject));
  if (state.body)    params.push('body='    + encodeURIComponent(state.body));
  const query = params.length ? '?' + params.join('&') : '';
  return `mailto:${state.to}${query}`;
}

function buildHTML() {
  const href = encodeMailto();
  const text = state.linkText || 'Email Us';
  if (state.style === 'button') {
    return `<a href="${href}" style="display:inline-block;padding:12px 24px;background:${state.btnBg};color:${state.btnTxt};text-decoration:none;border-radius:6px;font-family:sans-serif;font-weight:600;">${text}</a>`;
  }
  return `<a href="${href}">${text}</a>`;
}

function updateOutputs() {
  const html = buildHTML();
  const href = encodeMailto();

  document.getElementById('out-html').textContent  = html;
  document.getElementById('out-href').textContent  = href;
  document.getElementById('out-plain').textContent = href;

  // Live preview
  document.getElementById('link-preview').innerHTML = html;

  // Character count
  document.getElementById('char-count').textContent = href.length + ' chars';
  updateValidation();
}

function updateValidation() {
  const email = state.to;
  const badge = document.getElementById('valid-badge');
  if (!email) { badge.textContent = ''; badge.className = 'valid-badge'; return; }
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  badge.textContent = valid ? '✓ Valid email' : '✗ Invalid email';
  badge.className = 'valid-badge ' + (valid ? 'valid' : 'invalid');
}

function bindInputs() {
  const map = {
    'inp-to':      'to',
    'inp-cc':      'cc',
    'inp-bcc':     'bcc',
    'inp-subject': 'subject',
    'inp-body':    'body',
    'inp-text':    'linkText',
    'inp-btnbg':   'btnBg',
    'inp-btntxt':  'btnTxt',
  };
  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => { state[key] = el.value; updateOutputs(); });
  });

  // Style radio
  document.querySelectorAll('input[name="link-style"]').forEach(r => {
    r.addEventListener('change', () => {
      state.style = r.value;
      const btnOpts = document.getElementById('btn-options');
      if (btnOpts) btnOpts.style.display = r.value === 'button' ? 'grid' : 'none';
      updateOutputs();
    });
  });
}

// ── Copy Buttons ───────────────────────────────────────────────────────────
function setupCopy() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.copy;
      const text = document.getElementById(targetId)?.textContent?.trim();
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
      } catch {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    });
  });
}

// ── Tab Switcher (output tabs) ─────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      document.querySelectorAll(`.tab-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`.tab-panel[data-group="${group}"]`).forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target)?.classList.add('active');
    });
  });
}

// ── Advanced Toggle ────────────────────────────────────────────────────────
function setupAdvanced() {
  const toggle = document.getElementById('advanced-toggle');
  const panel  = document.getElementById('advanced-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.textContent = open ? '− Hide advanced options' : '+ Show advanced options (CC, BCC, Body)';
      toggle.setAttribute('aria-expanded', open);
    });
  }
}

// ── Clear Button ───────────────────────────────────────────────────────────
function setupClear() {
  document.getElementById('btn-clear')?.addEventListener('click', () => {
    ['inp-to','inp-cc','inp-bcc','inp-subject','inp-body','inp-text'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.value = ''; }
    });
    Object.assign(state, { to:'', cc:'', bcc:'', subject:'', body:'', linkText:'Send us an email' });
    updateOutputs();
  });
}

// ── Scroll Animations ─────────────────────────────────────────────────────
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .slide-up, .stagger-child').forEach(el => observer.observe(el));
}

// ── Counter Animation ─────────────────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

function setupCounterObserver() {
  const section = document.querySelector('.stats-section');
  if (!section) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(section);
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────
function setupFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open);
      if (a) a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
    });
  });
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  bindInputs();
  setupCopy();
  setupTabs();
  setupAdvanced();
  setupClear();
  setupScrollAnimations();
  setupCounterObserver();
  setupFAQ();
  updateOutputs();
});
