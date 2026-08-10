/* ==========================================================================
   Line by Line — pronunciation
   Wraps the Web Speech API so the practised line can be heard while it is
   being typed. Silently no-ops where the API is missing.
   Exposes window.LBL_SPEECH.
   ========================================================================== */
(function (global) {
  'use strict';

  var synth = global.speechSynthesis || null;
  var supported = !!(synth && global.SpeechSynthesisUtterance);

  var BCP47 = { en: 'en-US', fr: 'fr-FR' };

  var voices = [];
  var currentLang = 'en';
  var rate = 0.9;
  var unlocked = false;
  var lastError = '';

  /*
   * Voices load asynchronously in most browsers: the first getVoices() call
   * often returns [], and the list arrives later on `voiceschanged`.
   */
  function loadVoices() {
    if (!supported) return;
    voices = synth.getVoices() || [];
  }

  if (supported) {
    loadVoices();
    if (typeof synth.addEventListener === 'function') {
      synth.addEventListener('voiceschanged', loadVoices);
    } else {
      synth.onvoiceschanged = loadVoices;
    }

    /*
     * Browsers refuse to speak until the user has interacted with the page,
     * and a refused utterance can wedge the queue. Spend the first real
     * gesture on an empty utterance so every later call is allowed.
     */
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (type) {
      global.addEventListener(type, unlock, { once: false, passive: true });
    });
  }

  function unlock() {
    if (unlocked || !supported) return;
    unlocked = true;
    loadVoices();
    try {
      var warmup = new global.SpeechSynthesisUtterance('');
      warmup.volume = 0;
      synth.speak(warmup);
    } catch (e) {
      /* If even this is refused there is nothing further to try. */
    }
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (type) {
      global.removeEventListener(type, unlock);
    });
  }

  /* Prefer an exact locale match, then any voice for the base language. */
  function pickVoice(lang) {
    var tag = BCP47[lang] || lang;
    var base = tag.split('-')[0].toLowerCase();
    var exact = null;
    var loose = null;

    for (var i = 0; i < voices.length; i++) {
      var v = voices[i];
      if (!v.lang) continue;
      var vlang = v.lang.replace('_', '-').toLowerCase();
      if (!exact && vlang === tag.toLowerCase()) exact = v;
      if (!loose && vlang.indexOf(base) === 0) loose = v;
    }
    return exact || loose || null;
  }

  function hasVoiceFor(lang) {
    if (!supported) return false;
    if (!voices.length) loadVoices();
    /* An empty voice list is normal before the first gesture — assume the
       platform can speak rather than hiding the controls for good. */
    return !voices.length || !!pickVoice(lang);
  }

  function cancel() {
    if (supported) synth.cancel();
  }

  function utter(text, opts) {
    var u = new global.SpeechSynthesisUtterance(String(text));
    u.lang = BCP47[currentLang] || currentLang;
    u.rate = opts.rate || rate;
    u.pitch = 1;
    u.onerror = function (e) {
      lastError = (e && e.error) || 'error';
    };

    var voice = pickVoice(currentLang);
    if (voice) u.voice = voice;
    return u;
  }

  /*
   * Speak `text`. Later calls replace earlier ones rather than queueing, so a
   * fast typist hears the word they just finished, not a backlog.
   */
  function speak(text, options) {
    if (!supported || !text) return;
    var opts = options || {};

    unlock();
    if (!voices.length) loadVoices();

    var busy = synth.speaking || synth.pending;
    if (busy) synth.cancel();

    var u = utter(text, opts);

    try {
      if (busy) {
        /* Chrome drops an utterance queued in the same tick as a cancel(). */
        setTimeout(function () {
          try {
            synth.speak(u);
          } catch (e) {
            lastError = 'speak-failed';
          }
        }, 30);
      } else {
        synth.speak(u);
      }
    } catch (e) {
      lastError = 'speak-failed';
    }
  }

  global.LBL_SPEECH = {
    supported: supported,
    hasVoiceFor: hasVoiceFor,
    lastError: function () {
      return lastError;
    },
    setLang: function (lang) {
      currentLang = lang;
    },
    setRate: function (value) {
      rate = Math.max(0.5, Math.min(1.5, Number(value) || 0.9));
    },
    getRate: function () {
      return rate;
    },
    speak: speak,
    cancel: cancel
  };
})(window);
