/* ==========================================================================
   حرف — pronunciation
   Speaks through neural TTS (tts.js) when it is configured, and falls back
   to the device's own voices when it is not, so the app still works
   unconfigured — just with the robotic voices the neural path exists to
   replace. Callers see one interface either way.
   Exposes window.HARF_SPEECH.
   ========================================================================== */
(function (global) {
  'use strict';

  var neural = global.HARF_TTS || null;

  function neuralReady() {
    return !!(neural && neural.available);
  }

  var synth = global.speechSynthesis || null;
  var supported = !!(synth && global.SpeechSynthesisUtterance) || neuralReady();

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
    if (neural) neural.cancel();
    if (synth) synth.cancel();
  }

  /*
   * Speak `text`.
   *
   * By default a new call replaces whatever is speaking, which is right for a
   * line or a word — you want the current one, not a backlog. It is wrong for
   * single letters: cancelling on every keystroke cuts each letter off within
   * milliseconds of starting, which is what made per-key speech sound clipped
   * and unintelligible. Pass `queue` for those so each plays in full.
   */
  function speak(text, options) {
    if (!supported || text === undefined || text === null || text === '') return;
    var opts = options || {};

    /* Neural first; it only declines when unconfigured or after it has
       failed enough times to be considered broken. */
    if (neuralReady() && neural.speak(text, opts)) return;

    if (!synth || !global.SpeechSynthesisUtterance) return;
    unlock();
    if (!voices.length) loadVoices();

    var busy = (synth.speaking || synth.pending) && !opts.queue;
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
    /* True when the learner is hearing the neural voice rather than the
       device's — the UI uses this to label the voice control. */
    isNeural: neuralReady,
    setLang: function (lang) {
      currentLang = lang;
      if (neural) neural.setLang(lang);
    },
    setRate: function (value) {
      rate = Math.max(0.4, Math.min(1.5, Number(value) || 0.9));
      /* The neural clip is fixed, so speed is a playback rate on it. The
         browser path bakes speed into synthesis, hence the two scales. */
      if (neural) neural.setRate(Math.max(0.5, Math.min(1.6, Number(value) || 0.9)));
    },
    speak: speak,
    cancel: cancel
  };
})(window);
