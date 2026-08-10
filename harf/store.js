/* ==========================================================================
   Line by Line — progress store
   Everything lives in localStorage; nothing leaves the browser.
   Exposes window.LBL_STORE.
   ========================================================================== */
(function (global) {
  'use strict';

  var KEY = 'lbl-progress-v1';
  var MAX_SESSIONS = 120;

  var EMPTY = {
    v: 1,
    goal: 20,
    lang: 'en',
    speech: { enabled: true, rate: 0.8, keys: true, mode: 'letter', voice: {} },
    days: {},
    units: {},
    mistakes: { en: {}, fr: {} },
    wordMistakes: { en: {}, fr: {} },
    sessions: []
  };

  /* ---------------------------------------------------------- date helpers */

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  /* Local calendar day, not UTC — a session at 1 a.m. belongs to that day. */
  function dayKey(date) {
    var d = date || new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function fromKey(key) {
    var p = key.split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function addDays(date, n) {
    var d = new Date(date.getTime());
    d.setDate(d.getDate() + n);
    return d;
  }

  /* Weeks start on Sunday. */
  function startOfWeek(date) {
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return addDays(d, -d.getDay());
  }

  /* ------------------------------------------------------------- persistence */

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function load() {
    var raw = null;
    try {
      raw = localStorage.getItem(KEY);
    } catch (e) {
      return clone(EMPTY);
    }
    if (!raw) return clone(EMPTY);

    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return clone(EMPTY);
    }
    if (!parsed || typeof parsed !== 'object') return clone(EMPTY);

    /* Fill in anything a older/partial payload is missing. */
    var base = clone(EMPTY);
    Object.keys(base).forEach(function (k) {
      if (parsed[k] === undefined || parsed[k] === null) parsed[k] = base[k];
    });
    ['mistakes', 'wordMistakes'].forEach(function (k) {
      if (!parsed[k].en) parsed[k].en = {};
      if (!parsed[k].fr) parsed[k].fr = {};
    });
    if (typeof parsed.speech.enabled !== 'boolean') parsed.speech.enabled = true;
    if (typeof parsed.speech.rate !== 'number') parsed.speech.rate = 0.8;
    if (typeof parsed.speech.keys !== 'boolean') parsed.speech.keys = true;
    if (['letter', 'word', 'dictation'].indexOf(parsed.speech.mode) === -1) {
      parsed.speech.mode = 'letter';
    }
    if (!parsed.speech.voice || typeof parsed.speech.voice !== 'object') {
      parsed.speech.voice = {};
    }
    return parsed;
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false; /* private mode / quota — the run still counted on screen */
    }
  }

  function emptyDay() {
    return { lines: 0, chars: 0, correct: 0, errors: 0, ms: 0, sessions: 0, bestWpm: 0 };
  }

  /* ------------------------------------------------------------------ streak */

  /*
   * A day counts towards the streak once at least one line was finished on it.
   * Today not being practised yet does not break the streak — we start counting
   * from today when it has activity, otherwise from yesterday.
   */
  function streak(state) {
    var days = state.days;
    var today = new Date();
    var cursor = days[dayKey(today)] && days[dayKey(today)].lines > 0
      ? today
      : addDays(today, -1);

    var current = 0;
    while (days[dayKey(cursor)] && days[dayKey(cursor)].lines > 0) {
      current++;
      cursor = addDays(cursor, -1);
    }

    /* Longest run anywhere in the history. */
    var keys = Object.keys(days).filter(function (k) {
      return days[k].lines > 0;
    }).sort();

    var longest = 0;
    var run = 0;
    var prev = null;
    keys.forEach(function (k) {
      var d = fromKey(k);
      if (prev && Math.round((d - prev) / 86400000) === 1) run++;
      else run = 1;
      if (run > longest) longest = run;
      prev = d;
    });

    return { current: current, longest: Math.max(longest, current) };
  }

  /* ------------------------------------------------------------- aggregation */

  function daily(state, count) {
    var out = [];
    var today = new Date();
    for (var i = count - 1; i >= 0; i--) {
      var d = addDays(today, -i);
      var key = dayKey(d);
      out.push({ key: key, date: d, stats: state.days[key] || emptyDay() });
    }
    return out;
  }

  function weekly(state, count) {
    var out = [];
    var thisWeek = startOfWeek(new Date());
    for (var i = count - 1; i >= 0; i--) {
      var start = addDays(thisWeek, -7 * i);
      var bucket = emptyDay();
      for (var d = 0; d < 7; d++) {
        var stats = state.days[dayKey(addDays(start, d))];
        if (stats) merge(bucket, stats);
      }
      out.push({ key: dayKey(start), date: start, stats: bucket });
    }
    return out;
  }

  function monthly(state, count) {
    var out = [];
    var now = new Date();
    for (var i = count - 1; i >= 0; i--) {
      var start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      var prefix = start.getFullYear() + '-' + pad(start.getMonth() + 1);
      var bucket = emptyDay();
      Object.keys(state.days).forEach(function (key) {
        if (key.indexOf(prefix) === 0) merge(bucket, state.days[key]);
      });
      out.push({ key: prefix, date: start, stats: bucket });
    }
    return out;
  }

  function merge(target, source) {
    target.lines += source.lines || 0;
    target.chars += source.chars || 0;
    target.correct += source.correct || 0;
    target.errors += source.errors || 0;
    target.ms += source.ms || 0;
    target.sessions += source.sessions || 0;
    target.bestWpm = Math.max(target.bestWpm, source.bestWpm || 0);
    return target;
  }

  function totals(state) {
    var all = emptyDay();
    Object.keys(state.days).forEach(function (k) {
      merge(all, state.days[k]);
    });
    all.accuracy = all.chars ? Math.round((all.correct / all.chars) * 100) : 0;
    all.avgWpm = 0;
    if (state.sessions.length) {
      var sum = state.sessions.reduce(function (s, x) {
        return s + (x.wpm || 0);
      }, 0);
      all.avgWpm = Math.round(sum / state.sessions.length);
    }
    all.activeDays = Object.keys(state.days).filter(function (k) {
      return state.days[k].lines > 0;
    }).length;
    return all;
  }

  /* Most-missed characters / words, biggest first. */
  function topMistakes(state, lang, limit) {
    return rank(state.mistakes[lang] || {}, limit);
  }

  function topWordMistakes(state, lang, limit) {
    return rank(state.wordMistakes[lang] || {}, limit);
  }

  function rank(map, limit) {
    return Object.keys(map)
      .map(function (k) {
        return { value: k, count: map[k] };
      })
      .sort(function (a, b) {
        return b.count - a.count;
      })
      .slice(0, limit || 12);
  }

  /* ------------------------------------------------------------------ record */

  /*
   * result = {
   *   lang, section, unit, lines, chars, correct, errors, ms, wpm, accuracy,
   *   charErrors: {char: n}, wordErrors: {word: n}
   * }
   */
  function record(result) {
    var state = load();
    var key = dayKey();
    var day = state.days[key] || emptyDay();

    day.lines += result.lines || 0;
    day.chars += result.chars || 0;
    day.correct += result.correct || 0;
    day.errors += result.errors || 0;
    day.ms += result.ms || 0;
    day.sessions += 1;
    day.bestWpm = Math.max(day.bestWpm, result.wpm || 0);
    state.days[key] = day;

    var unitKey = result.lang + '/' + result.section + '/' + result.unit;
    var unit = state.units[unitKey] || { lines: 0, runs: 0, bestWpm: 0, bestAcc: 0 };
    unit.lines = Math.max(unit.lines, result.lines || 0);
    unit.runs += 1;
    unit.bestWpm = Math.max(unit.bestWpm, result.wpm || 0);
    unit.bestAcc = Math.max(unit.bestAcc, result.accuracy || 0);
    unit.last = key;
    state.units[unitKey] = unit;

    bump(state.mistakes, result.lang, result.charErrors);
    bump(state.wordMistakes, result.lang, result.wordErrors);

    state.sessions.push({
      d: key,
      t: Date.now(),
      lang: result.lang,
      section: result.section,
      unit: result.unit,
      lines: result.lines || 0,
      wpm: result.wpm || 0,
      acc: result.accuracy || 0,
      ms: result.ms || 0
    });
    if (state.sessions.length > MAX_SESSIONS) {
      state.sessions = state.sessions.slice(-MAX_SESSIONS);
    }

    state.lang = result.lang;
    save(state);
    return state;
  }

  function bump(bucket, lang, map) {
    if (!map) return;
    if (!bucket[lang]) bucket[lang] = {};
    Object.keys(map).forEach(function (k) {
      bucket[lang][k] = (bucket[lang][k] || 0) + map[k];
    });
  }

  /* Lines finished in a section, capped at the number of lines it holds. */
  function sectionLines(state, lang, section) {
    var total = 0;
    var prefix = lang + '/' + section + '/';
    Object.keys(state.units).forEach(function (k) {
      if (k.indexOf(prefix) === 0) total += state.units[k].lines || 0;
    });
    return total;
  }

  function setGoal(goal) {
    var state = load();
    state.goal = Math.max(5, Math.min(200, goal | 0));
    save(state);
    return state;
  }

  function setLang(lang) {
    var state = load();
    state.lang = lang;
    save(state);
    return state;
  }

  function setSpeech(patch) {
    var state = load();
    if (typeof patch.enabled === 'boolean') state.speech.enabled = patch.enabled;
    if (typeof patch.rate === 'number') {
      state.speech.rate = Math.max(0.4, Math.min(1.5, patch.rate));
    }
    if (typeof patch.keys === 'boolean') state.speech.keys = patch.keys;
    if (typeof patch.mode === 'string') state.speech.mode = patch.mode;
    if (patch.voice) {
      Object.keys(patch.voice).forEach(function (lang) {
        state.speech.voice[lang] = patch.voice[lang];
      });
    }
    save(state);
    return state;
  }

  function reset() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      /* nothing to clear */
    }
    return clone(EMPTY);
  }

  global.LBL_STORE = {
    load: load,
    save: save,
    record: record,
    reset: reset,
    setGoal: setGoal,
    setLang: setLang,
    setSpeech: setSpeech,
    streak: streak,
    daily: daily,
    weekly: weekly,
    monthly: monthly,
    totals: totals,
    topMistakes: topMistakes,
    topWordMistakes: topWordMistakes,
    sectionLines: sectionLines,
    dayKey: dayKey,
    fromKey: fromKey,
    emptyDay: emptyDay
  };
})(window);
