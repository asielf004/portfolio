/* ==========================================================================
   ريماس سعد — shared behaviour (language, theme, reveal, card glow)
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORE_LANG = 'rimas-lang';
  var STORE_THEME = 'rimas-theme';

  /* ---------- storage helpers (private mode can throw) ---------- */
  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* ignore — preference just won't persist */
    }
  }

  /* ---------- language ---------- */
  function applyLang(lang) {
    var isArabic = lang === 'ar';

    root.lang = lang;
    root.dir = isArabic ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-ar]').forEach(function (el) {
      var next = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (next !== null) el.textContent = next;
    });

    document.querySelectorAll('[data-ar-label]').forEach(function (el) {
      var next = isArabic
        ? el.getAttribute('data-ar-label')
        : el.getAttribute('data-en-label');
      if (next !== null) el.setAttribute('aria-label', next);
    });

    var title = document.querySelector('title');
    if (title && title.getAttribute('data-ar')) {
      document.title = isArabic
        ? title.getAttribute('data-ar')
        : title.getAttribute('data-en');
    }

    var toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.setAttribute('aria-pressed', String(isArabic));

    document.dispatchEvent(new CustomEvent('langchange'));
  }

  applyLang(read(STORE_LANG) === 'ar' ? 'ar' : 'en');

  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var next = root.lang === 'ar' ? 'en' : 'ar';
      applyLang(next);
      write(STORE_LANG, next);
    });
  }

  /* ---------- theme ---------- */
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      // Deep water is the baseline, so an unset theme means dark.
      var current = root.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';

      root.setAttribute('data-theme', next);
      write(STORE_THEME, next);
    });
  }

  /* ---------- scroll reveal ---------- */
  var targets = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) {
      el.classList.add('visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- header turns solid once the hero scrolls away ---------- */
  var header = document.querySelector('header');
  var hero = document.querySelector('.hero-liquid');

  if (header && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      function (entries) {
        header.classList.toggle('is-stuck', !entries[0].isIntersecting);
      },
      { rootMargin: '-70px 0px 0px 0px', threshold: 0 }
    ).observe(hero);
  }

  /* ---------- buttons lean towards the pointer ---------- */
  if (window.matchMedia('(hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.btn-liquid').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) / r.width;
        var dy = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.translate = (dx * 8).toFixed(2) + 'px ' + (dy * 6).toFixed(2) + 'px';
      });
      btn.addEventListener('pointerleave', function () {
        btn.style.translate = '';
      });
    });
  }

  /* ---------- project card cursor glow ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }
})();
