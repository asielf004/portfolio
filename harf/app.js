/* ==========================================================================
   Line by Line — page behaviour
   Pages announce themselves with <body data-page="sections|practice|progress">.
   Interface language follows the portfolio toggle (html[lang]); the language
   being *practised* is separate and lives in the URL + the store.
   ========================================================================== */
(function () {
  'use strict';

  var C = window.LBL_CONTENT;
  var S = window.LBL_STORE;
  var V = window.LBL_SPEECH;
  var K = window.LBL_KEYSOUND;
  var root = document.documentElement;

  /* -------------------------------------------------------------- helpers */

  function isArabic() {
    return root.lang !== 'en';
  }

  /* Pick the string for the current interface language. */
  function t(ar, en) {
    return isArabic() ? ar : en;
  }

  /* Create an element; `text` pairs stay translatable by the shared toggle. */
  function el(tag, className, ar, en) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (ar !== undefined) {
      node.setAttribute('data-ar', ar);
      node.setAttribute('data-en', en === undefined ? ar : en);
      node.textContent = t(ar, en === undefined ? ar : en);
    }
    return node;
  }

  function qs(name, fallback) {
    var value = new URLSearchParams(window.location.search).get(name);
    return value === null || value === '' ? fallback : value;
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function minutes(ms) {
    return ms / 60000;
  }

  /*
   * Arabic counts do not take one plural form: 1 is singular, 2 is dual,
   * 3–10 takes the plural, and 11+ goes back to a singular accusative.
   * `forms` = [singular, dual, plural, accusative].
   */
  function countAr(n, forms) {
    if (n === 2) return forms[1];          /* the dual already says "two" */
    if (n === 0) return n + ' ' + forms[2];
    if (n === 1) return n + ' ' + forms[0];
    if (n % 100 >= 3 && n % 100 <= 10) return n + ' ' + forms[2];
    if (n % 100 > 10 || n % 100 === 0) return n + ' ' + forms[3];
    return n + ' ' + forms[2];
  }

  var LINES_AR = ['سطر', 'سطران', 'أسطر', 'سطرًا'];
  var DAYS_AR = ['يوم', 'يومان', 'أيام', 'يومًا'];
  var LETTERS_AR = ['حرف', 'حرفان', 'أحرف', 'حرفًا'];
  var WORDS_AR = ['كلمة', 'كلمتان', 'كلمات', 'كلمة'];
  var ERRORS_AR = ['خطأ', 'خطآن', 'أخطاء', 'خطأً'];
  var UNITS_AR = ['وحدة', 'وحدتان', 'وحدات', 'وحدة'];
  var SESSIONS_AR = ['جلسة', 'جلستان', 'جلسات', 'جلسة'];

  /* countAr in Arabic, plain "n word/words" in English. */
  function count(n, forms, oneEn, manyEn) {
    if (isArabic()) return countAr(n, forms);
    return n + ' ' + (n === 1 ? oneEn : manyEn === undefined ? oneEn + 's' : manyEn);
  }

  function fmtDuration(ms) {
    var total = Math.round(ms / 1000);
    var m = Math.floor(total / 60);
    var s = total % 60;
    return m + ':' + (s < 10 ? '0' + s : s);
  }

  var ICONS = {
    letters: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19 9.5 5 15 19M6 14.5h7" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 19v-6.5a2.5 2.5 0 0 0-5 0" stroke-linecap="round"/></svg>',
    numbers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16" stroke-linecap="round"/></svg>',
    words: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h11M4 18h7" stroke-linecap="round"/></svg>',
    sentences: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="3"/><path d="M7 9h10M7 13h6" stroke-linecap="round"/><path d="m8 18-1 3 4-3" stroke-linejoin="round"/></svg>',
    grammar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5Z" stroke-linejoin="round"/><path d="M8 8h7M8 12h5" stroke-linecap="round"/></svg>',
    speed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17a8 8 0 1 1 16 0" stroke-linecap="round"/><path d="m12 17 4-5" stroke-linecap="round"/><circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none"/></svg>',
    mistakes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3 19h18Z" stroke-linejoin="round"/><path d="M12 10v4M12 16.5v.5" stroke-linecap="round"/></svg>'
  };

  function icon(name) {
    var box = document.createElement('span');
    box.className = 'card-icon';
    box.innerHTML = ICONS[name] || ICONS.words;
    return box;
  }

  /* -------------------------------------------------- practice-language bar */

  /*
   * The EN / FR switch. Changing it rewrites ?lang= and reloads so every
   * section, unit and mistake list on the page follows the new language.
   */
  function buildLangSwitch(current) {
    var wrap = document.createElement('div');
    wrap.className = 'switch';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('data-ar-label', 'لغة التدريب');
    wrap.setAttribute('data-en-label', 'Practice language');
    wrap.setAttribute('aria-label', t('لغة التدريب', 'Practice language'));

    ['en', 'fr'].forEach(function (id) {
      var lang = C.langs[id];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = lang.native;
      btn.setAttribute('aria-pressed', String(id === current));
      btn.addEventListener('click', function () {
        if (id === current) return;
        S.setLang(id);
        var url = new URL(window.location.href);
        url.searchParams.set('lang', id);
        url.searchParams.delete('unit');
        url.searchParams.delete('section');
        window.location.href = url.toString();
      });
      wrap.appendChild(btn);
    });

    return wrap;
  }

  function buildStatusChips(state) {
    var wrap = document.createElement('div');
    wrap.className = 'chips';

    var st = S.streak(state);
    var today = state.days[S.dayKey()] || S.emptyDay();

    wrap.appendChild(
      chip(
        t('الستريك', 'streak'),
        count(st.current, DAYS_AR, 'day'),
        st.current > 0 ? 'is-hot' : '',
        st.current > 0 ? '🔥' : '·'
      )
    );
    wrap.appendChild(
      chip(t('اليوم', 'today'), today.lines + ' / ' + state.goal + ' ' + t('سطر', 'lines'))
    );
    wrap.appendChild(chip(t('أفضل سرعة اليوم', 'best today'), today.bestWpm + ' wpm'));

    return wrap;
  }

  /* Reads "label value" — "الستريك 3 أيام", "streak 3 days". */
  function chip(label, value, extra, mark) {
    var node = document.createElement('span');
    node.className = 'chip' + (extra ? ' ' + extra : '');
    if (mark) node.appendChild(document.createTextNode(mark + ' '));

    var text = document.createElement('span');
    text.textContent = label + ' ';
    node.appendChild(text);

    var strong = document.createElement('b');
    strong.textContent = String(value);
    node.appendChild(strong);

    return node;
  }

  /* ====================================================================== */
  /*  SECTIONS PAGE                                                          */
  /* ====================================================================== */

  function renderSections() {
    var state = S.load();
    var lang = qs('lang', state.lang || 'en');
    if (!C.langs[lang]) lang = 'en';

    var bar = document.getElementById('toolbar');
    bar.textContent = '';
    bar.appendChild(buildLangSwitch(lang));
    bar.appendChild(buildStatusChips(state));

    var grid = document.getElementById('grid');
    grid.textContent = '';

    C.sections.forEach(function (section) {
      grid.appendChild(sectionCard(section, lang, state));
    });
    grid.appendChild(mistakesCard(lang, state));
  }

  function sectionCard(section, lang, state) {
    var units = C.getUnits(lang, section.id);
    var totalLines = C.countLines(lang, section.id);
    var doneLines = Math.min(S.sectionLines(state, lang, section.id), totalLines);
    var pct = totalLines ? Math.round((doneLines / totalLines) * 100) : 0;

    var card = document.createElement('article');
    card.className = 'card';

    var head = document.createElement('div');
    head.className = 'card-head';
    head.appendChild(icon(section.icon));
    head.appendChild(el('h3', null, section.ar, section.en));
    card.appendChild(head);

    card.appendChild(el('p', null, section.descAr, section.descEn));

    card.appendChild(meter(pct));
    var label = document.createElement('div');
    label.className = 'meter-label';
    label.appendChild(
      textSpan(
        count(units.length, UNITS_AR, 'unit') + ' · ' + count(totalLines, LINES_AR, 'line')
      )
    );
    label.appendChild(textSpan(pct + '%'));
    card.appendChild(label);

    var details = document.createElement('details');
    details.className = 'more';
    var summary = el('summary', null, 'اعرض الوحدات', 'Show units');
    details.appendChild(summary);

    var list = document.createElement('ul');
    list.className = 'units';
    units.forEach(function (unit) {
      list.appendChild(unitRow(unit, section, lang, state));
    });
    details.appendChild(list);
    card.appendChild(details);

    return card;
  }

  function unitRow(unit, section, lang, state) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.href =
      'practice.html?lang=' + lang + '&section=' + section.id + '&unit=' + unit.id;

    var name = document.createElement('span');
    name.setAttribute('data-ar', unit.ar);
    name.setAttribute('data-en', unit.en);
    name.textContent = t(unit.ar, unit.en);
    link.appendChild(name);

    var saved = state.units[lang + '/' + section.id + '/' + unit.id];
    var meta = document.createElement('span');
    meta.className = 'unit-meta';
    if (saved && saved.lines >= unit.lines.length) {
      meta.classList.add('is-done');
      meta.textContent = saved.bestWpm ? saved.bestWpm + ' wpm ' : '';
    } else if (saved) {
      meta.textContent = saved.lines + '/' + unit.lines.length;
    } else if (unit.timed) {
      meta.textContent = unit.timed + 's';
    } else {
      meta.textContent = count(unit.lines.length, LINES_AR, 'line');
    }
    link.appendChild(meta);

    li.appendChild(link);
    return li;
  }

  /* The seventh card: drill built from the mistakes you actually made. */
  function mistakesCard(lang, state) {
    var chars = S.topMistakes(state, lang, 12);
    var words = S.topWordMistakes(state, lang, 12);
    var total = chars.length + words.length;

    var card = document.createElement('article');
    card.className = 'card';

    var head = document.createElement('div');
    head.className = 'card-head';
    head.appendChild(icon('mistakes'));
    head.appendChild(el('h3', null, 'أخطائي', 'My mistakes'));
    card.appendChild(head);

    card.appendChild(
      el(
        'p',
        null,
        'تدريب يُبنى تلقائيًا من الأحرف والكلمات التي تخطئ فيها أكثر.',
        'A drill built automatically from the letters and words you miss most.'
      )
    );

    var label = document.createElement('div');
    label.className = 'meter-label';
    label.appendChild(
      textSpan(
        total
          ? count(chars.length, LETTERS_AR, 'letter') + ' · ' +
              count(words.length, WORDS_AR, 'word')
          : t('لا أخطاء مسجّلة بعد', 'No mistakes recorded yet')
      )
    );
    card.appendChild(label);

    var actions = document.createElement('div');
    actions.className = 'actions';
    actions.style.justifyContent = 'flex-start';

    if (total) {
      var go = el('a', 'btn btn-primary', 'درّب أخطائي', 'Drill my mistakes');
      go.href = 'practice.html?lang=' + lang + '&section=mistakes&unit=auto';
      actions.appendChild(go);
    }

    var stats = el('a', 'btn', 'كل الأخطاء', 'All mistakes');
    stats.href = 'progress.html?lang=' + lang + '#mistakes';
    actions.appendChild(stats);

    card.appendChild(actions);
    return card;
  }

  function meter(pct) {
    var box = document.createElement('div');
    box.className = 'meter';
    box.setAttribute('role', 'progressbar');
    box.setAttribute('aria-valuenow', String(pct));
    box.setAttribute('aria-valuemin', '0');
    box.setAttribute('aria-valuemax', '100');
    var fill = document.createElement('span');
    fill.style.width = pct + '%';
    box.appendChild(fill);
    return box;
  }

  function textSpan(text) {
    var node = document.createElement('span');
    node.textContent = text;
    return node;
  }

  /* ====================================================================== */
  /*  PRACTICE PAGE                                                          */
  /* ====================================================================== */

  /* Build the lines for a "my mistakes" run out of recorded errors. */
  function buildMistakeUnit(lang, state) {
    /* Space and overflow markers are not letters you can drill on their own. */
    var chars = S.topMistakes(state, lang, 12)
      .map(function (m) {
        return m.value;
      })
      .filter(function (ch) {
        return ch.trim() !== '' && ch !== '⏎';
      })
      .slice(0, 10);

    var words = S.topWordMistakes(state, lang, 15).map(function (m) {
      return m.value;
    });

    var lines = [];
    for (var i = 0; i < chars.length; i += 5) {
      var group = chars.slice(i, i + 5);
      lines.push(
        group
          .map(function (ch) {
            return ch + ch + ch;
          })
          .join(' ')
      );
    }
    for (var w = 0; w < words.length; w += 5) {
      lines.push(words.slice(w, w + 5).join(' '));
    }

    return {
      id: 'auto',
      ar: 'تدريب أخطائي',
      en: 'My mistakes drill',
      ruleAr: 'هذه الأسطر مبنية من أكثر الأحرف والكلمات التي أخطأت فيها. كرّرها ببطء ودقّة.',
      ruleEn: 'These lines come from the letters and words you miss most. Take them slowly and accurately.',
      lines: lines
    };
  }

  function renderPractice() {
    var state = S.load();
    var lang = qs('lang', state.lang || 'en');
    if (!C.langs[lang]) lang = 'en';

    var sectionId = qs('section', 'letters');
    var unitId = qs('unit', '');

    var section = C.getSection(sectionId);
    var unit;

    if (sectionId === 'mistakes') {
      section = {
        id: 'mistakes',
        ar: 'أخطائي',
        en: 'My mistakes',
        icon: 'mistakes'
      };
      unit = buildMistakeUnit(lang, state);
    } else {
      if (!section) {
        section = C.sections[0];
        sectionId = section.id;
      }
      unit = C.getUnit(lang, sectionId, unitId);
    }

    if (!unit || !unit.lines.length) {
      showEmptyPractice(lang);
      return;
    }

    /* Header text */
    setPair(document.getElementById('unit-title'), unit.ar, unit.en);
    setPair(
      document.getElementById('crumb'),
      C.langs[lang].ar + ' · ' + section.ar,
      C.langs[lang].native + ' · ' + section.en
    );

    var ruleBox = document.getElementById('rule-note');
    if (unit.ruleAr) {
      setPair(ruleBox, unit.ruleAr, unit.ruleEn || unit.ruleAr);
      ruleBox.hidden = false;
    } else {
      ruleBox.hidden = true;
    }

    document.getElementById('back-link').href = 'index.html?lang=' + lang;

    startEngine({
      lang: lang,
      section: section,
      unit: unit,
      timed: unit.timed || 0
    });
  }

  function setPair(node, ar, en) {
    if (!node) return;
    node.setAttribute('data-ar', ar);
    node.setAttribute('data-en', en);
    node.textContent = t(ar, en);
  }

  function showEmptyPractice(lang) {
    var stage = document.getElementById('stage');
    stage.textContent = '';
    var msg = el(
      'p',
      'empty',
      'لا توجد أسطر في هذه الوحدة بعد. ارجع واختر وحدة أخرى.',
      'This unit has no lines yet. Go back and pick another one.'
    );
    stage.appendChild(msg);
    var actions = document.createElement('div');
    actions.className = 'actions';
    var back = el('a', 'btn btn-primary', 'رجوع للأقسام', 'Back to sections');
    back.href = 'index.html?lang=' + lang;
    actions.appendChild(back);
    stage.appendChild(actions);
  }

  /* ---------------------------------------------------------- typing engine */

  function startEngine(config) {
    var lines = config.unit.lines.slice();
    var field = document.getElementById('field');
    var lineBox = document.getElementById('line');
    var dots = document.getElementById('dots');
    var accents = document.getElementById('accents');
    var stage = document.getElementById('stage');
    var summary = document.getElementById('summary');

    var srLine = document.getElementById('line-sr');
    var speechBar = document.getElementById('sound-bar');
    var speakBtn = document.getElementById('speak-line');
    var speechToggle = document.getElementById('speech-toggle');
    var rateBtn = document.getElementById('speech-rate');
    var keysBtn = document.getElementById('keys-toggle');
    var elWpm = document.getElementById('stat-wpm');
    var elAcc = document.getElementById('stat-acc');
    var elErr = document.getElementById('stat-err');
    var elLine = document.getElementById('stat-line');
    var elTime = document.getElementById('stat-time');

    var run = {
      index: 0,
      typedLen: 0,
      keystrokes: 0,
      correctKeystrokes: 0,
      errors: 0,
      linesDone: 0,
      startedAt: 0,
      elapsed: 0,
      charErrors: {},
      wordErrors: {},
      finished: false
    };

    var ticker = null;

    /* --- accent helper row (French) --- */
    var accentList = C.langs[config.lang].accents || [];
    if (accentList.length) {
      accentList.forEach(function (ch) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = ch;
        btn.setAttribute('tabindex', '-1');
        /* Keep the caret in the field: without this the input blurs on
           mousedown and the button steals focus mid-line. */
        btn.addEventListener('mousedown', function (e) {
          e.preventDefault();
        });
        btn.addEventListener('click', function () {
          field.value += ch;
          field.focus();
          onInput();
        });
        accents.appendChild(btn);
      });
      accents.hidden = false;
    }

    /* --- pronunciation --- */
    var speech = S.load().speech;
    var RATES = [0.6, 0.9, 1.2];

    K.setEnabled(speech.keys);

    if (K.supported && keysBtn) {
      /* Key clicks work even where no speech voices exist, so the row is
         shown on their account alone. */
      speechBar.hidden = false;
      paintKeysControl();
      keysBtn.addEventListener('click', function () {
        speech.keys = !speech.keys;
        K.setEnabled(speech.keys);
        S.setSpeech({ keys: speech.keys });
        paintKeysControl();
        if (speech.keys) K.key();
        field.focus();
      });
    } else if (keysBtn) {
      keysBtn.hidden = true;
    }

    if (!V.supported) {
      [speechToggle, speakBtn, rateBtn].forEach(function (btn) {
        if (btn) btn.hidden = true;
      });
    }

    function paintKeysControl() {
      if (!keysBtn) return;
      keysBtn.setAttribute('aria-pressed', String(speech.keys));
      setPair(
        keysBtn.querySelector('.keys-label'),
        speech.keys ? 'صوت المفاتيح' : 'المفاتيح صامتة',
        speech.keys ? 'Key sounds' : 'Keys muted'
      );
    }

    if (V.supported) {
      V.setLang(config.lang);
      V.setRate(speech.rate);
      speechBar.hidden = false;
      paintSpeechControls();

      /*
       * Browsers refuse speech until the user has interacted with the page,
       * and arriving here by clicking a link on the previous page does not
       * count. Read the opening line on the first gesture instead of losing
       * it to a silent refusal.
       */
      document.addEventListener('pointerdown', function onFirst() {
        document.removeEventListener('pointerdown', onFirst);
        if (!run.keystrokes && !run.finished) sayLineSoon();
      });

      if (!V.hasVoiceFor(config.lang)) {
        var warn = document.getElementById('sound-warn');
        if (warn) {
          setPair(
            warn,
            'ما فيه صوت ' + C.langs[config.lang].ar + ' مثبّت على جهازك، فقد يُنطق النص بصوت لغة أخرى.',
            'No ' + C.langs[config.lang].native + ' voice is installed on this device, so the text may be read in another language.'
          );
          warn.hidden = false;
        }
      }

      speechToggle.addEventListener('click', function () {
        speech.enabled = !speech.enabled;
        S.setSpeech({ enabled: speech.enabled });
        if (!speech.enabled) V.cancel();
        paintSpeechControls();
        field.focus();
      });

      rateBtn.addEventListener('click', function () {
        var next = RATES[(RATES.indexOf(speech.rate) + 1) % RATES.length];
        if (next === undefined) next = RATES[1];
        speech.rate = next;
        V.setRate(next);
        S.setSpeech({ rate: next });
        paintSpeechControls();
        V.speak(target());
        field.focus();
      });

      speakBtn.addEventListener('click', function () {
        /* Deliberate replay: works even with automatic reading switched off. */
        V.speak(target());
        field.focus();
      });
    }

    function paintSpeechControls() {
      speechToggle.setAttribute('aria-pressed', String(speech.enabled));
      setPair(
        speechToggle.querySelector('.speech-label'),
        speech.enabled ? 'النطق يعمل' : 'النطق متوقف',
        speech.enabled ? 'Sound on' : 'Sound off'
      );
      speechBar.classList.toggle('is-muted', !speech.enabled);

      var labels = { 0.6: ['بطيء', 'Slow'], 0.9: ['عادي', 'Normal'], 1.2: ['سريع', 'Fast'] };
      var pair = labels[speech.rate] || labels[0.9];
      setPair(rateBtn.querySelector('.rate-label'), pair[0], pair[1]);
    }

    var lineSpeechTimer = null;

    /*
     * Read the whole line, but only after a beat: a line change follows the
     * last word of the previous line, and speaking immediately would cut that
     * word off mid-sound. Typing cancels the pending read.
     */
    function sayLineSoon() {
      if (lineSpeechTimer) clearTimeout(lineSpeechTimer);
      if (!speech.enabled) return;
      lineSpeechTimer = setTimeout(function () {
        lineSpeechTimer = null;
        V.speak(target());
      }, 700);
    }

    function stopPendingLineSpeech() {
      if (lineSpeechTimer) {
        clearTimeout(lineSpeechTimer);
        lineSpeechTimer = null;
      }
    }

    /* The word that ends immediately before `pos` in `text`. */
    function wordEndingAt(text, pos) {
      var end = pos;
      while (end > 0 && !/\S/.test(text.charAt(end - 1))) end--;
      var start = end;
      while (start > 0 && /\S/.test(text.charAt(start - 1))) start--;
      /* Punctuation is spelled out by some voices — strip the edges. */
      return text.slice(start, end).replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
    }

    /*
     * Pronounce a word the moment it is finished — the target word, not what
     * was typed, so a typo still teaches the right sound.
     */
    function speakFinishedWord(text, from, to) {
      if (!speech.enabled) return;
      for (var i = from; i < to && i <= text.length; i++) {
        var atBoundary = i === text.length - 1 || !/\S/.test(text.charAt(i));
        if (!atBoundary) continue;
        var word = wordEndingAt(text, i === text.length - 1 ? text.length : i);
        if (word) V.speak(word);
        return;
      }
    }

    /* --- rendering --- */
    function target() {
      return lines[run.index % lines.length];
    }

    function paint() {
      var text = target();
      var typed = field.value;
      lineBox.textContent = '';

      for (var i = 0; i < text.length; i++) {
        var span = document.createElement('span');
        span.className = 'ch';
        var ch = text.charAt(i);
        if (ch === ' ') {
          span.classList.add('is-space');
          span.textContent = ' ';
        } else {
          span.textContent = ch;
        }
        if (i < typed.length) {
          span.classList.add(typed.charAt(i) === ch ? 'done' : 'wrong');
        } else if (i === typed.length) {
          span.classList.add('at');
        }
        lineBox.appendChild(span);
      }

      /* Anything typed past the end of the line is shown as an overflow error. */
      if (typed.length > text.length) {
        var extra = document.createElement('span');
        extra.className = 'ch wrong';
        extra.textContent = typed.slice(text.length);
        lineBox.appendChild(extra);
      }
    }

    /* Screen readers get the line once, when it changes — not per keystroke. */
    function announce() {
      if (srLine) srLine.textContent = target();
      /* Hear the whole line first; typing the first key cuts it off so the
         per-word reading can take over without the two overlapping. */
      sayLineSoon();
    }

    function paintDots() {
      dots.textContent = '';
      var count = config.timed ? Math.max(lines.length, run.linesDone + 1) : lines.length;
      for (var i = 0; i < count; i++) {
        var dot = document.createElement('i');
        if (i < run.linesDone) dot.className = 'done';
        else if (i === run.linesDone) dot.className = 'at';
        dots.appendChild(dot);
      }
    }

    function stats() {
      var mins = minutes(elapsed());
      /* Net wpm off correct keystrokes, so the number moves within a line
         instead of jumping only when one is finished. */
      var wpm = mins > 0 ? Math.round(run.correctKeystrokes / 5 / mins) : 0;
      var acc = run.keystrokes
        ? Math.round((run.correctKeystrokes / run.keystrokes) * 100)
        : 100;
      return { wpm: clamp(wpm, 0, 400), acc: acc };
    }

    function elapsed() {
      return run.startedAt ? Date.now() - run.startedAt : 0;
    }

    function paintStats() {
      var s = stats();
      elWpm.textContent = s.wpm;
      elAcc.textContent = s.acc + '%';
      elErr.textContent = run.errors;
      elLine.textContent = config.timed
        ? String(run.linesDone)
        : run.linesDone + '/' + lines.length;

      if (config.timed) {
        var left = Math.max(0, config.timed * 1000 - elapsed());
        elTime.textContent = fmtDuration(left);
      } else {
        elTime.textContent = fmtDuration(elapsed());
      }

      elAcc.parentNode.classList.toggle('is-bad', s.acc < 90 && run.keystrokes > 8);
      elAcc.parentNode.classList.toggle('is-ok', s.acc >= 98 && run.keystrokes > 8);
    }

    /* --- input handling --- */
    function wordAt(text, pos) {
      var start = text.lastIndexOf(' ', Math.max(0, pos - 1)) + 1;
      var end = text.indexOf(' ', pos);
      if (end === -1) end = text.length;
      return text.slice(start, end).trim();
    }

    function onInput() {
      if (run.finished) return;

      var text = target();
      var typed = field.value;

      if (!run.startedAt) {
        run.startedAt = Date.now();
        ticker = setInterval(tick, 200);
      }

      /* Only score characters that are new — backspacing never double-counts. */
      if (typed.length > run.typedLen) {
        stopPendingLineSpeech();
        speakFinishedWord(text, run.typedLen, typed.length);
        for (var i = run.typedLen; i < typed.length; i++) {
          run.keystrokes++;
          var expected = text.charAt(i);
          if (i < text.length && typed.charAt(i) === expected) {
            run.correctKeystrokes++;
            K.key();
          } else {
            run.errors++;
            K.wrong();
            var key = i < text.length ? expected : '⏎';
            run.charErrors[key] = (run.charErrors[key] || 0) + 1;
            if (i < text.length) {
              var word = wordAt(text, i);
              if (word) run.wordErrors[word] = (run.wordErrors[word] || 0) + 1;
            }
          }
        }
      }
      run.typedLen = typed.length;

      paint();
      paintStats();

      if (typed.length >= text.length && typed === text) {
        advanceLine();
      }
    }

    /*
     * Move to the next line, whether it was typed out or skipped. Speed and
     * accuracy are scored per keystroke as they happen, so an abandoned line
     * needs no separate accounting here.
     */
    function advanceLine() {
      K.done();
      run.linesDone++;
      run.index++;
      run.typedLen = 0;
      field.value = '';

      /* Untimed runs stop at the end of the unit; timed runs loop the lines. */
      if (!config.timed && run.linesDone >= lines.length) {
        finish();
        return;
      }

      paintDots();
      paint();
      paintStats();
      announce();
    }

    function tick() {
      paintStats();
      if (config.timed && elapsed() >= config.timed * 1000) finish();
    }

    function finish() {
      if (run.finished) return;
      run.finished = true;
      run.elapsed = elapsed();
      if (ticker) clearInterval(ticker);
      stopPendingLineSpeech();
      V.cancel();
      field.blur();
      field.disabled = true;
      lineBox.classList.add('is-locked');

      var s = stats();
      var saved = S.record({
        lang: config.lang,
        section: config.section.id,
        unit: config.unit.id,
        lines: run.linesDone,
        chars: run.keystrokes,
        correct: run.correctKeystrokes,
        errors: run.errors,
        ms: run.elapsed,
        wpm: s.wpm,
        accuracy: s.acc,
        charErrors: run.charErrors,
        wordErrors: run.wordErrors
      });

      showSummary(s, saved);
    }

    function showSummary(s, saved) {
      stage.hidden = true;
      summary.hidden = false;

      document.getElementById('sum-wpm').textContent = s.wpm;
      document.getElementById('sum-acc').textContent = s.acc + '%';
      document.getElementById('sum-err').textContent = run.errors;
      document.getElementById('sum-lines').textContent = run.linesDone;
      document.getElementById('sum-time').textContent = fmtDuration(run.elapsed);

      var st = S.streak(saved);
      var today = saved.days[S.dayKey()] || S.emptyDay();
      setPair(
        document.getElementById('sum-note'),
        'اليوم: ' + today.lines + ' من ' + saved.goal + ' سطر · الستريك: ' +
          countAr(st.current, DAYS_AR),
        'Today: ' + today.lines + ' of ' + saved.goal + ' lines · streak: ' +
          st.current + (st.current === 1 ? ' day' : ' days')
      );

      var badge = document.getElementById('sum-badge');
      var unitKey = config.lang + '/' + config.section.id + '/' + config.unit.id;
      var unitStats = saved.units[unitKey];
      badge.hidden = !(unitStats && unitStats.bestWpm === s.wpm && unitStats.runs > 1);

      document.getElementById('sum-again').addEventListener('click', function () {
        window.location.reload();
      });
      document.getElementById('sum-back').href = 'index.html?lang=' + config.lang;
      document.getElementById('sum-progress').href = 'progress.html?lang=' + config.lang;
      document.getElementById('sum-again').focus();
    }

    /* --- wiring --- */
    field.addEventListener('input', onInput);

    field.addEventListener('keydown', function (e) {
      /* Enter moves on even if a stubborn character is still wrong. */
      if (e.key === 'Enter') {
        e.preventDefault();
        if (field.value.length) advanceLine();
      }
      /* Escape ends the run and banks whatever was done. */
      if (e.key === 'Escape') {
        e.preventDefault();
        if (run.linesDone || run.keystrokes) finish();
      }
    });

    stage.addEventListener('click', function (e) {
      if (e.target.closest('button, a, input')) return;
      field.focus();
    });

    field.addEventListener('blur', function () {
      if (!run.finished) lineBox.classList.add('is-blurred');
    });
    field.addEventListener('focus', function () {
      lineBox.classList.remove('is-blurred');
    });

    lineBox.setAttribute(
      'data-focus-note',
      t('اضغط هنا لمواصلة الكتابة', 'Click here to keep typing')
    );

    var finishBtn = document.getElementById('finish-run');
    if (finishBtn) {
      finishBtn.addEventListener('click', function () {
        if (run.linesDone || run.keystrokes) finish();
        else window.location.href = 'index.html?lang=' + config.lang;
      });
    }

    var skipBtn = document.getElementById('skip-line');
    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        advanceLine();
        field.focus();
      });
    }

    paintDots();
    paint();
    paintStats();
    announce();
    field.focus();
  }

  /* ====================================================================== */
  /*  PROGRESS PAGE                                                          */
  /* ====================================================================== */

  var DAY_AR = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
  var DAY_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTH_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو',
    'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  var MONTH_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];

  function renderProgress() {
    var state = S.load();
    var lang = qs('lang', state.lang || 'en');
    if (!C.langs[lang]) lang = 'en';

    var bar = document.getElementById('toolbar');
    bar.textContent = '';
    bar.appendChild(buildLangSwitch(lang));
    bar.appendChild(buildStatusChips(state));

    renderKpis(state);
    renderGoal(state);
    renderCharts(state);
    renderCalendar(state);
    renderMistakes(state, lang);
    renderSectionProgress(state, lang);
    renderSettings(state);
  }

  function renderKpis(state) {
    var host = document.getElementById('kpis');
    host.textContent = '';

    var st = S.streak(state);
    var all = S.totals(state);

    host.appendChild(
      kpi(st.current, 'ستريك (أيام متتالية)', 'Streak (days in a row)',
        t('أطول سلسلة: ' + countAr(st.longest, DAYS_AR),
          'Longest: ' + st.longest + (st.longest === 1 ? ' day' : ' days')),
        'is-streak')
    );
    host.appendChild(
      kpi(all.lines, 'إجمالي الأسطر', 'Lines completed',
        t('في ' + countAr(all.activeDays, DAYS_AR) + ' من التدريب',
          'across ' + all.activeDays + ' active days'))
    );
    host.appendChild(
      kpi(all.bestWpm, 'أفضل سرعة (wpm)', 'Best speed (wpm)',
        t('المتوسط: ' + all.avgWpm + ' wpm', 'Average: ' + all.avgWpm + ' wpm'))
    );
    host.appendChild(
      kpi(all.accuracy + '%', 'الدقة الإجمالية', 'Overall accuracy',
        t(countAr(all.errors, ERRORS_AR) + ' من ' + all.chars + ' حرف',
          all.errors + ' errors in ' + all.chars + ' characters'))
    );
    host.appendChild(
      kpi(fmtDuration(all.ms), 'وقت التدريب', 'Time practised',
        count(all.sessions, SESSIONS_AR, 'session'))
    );
  }

  function kpi(value, labelAr, labelEn, sub, extra) {
    var box = document.createElement('div');
    box.className = 'kpi' + (extra ? ' ' + extra : '');

    var v = document.createElement('span');
    v.className = 'k-value';
    v.textContent = String(value);
    box.appendChild(v);

    box.appendChild(el('span', 'k-label', labelAr, labelEn));

    if (sub) {
      var s = document.createElement('span');
      s.className = 'k-sub';
      s.textContent = sub;
      box.appendChild(s);
    }
    return box;
  }

  function renderGoal(state) {
    var today = state.days[S.dayKey()] || S.emptyDay();
    var pct = clamp(Math.round((today.lines / Math.max(1, state.goal)) * 100), 0, 100);
    var r = 50;
    var circumference = 2 * Math.PI * r;

    var host = document.getElementById('goal-ring');
    host.textContent = '';

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', t('هدف اليوم ' + pct + '%', 'Today goal ' + pct + '%'));

    var track = document.createElementNS(svgNS, 'circle');
    track.setAttribute('class', 'track');
    track.setAttribute('cx', '60');
    track.setAttribute('cy', '60');
    track.setAttribute('r', String(r));
    svg.appendChild(track);

    var value = document.createElementNS(svgNS, 'circle');
    value.setAttribute('class', 'value');
    value.setAttribute('cx', '60');
    value.setAttribute('cy', '60');
    value.setAttribute('r', String(r));
    value.setAttribute('stroke-dasharray', String(circumference));
    value.setAttribute('stroke-dashoffset', String(circumference * (1 - pct / 100)));
    svg.appendChild(value);

    host.appendChild(svg);

    var text = document.createElement('div');
    text.className = 'ring-text';

    var big = document.createElement('b');
    big.textContent = today.lines + ' / ' + state.goal;
    text.appendChild(big);
    text.appendChild(document.createElement('br'));
    text.appendChild(
      textSpan(t('سطر من هدف اليوم', 'lines of today’s goal'))
    );
    text.appendChild(document.createElement('br'));
    text.appendChild(
      textSpan(
        t('أخطاء اليوم: ' + today.errors + ' · الوقت: ' + fmtDuration(today.ms),
          'Errors today: ' + today.errors + ' · time: ' + fmtDuration(today.ms))
      )
    );
    text.appendChild(document.createElement('br'));
    text.appendChild(
      textSpan(
        t('سرعة اليوم: ' + today.bestWpm + ' wpm', 'Best today: ' + today.bestWpm + ' wpm')
      )
    );
    host.appendChild(text);
  }

  /* Daily / weekly / monthly, switched by the tab row. */
  function renderCharts(state) {
    var host = document.getElementById('chart');
    var tabs = document.getElementById('tabs');
    var caption = document.getElementById('chart-caption');
    var mode = 'daily';

    function data() {
      if (mode === 'weekly') return S.weekly(state, 8);
      if (mode === 'monthly') return S.monthly(state, 6);
      return S.daily(state, 14);
    }

    function labelFor(entry) {
      var d = entry.date;
      if (mode === 'weekly') {
        return d.getDate() + ' ' +
          (isArabic() ? MONTH_AR[d.getMonth()].slice(0, 4) : MONTH_EN[d.getMonth()]);
      }
      if (mode === 'monthly') {
        return isArabic() ? MONTH_AR[d.getMonth()] : MONTH_EN[d.getMonth()];
      }
      return isArabic() ? DAY_AR[d.getDay()] : DAY_EN[d.getDay()];
    }

    function draw() {
      var rows = data();
      var max = rows.reduce(function (m, r) {
        return Math.max(m, r.stats.lines);
      }, 0);
      var goal = mode === 'daily' ? state.goal
        : mode === 'weekly' ? state.goal * 7
          : state.goal * 30;

      host.textContent = '';
      rows.forEach(function (row) {
        var col = document.createElement('div');
        col.className = 'col';

        var bar = document.createElement('div');
        bar.className = 'bar';
        var value = row.stats.lines;
        if (!value) bar.classList.add('is-empty');
        if (value >= goal && goal > 0) bar.classList.add('is-goal');
        bar.style.height = max ? Math.max(3, Math.round((value / max) * 130)) + 'px' : '3px';
        bar.title = row.key + ' — ' + count(value, LINES_AR, 'line');
        col.appendChild(bar);

        var cap = document.createElement('div');
        cap.className = 'cap';
        cap.textContent = labelFor(row);
        col.appendChild(cap);

        host.appendChild(col);
      });

      var total = rows.reduce(function (sum, r) {
        return sum + r.stats.lines;
      }, 0);
      caption.textContent =
        t('المجموع في هذه الفترة: ', 'Total in this range: ') +
        count(total, LINES_AR, 'line');
    }

    Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (btn) {
      btn.addEventListener('click', function () {
        mode = btn.getAttribute('data-mode');
        Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (b) {
          b.setAttribute('aria-selected', String(b === btn));
        });
        draw();
      });
    });

    draw();
  }

  /* Twelve weeks of activity, one square per day. */
  function renderCalendar(state) {
    var host = document.getElementById('cal');
    host.textContent = '';

    var days = S.daily(state, 7 * 12);
    /* Pad the front so each column is a full Sunday-to-Saturday week. */
    var lead = days[0].date.getDay();
    for (var p = 0; p < lead; p++) {
      var blank = document.createElement('i');
      blank.style.visibility = 'hidden';
      host.appendChild(blank);
    }

    days.forEach(function (entry) {
      var cell = document.createElement('i');
      var lines = entry.stats.lines;
      var level = 0;
      if (lines > 0) level = 1;
      if (lines >= state.goal * 0.5) level = 2;
      if (lines >= state.goal) level = 3;
      if (lines >= state.goal * 2) level = 4;
      cell.setAttribute('data-level', String(level));
      cell.title = entry.key + ' — ' + count(lines, LINES_AR, 'line');
      host.appendChild(cell);
    });
  }

  function renderMistakes(state, lang) {
    fillMistakes(
      document.getElementById('mistakes-chars'),
      S.topMistakes(state, lang, 10),
      t('لا أخطاء في الأحرف بعد — ابدأ تدريبًا أولًا.',
        'No letter mistakes yet — run a drill first.')
    );
    fillMistakes(
      document.getElementById('mistakes-words'),
      S.topWordMistakes(state, lang, 10),
      t('لا أخطاء في الكلمات بعد.', 'No word mistakes yet.')
    );

    var link = document.getElementById('drill-link');
    if (link) link.href = 'practice.html?lang=' + lang + '&section=mistakes&unit=auto';
  }

  function fillMistakes(host, items, emptyText) {
    host.textContent = '';
    if (!items.length) {
      var empty = document.createElement('li');
      empty.className = 'empty';
      empty.style.display = 'block';
      empty.textContent = emptyText;
      host.appendChild(empty);
      return;
    }

    var max = items[0].count || 1;
    items.forEach(function (item) {
      var li = document.createElement('li');

      var key = document.createElement('span');
      key.className = 'm-key';
      key.textContent = item.value === ' ' ? '␣' : item.value;
      li.appendChild(key);

      var bar = document.createElement('span');
      bar.className = 'm-bar';
      var fill = document.createElement('span');
      fill.style.width = Math.round((item.count / max) * 100) + '%';
      bar.appendChild(fill);
      li.appendChild(bar);

      var tally = document.createElement('span');
      tally.className = 'm-count';
      tally.textContent = String(item.count);
      li.appendChild(tally);

      host.appendChild(li);
    });
  }

  function renderSectionProgress(state, lang) {
    var host = document.getElementById('sections-progress');
    host.textContent = '';

    C.sections.forEach(function (section) {
      var total = C.countLines(lang, section.id);
      var done = Math.min(S.sectionLines(state, lang, section.id), total);
      var pct = total ? Math.round((done / total) * 100) : 0;

      var row = document.createElement('div');

      var label = document.createElement('div');
      label.className = 'meter-label';
      var name = el('span', null, section.ar, section.en);
      label.appendChild(name);
      label.appendChild(textSpan(done + ' / ' + total));
      row.appendChild(label);
      row.appendChild(meter(pct));
      row.style.marginBlockEnd = 'var(--space-3)';

      host.appendChild(row);
    });
  }

  function renderSettings(state) {
    var input = document.getElementById('goal-input');
    var saveBtn = document.getElementById('goal-save');
    var resetBtn = document.getElementById('reset-all');

    input.value = state.goal;

    saveBtn.addEventListener('click', function () {
      S.setGoal(Number(input.value));
      window.location.reload();
    });

    resetBtn.addEventListener('click', function () {
      var ok = window.confirm(
        t('سيتم حذف كل بيانات التقدم من هذا المتصفح. هل أنت متأكدة؟',
          'This will erase all progress stored in this browser. Are you sure?')
      );
      if (ok) {
        S.reset();
        window.location.reload();
      }
    });
  }

  /* ====================================================================== */

  var page = document.body.getAttribute('data-page');
  if (page === 'sections') renderSections();
  else if (page === 'practice') renderPractice();
  else if (page === 'progress') renderProgress();

  /*
   * The shared toggle in ../app.js retranslates every [data-ar] node, but
   * chart captions and stat sub-labels are built from live numbers. Re-run the
   * page for those two. A practice run is never reloaded — losing the current
   * line to a language switch would be worse than a couple of stale labels,
   * and its own labels do carry data-ar/data-en.
   */
  var langToggle = document.getElementById('lang-toggle');
  if (langToggle && (page === 'sections' || page === 'progress')) {
    langToggle.addEventListener('click', function () {
      window.location.reload();
    });
  }
})();
