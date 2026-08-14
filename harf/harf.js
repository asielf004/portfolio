/* ==========================================================================
   حرف / Harf — landing page behaviour
   Language toggle, theme toggle, scroll reveals, and the hero demo that
   re-enacts the app's core loop: a line, typed one character at a time.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------------- storage
     Private mode throws on both reads and writes, so every call is wrapped
     and the page simply carries on with the default. */
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* nothing to do */ }
  }

  /* ------------------------------------------------------------- language
     The same data-ar / data-en contract the app uses, so a string only ever
     lives in the markup — never duplicated in here. */
  function applyLang(lang) {
    var isAr = lang === 'ar';
    root.lang = lang;
    root.dir = isAr ? 'rtl' : 'ltr';

    var textKey = isAr ? 'ar' : 'en';
    var labelKey = isAr ? 'arLabel' : 'enLabel';

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-ar], [data-en]'),
      function (node) {
        var value = node.dataset[textKey];
        if (value != null) node.textContent = value;
      }
    );

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-ar-label], [data-en-label]'),
      function (node) {
        var value = node.dataset[labelKey];
        if (value != null) node.setAttribute('aria-label', value);
      }
    );

    write('rimas-lang', lang);
  }

  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(root.lang === 'ar' ? 'en' : 'ar');
    });
  }

  // The inline head script already set lang/dir; this fills in the text.
  applyLang(root.lang === 'en' ? 'en' : 'ar');

  /* ---------------------------------------------------------------- theme */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    write('rimas-theme', theme);
  }

  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      // Nothing stored yet means the page is showing its dark default.
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  /* --------------------------------------------------------- sticky header */
  var head = document.getElementById('head');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------------------------------------------------------- scroll reveals */
  var reveals = document.querySelectorAll('.reveal');

  if (reduced.matches || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (node) {
      node.classList.add('is-in');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          // Stagger siblings so a row arrives as a row, not all at once.
          var siblings = entry.target.parentElement
            ? Array.prototype.indexOf.call(
                entry.target.parentElement.children, entry.target)
            : 0;
          entry.target.style.transitionDelay = Math.min(siblings, 5) * 80 + 'ms';
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    Array.prototype.forEach.call(reveals, function (node) {
      observer.observe(node);
    });
  }

  /* ==========================================================================
     Hero demo

     يعيد تمثيل حلقة القارئ نفسها: يظهر السطر الإنجليزي، ثم ينزل معناه
     بالعربي تحته، ثم تُضغط كلمة مشروحة فيطلع معناها. لا وصف للمنتج — بل
     المنتج نفسه مصغّرًا.
     ========================================================================== */

  var enOut = document.getElementById('demo-en');
  var arOut = document.getElementById('demo-ar');
  var glossBox = document.getElementById('demo-gloss');
  var glossW = document.getElementById('demo-gloss-w');
  var glossM = document.getElementById('demo-gloss-m');
  var unitOut = document.getElementById('demo-unit');
  var numOut = document.getElementById('demo-n');

  if (!enOut || !arOut) return;

  var AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  var LINES = [
    {
      unit: 'Coffee Breath', n: 1,
      en: 'The smell of coffee wakes the whole house.',
      ar: 'رائحة القهوة تُوقظ البيت كله.',
      word: 'wakes', mean: 'تُوقظ'
    },
    {
      unit: 'Coffee Breath', n: 3,
      en: 'She never measured anything.',
      ar: 'لم تكن تقيس أي شيء أبدًا.',
      word: 'measured', mean: 'تقيس'
    },
    {
      unit: 'The Lighthouse', n: 4,
      en: 'Keepers lived alone for months on bare rock.',
      ar: 'عاش الحرّاس وحدهم شهورًا على صخر عارٍ.',
      word: 'bare', mean: 'عارٍ'
    },
    {
      unit: 'Seahorses', n: 2,
      en: 'It swims upright, very slowly.',
      ar: 'يسبح منتصبًا، ببطء شديد.',
      word: 'upright', mean: 'منتصبًا'
    }
  ];

  var idx = 0;
  var timer = null;

  function paintLine(line) {
    enOut.innerHTML = line.en.split(/(\s+)/).map(function (tok) {
      if (/^\s+$/.test(tok)) return tok;
      var bare = tok.replace(/[^A-Za-z'-]/g, '');
      var isTarget = bare.toLowerCase() === line.word.toLowerCase();
      return '<span class="w' + (isTarget ? ' gl js-target' : '') + '">' + tok + '</span>';
    }).join('');
  }

  function schedule(fn, ms) { timer = window.setTimeout(fn, ms); }

  /* الحركة المختصرة تعرض الحالة النهائية بدل التمثيل. */
  if (reduced.matches) {
    var still = LINES[0];
    if (unitOut) unitOut.textContent = still.unit;
    if (numOut) numOut.textContent = AR_DIGITS[still.n];
    paintLine(still);
    arOut.textContent = still.ar;
    arOut.classList.add('is-in');
    glossW.textContent = still.word;
    glossM.textContent = still.mean;
    glossBox.classList.add('is-in');
    return;
  }

  function runLine() {
    var line = LINES[idx];

    if (unitOut) unitOut.textContent = line.unit;
    if (numOut) numOut.textContent = AR_DIGITS[line.n];

    arOut.classList.remove('is-in');
    glossBox.classList.remove('is-in');
    paintLine(line);

    // السطر يظهر، ثم معناه، ثم تُضغط الكلمة — بفواصل تكفي للقراءة فعلًا.
    schedule(function () {
      arOut.textContent = line.ar;
      arOut.classList.add('is-in');

      schedule(function () {
        var target = enOut.querySelector('.js-target');
        if (target) target.classList.add('is-tapped');
        glossW.textContent = line.word;
        glossM.textContent = line.mean;
        glossBox.classList.add('is-in');

        schedule(function () {
          if (target) target.classList.remove('is-tapped');
          idx = (idx + 1) % LINES.length;
          runLine();
        }, 2600);
      }, 1500);
    }, 1400);
  }

  /* يتوقّف العرض وقت ما يخرج من الشاشة — حركة ما أحد يشوفها بطارية مهدورة. */
  var demo = document.querySelector('.demo');
  if (demo && 'IntersectionObserver' in window) {
    var running = false;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !running) { running = true; runLine(); }
        else if (!entry.isIntersecting && running) { running = false; window.clearTimeout(timer); }
      });
    }, { threshold: 0.25 }).observe(demo);
  } else {
    runLine();
  }
})();
