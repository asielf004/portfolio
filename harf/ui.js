/* ==========================================================================
   حرف — shell behaviour: interface language and theme
   Standalone: its own storage keys, so the app no longer shares state with
   anything else on the domain.
   ========================================================================== */
(function (global) {
  'use strict';

  var root = document.documentElement;
  var STORE_LANG = 'harf-lang';
  var STORE_THEME = 'harf-theme';

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null; /* private mode */
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* the preference just won't persist */
    }
  }

  /*
   * Every translatable node carries both strings as data-ar / data-en, so
   * switching is a sweep rather than a reload. Nodes written by app.js use
   * the same convention and are picked up here for free.
   */
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
    if (toggle) toggle.setAttribute('aria-pressed', String(!isArabic));
  }

  applyLang(read(STORE_LANG) === 'en' ? 'en' : 'ar');

  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var next = root.lang === 'ar' ? 'en' : 'ar';
      applyLang(next);
      write(STORE_LANG, next);
    });
  }

  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var prefersDark = global.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';

      root.setAttribute('data-theme', next);
      write(STORE_THEME, next);
    });
  }
})(window);
