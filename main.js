/* ═══════════════════════════════════════════════════════════════
   CHIARA CORE — Main JavaScript
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── STICKY NAV ──────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ─── HAMBURGER MENU ──────────────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─── PRODUCT TABS ────────────────────────────────────────── */
  const productTabs   = document.querySelectorAll('.product-tab');
  const productPanels = document.querySelectorAll('.product-panel');

  productTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      productTabs.forEach((t) => t.classList.remove('product-tab--active'));
      productPanels.forEach((p) => p.classList.remove('product-panel--active'));

      tab.classList.add('product-tab--active');
      const panel = document.querySelector(`.product-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('product-panel--active');
    });
  });

  /* ─── SOLUTION TABS ───────────────────────────────────────── */
  const solutionTabs = document.querySelectorAll('.solution__tab');
  solutionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      solutionTabs.forEach((t) => {
        t.classList.remove('solution__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('solution__tab--active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  /* ─── SCROLL ANIMATIONS ───────────────────────────────────── */
  const animateEls = document.querySelectorAll(
    '.stats__item, .value-prop__text, .cta__text, .cta__image, .mobile-app__text, .mobile-app__image, .solution__headline, .hero__headline, .hero__sub, .hero__ctas'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    animateEls.forEach((el) => observer.observe(el));
  }

  /* ─── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile menu if open
        nav.classList.remove('open');
        if (hamburger) {
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ─── STATS COUNTER ANIMATION ─────────────────────────────── */
  function animateCounter(el, end, suffix, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = Math.round(eased * end);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const statsNumbers = document.querySelectorAll('.stats__number');
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent.trim();
            // Parse number and suffix
            const match = text.match(/^(\d+)(.*)$/);
            if (match) {
              const num = parseInt(match[1], 10);
              const suffix = match[2];
              animateCounter(el, num, suffix, 1200);
            }
            statsObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    statsNumbers.forEach((n) => {
      // Only animate simple numbers, not the "2 years" mixed one
      if (!n.classList.contains('stats__number--mixed')) {
        statsObserver.observe(n);
      }
    });
  }

})();
