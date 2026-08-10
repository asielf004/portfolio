/* ==========================================================================
   حرف — pronunciation
   Wraps the Web Speech API. Voice quality varies enormously between the
   voices a platform ships, so this picks the best available by default and
   lets the learner override it.
   Exposes window.HARF_SPEECH.
   ========================================================================== */
(function (global) {
  'use strict';

  var synth = global.speechSynthesis || null;
  var supported = !!(synth && global.SpeechSynthesisUtterance);

  var BCP47 = { en: 'en-US', fr: 'fr-FR' };

  /*
   * Platforms ship a cheap formant voice and, usually, a far better neural
   * one. The cheap one is often the default, which is why untouched speech
   * synthesis sounds robotic. Names are the only signal available.
   */
  var GOOD = [
    'siri', 'premium', 'enhanced', 'neural', 'natural',
    'google', 'améliorée', 'amelioree'
  ];
  var POOR = ['compact', 'espeak', 'pico'];

  var voices = [];
  var currentLang = 'en';
  var rate = 0.9;
  var chosen = {};          /* lang -> voiceURI the learner picked */
  var unlocked = false;

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
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (type) {
      global.addEventListener(type, unlock, { passive: true });
    });
  }

  /*
   * Browsers refuse to speak until the page has been interacted with, and a
   * refused utterance can wedge the queue. Spend the first gesture on an
   * empty utterance so every later call is allowed.
   */
  function unlock() {
    if (unlocked || !supported) return;
    unlocked = true;
    loadVoices();
    try {
      var warmup = new global.SpeechSynthesisUtterance('');
      warmup.volume = 0;
      synth.speak(warmup);
    } catch (e) {
      /* nothing further to try */
    }
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (type) {
      global.removeEventListener(type, unlock);
    });
  }

  function score(voice) {
    var name = (voice.name || '').toLowerCase();
    var points = 0;
    GOOD.forEach(function (hint) {
      if (name.indexOf(hint) !== -1) points += 10;
    });
    POOR.forEach(function (hint) {
      if (name.indexOf(hint) !== -1) points -= 8;
    });
    /* A remote voice is nearly always the better-sounding one. */
    if (voice.localService === false) points += 4;
    if (voice.default) points += 1;
    return points;
  }

  /* Every voice that can speak the language, best first. */
  function listVoices(lang) {
    if (!voices.length) loadVoices();
    var tag = (BCP47[lang] || lang).toLowerCase();
    var base = tag.split('-')[0];

    return voices
      .filter(function (v) {
        return v.lang && v.lang.replace('_', '-').toLowerCase().indexOf(base) === 0;
      })
      .map(function (v) {
        var vlang = v.lang.replace('_', '-').toLowerCase();
        return { voice: v, points: score(v) + (vlang === tag ? 5 : 0) };
      })
      .sort(function (a, b) {
        return b.points - a.points;
      })
      .map(function (entry) {
        return entry.voice;
      });
  }

  function pickVoice(lang) {
    var picked = chosen[lang];
    var available = listVoices(lang);
    if (picked) {
      for (var i = 0; i < available.length; i++) {
        if (available[i].voiceURI === picked) return available[i];
      }
    }
    return available[0] || null;
  }

  function cancel() {
    if (supported) synth.cancel();
  }

  /*
   * Speak `text`. Later calls replace earlier ones rather than queueing, so a
   * fast typist hears the character they just pressed, not a backlog.
   */
  function speak(text, options) {
    if (!supported || text === undefined || text === null || text === '') return;
    var opts = options || {};

    unlock();
    if (!voices.length) loadVoices();

    var busy = synth.speaking || synth.pending;
    if (busy) synth.cancel();

    var u = new global.SpeechSynthesisUtterance(String(text));
    u.lang = BCP47[currentLang] || currentLang;
    u.rate = opts.rate || rate;
    u.pitch = opts.pitch === undefined ? 1 : opts.pitch;
    u.volume = opts.volume === undefined ? 1 : opts.volume;

    var voice = pickVoice(currentLang);
    if (voice) u.voice = voice;

    try {
      if (busy) {
        /* Chrome drops an utterance queued in the same tick as a cancel(). */
        setTimeout(function () {
          try {
            synth.speak(u);
          } catch (e) { /* ignore */ }
        }, 25);
      } else {
        synth.speak(u);
      }
    } catch (e) {
      /* ignore — a failed utterance must never interrupt typing */
    }
  }

  global.HARF_SPEECH = {
    supported: supported,
    listVoices: listVoices,
    currentVoice: function () {
      return pickVoice(currentLang);
    },
    setVoice: function (lang, voiceURI) {
      chosen[lang] = voiceURI;
    },
    setLang: function (lang) {
      currentLang = lang;
    },
    setRate: function (value) {
      rate = Math.max(0.4, Math.min(1.5, Number(value) || 0.9));
    },
    speak: speak,
    cancel: cancel
  };
})(window);
