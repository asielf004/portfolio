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
  }

  /* Prefer an exact locale match, then any voice for the base language. */
  function pickVoice(lang) {
    var tag = BCP47[lang] || lang;
    var base = tag.split('-')[0];
    var exact = null;
    var loose = null;

    for (var i = 0; i < voices.length; i++) {
      var v = voices[i];
      if (!v.lang) continue;
      var vlang = v.lang.replace('_', '-');
      if (!exact && vlang.toLowerCase() === tag.toLowerCase()) exact = v;
      if (!loose && vlang.toLowerCase().indexOf(base.toLowerCase()) === 0) loose = v;
    }
    return exact || loose || null;
  }

  function hasVoiceFor(lang) {
    return supported && !!pickVoice(lang);
  }

  function cancel() {
    if (supported) synth.cancel();
  }

  /*
   * Speak `text`. Later calls replace earlier ones rather than queueing, so a
   * fast typist hears the word they just finished, not a backlog.
   */
  function speak(text, options) {
    if (!supported || !text) return;
    var opts = options || {};

    cancel();

    var utterance = new global.SpeechSynthesisUtterance(String(text));
    utterance.lang = BCP47[currentLang] || currentLang;
    utterance.rate = opts.rate || rate;
    utterance.pitch = 1;

    var voice = pickVoice(currentLang);
    if (voice) utterance.voice = voice;

    try {
      synth.speak(utterance);
    } catch (e) {
      /* A blocked or unavailable synth must never break the typing flow. */
    }
  }

  global.LBL_SPEECH = {
    supported: supported,
    hasVoiceFor: hasVoiceFor,
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
