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

     Real lines lifted from the app's own content, typed out character by
     character. Every few lines it fumbles one key and backspaces over it,
     because a demo that never misses would not show the thing the app is
     actually for — catching the miss.
     ========================================================================== */

  var target = document.getElementById('demo-target');
  var typed = document.getElementById('demo-typed');
  var unitLabel = document.getElementById('demo-unit');
  var wpmOut = document.getElementById('stat-wpm');
  var accOut = document.getElementById('stat-acc');
  var errOut = document.getElementById('stat-err');

  if (!target || !typed) return;

  var LINES = [
    { unit: 'Everyday words',  text: 'house street city country' },
    { unit: 'Mots quotidiens', text: 'maison rue ville pays' },
    { unit: 'Study and work',  text: 'practice mistake progress result' },
    { unit: 'Mots quotidiens', text: 'heureux fatigué occupé prêt' },
    { unit: 'Everyday words',  text: 'morning evening night week' }
  ];

  var lineIndex = 0;
  var timer = null;

  function setStats(wpm, accuracy, errors) {
    if (wpmOut) wpmOut.textContent = String(wpm);
    if (accOut) accOut.innerHTML = accuracy + '<i>%</i>';
    if (errOut) errOut.textContent = String(errors);
  }

  /* Reduced motion gets the finished state instead of the performance. */
  if (reduced.matches) {
    var still = LINES[0];
    if (unitLabel) unitLabel.textContent = still.unit;
    target.textContent = still.text;
    typed.innerHTML = '<span class="ok"></span>';
    typed.firstChild.textContent = still.text;
    setStats(41, 98, 1);
    return;
  }

  function schedule(fn, delay) {
    timer = window.setTimeout(fn, delay);
  }

  /* A little jitter on every keystroke — a perfectly even cadence reads as a
     progress bar rather than as someone typing. The range averages ~205ms,
     which lands the readout around 58 WPM: brisk, but a speed a person can
     actually reach, which is the whole point of showing it. */
  function keyDelay() {
    return 150 + Math.random() * 110;
  }

  function runLine() {
    var line = LINES[lineIndex];
    var text = line.text;

    if (unitLabel) unitLabel.textContent = line.unit;
    target.textContent = text;
    typed.innerHTML = '<span class="caret"></span>';

    var caret = typed.querySelector('.caret');
    var position = 0;
    var errors = 0;
    var keystrokes = 0;
    var started = 0;
    // One deliberate fumble per line, never on the first character.
    var slipAt = 3 + Math.floor(Math.random() * Math.max(1, text.length - 6));
    var slipDone = false;

    function paint(char, correct) {
      var span = document.createElement('span');
      span.className = correct ? 'ok' : 'bad';
      span.textContent = char;
      typed.insertBefore(span, caret);
    }

    function refresh() {
      var minutes = (Date.now() - started) / 60000;
      // The standard: five keystrokes to a word.
      var wpm = minutes > 0 ? Math.round((position / 5) / minutes) : 0;
      var accuracy = keystrokes > 0
        ? Math.max(0, Math.round(((keystrokes - errors) / keystrokes) * 100))
        : 100;
      setStats(Math.min(wpm, 120), accuracy, errors);
    }

    function step() {
      if (!started) started = Date.now();

      if (position >= text.length) {
        refresh();
        // Hold the finished line, then move on.
        schedule(function () {
          lineIndex = (lineIndex + 1) % LINES.length;
          runLine();
        }, 2200);
        return;
      }

      // The fumble: type a wrong character, pause, then backspace it away.
      if (!slipDone && position === slipAt) {
        slipDone = true;
        keystrokes++;
        errors++;
        paint(wrongCharFor(text[position]), false);
        refresh();

        schedule(function () {
          var stray = caret.previousSibling;
          if (stray) typed.removeChild(stray);
          schedule(step, 130);
        }, 340);
        return;
      }

      paint(text[position], true);
      position++;
      keystrokes++;
      refresh();
      schedule(step, keyDelay());
    }

    schedule(step, 420);
  }

  /* A neighbouring key makes a more believable typo than a random letter. */
  function wrongCharFor(char) {
    var NEIGHBOURS = {
      a: 's', b: 'v', c: 'x', d: 'f', e: 'r', f: 'g', g: 'h', h: 'j',
      i: 'o', j: 'k', k: 'l', l: 'k', m: 'n', n: 'm', o: 'p', p: 'o',
      q: 'w', r: 't', s: 'd', t: 'y', u: 'i', v: 'b', w: 'e', x: 'c',
      y: 'u', z: 'x', ' ': 'n'
    };
    var lower = char.toLowerCase();
    return NEIGHBOURS[lower] || 'e';
  }

  /* Pause while the hero is off-screen — an animation nobody is looking at is
     just battery. */
  var demo = document.querySelector('.demo');
  if (demo && 'IntersectionObserver' in window) {
    var running = false;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !running) {
          running = true;
          runLine();
        } else if (!entry.isIntersecting && running) {
          running = false;
          window.clearTimeout(timer);
        }
      });
    }, { threshold: 0.25 }).observe(demo);
  } else {
    runLine();
  }
})();
