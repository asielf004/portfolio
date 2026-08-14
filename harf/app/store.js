/* ==========================================================================
   حرف — التقدّم

   كل شيء في localStorage تحت مفتاح واحد. لا خادم ولا حساب، فالقارئ يملك
   بياناته ويستطيع مسحها متى شاء.
   ========================================================================== */
(function (global) {
  'use strict';

  var KEY = 'harf-progress-v1';

  var EMPTY = {
    read: {},        // storyId -> { line: n, done: bool, at: timestamp }
    known: {},       // "en word" -> true, للكلمات اللي علّمها كمعروفة
    days: {},        // 'YYYY-MM-DD' -> عدد الأسطر المقروءة في اليوم
    lastText: null, contentLang: 'en'
  };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return clone(EMPTY);
      var parsed = JSON.parse(raw);
      // مفاتيح ناقصة من نسخة أقدم تُملأ بالفراغ بدل ما تكسر الصفحة
      return {
        read: parsed.read || {},
        known: parsed.known || {},
        days: parsed.days || {},
        lastText: parsed.lastText || null,
        contentLang: parsed.contentLang === 'fr' ? 'fr' : 'en'
      };
    } catch (e) {
      return clone(EMPTY);
    }
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var state = load();
  var listeners = [];

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* الوضع الخاص يرفض الكتابة — نكمل بدون حفظ */ }
    listeners.forEach(function (fn) { fn(state); });
  }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function dayKey(offset) {
    var d = new Date();
    d.setDate(d.getDate() - offset);
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  var Store = {
    get state() { return state; },

    onChange: function (fn) { listeners.push(fn); },

    progressFor: function (storyId) {
      return state.read[storyId] || { line: 0, done: false, at: 0 };
    },

    /* يُسجَّل السطر الأعلى الذي وصل إليه القارئ — الرجوع للخلف لا ينقص التقدّم. */
    markLine: function (storyId, lineIndex, total) {
      var entry = state.read[storyId] || { line: 0, done: false, at: 0 };
      var reached = Math.max(entry.line, lineIndex + 1);

      if (reached > entry.line) {
        var k = today();
        state.days[k] = (state.days[k] || 0) + (reached - entry.line);
      }

      entry.line = reached;
      entry.done = reached >= total;
      entry.at = Date.now();
      state.read[storyId] = entry;
      state.lastText = storyId;
      save();
    },

    resetStory: function (storyId) {
      delete state.read[storyId];
      if (state.lastText === storyId) state.lastText = null;
      save();
    },

    toggleKnown: function (word) {
      var k = word.toLowerCase();
      if (state.known[k]) delete state.known[k];
      else state.known[k] = true;
      save();
    },

    isKnown: function (word) { return !!state.known[word.toLowerCase()]; },

    knownCount: function () { return Object.keys(state.known).length; },

    linesRead: function () {
      var total = 0;
      for (var id in state.read) total += state.read[id].line;
      return total;
    },

    textsDone: function () {
      var n = 0;
      for (var id in state.read) if (state.read[id].done) n++;
      return n;
    },

    /* آخر سبعة أيام، الأقدم أولًا — الشكل الذي يرسمه المخطط مباشرة. */
    week: function () {
      var out = [];
      for (var i = 6; i >= 0; i--) {
        var k = dayKey(i);
        out.push({ key: k, count: state.days[k] || 0 });
      }
      return out;
    },

    /* الستريك يبدأ من اليوم، أو من أمس إن لم يُقرأ اليوم شيء بعد — حتى لا
       يبدو العدّاد صفرًا لمجرد أن القارئ لم يفتح التطبيق بعد. */
    streak: function () {
      var n = 0;
      var start = state.days[dayKey(0)] ? 0 : 1;
      for (var i = start; i < 400; i++) {
        if (state.days[dayKey(i)]) n++;
        else break;
      }
      return n;
    },

    contentLang: function () { return state.contentLang; },

    setContentLang: function (id) {
      state.contentLang = id === 'fr' ? 'fr' : 'en';
      save();
    },

    /* الكلمات المحفوظة، أحدثها أولًا ليست مرتّبة — الترتيب الأبجدي أهدأ. */
    savedWords: function () {
      return Object.keys(state.known).sort();
    },

    clearAll: function () {
      state = clone(EMPTY);
      save();
    }
  };

  global.HARF_STORE = Store;
})(window);
