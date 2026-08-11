/* ==========================================================================
   حرف — keystroke sound
   A short synthesised click per keypress, so typing is audible even where
   the speech voices are missing. Generated with Web Audio rather than an
   audio file: no asset to download, and the wrong/right variants are just
   different frequencies.
   Exposes window.HARF_KEYSOUND.
   ========================================================================== */
(function (global) {
  'use strict';

  var Ctx = global.AudioContext || global.webkitAudioContext;
  var supported = !!Ctx;
  var ctx = null;
  var enabled = true;

  function ready() {
    if (!supported || !enabled) return null;
    if (!ctx) {
      try {
        ctx = new Ctx();
      } catch (e) {
        supported = false;
        return null;
      }
    }
    /* Audio contexts start suspended until a gesture; typing is one. */
    if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
    return ctx;
  }

  /*
   * A click is a very short blip with a fast decay. Anything longer starts
   * to sound like a note and gets tiring at typing speed.
   */
  function blip(frequency, peak, duration) {
    var audio = ready();
    if (!audio) return;

    var now = audio.currentTime;
    var osc = audio.createOscillator();
    var gain = audio.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.6, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  global.HARF_KEYSOUND = {
    supported: supported,
    setEnabled: function (value) {
      enabled = !!value;
      if (!enabled && ctx && ctx.suspend) ctx.suspend();
    },
    /* Correct keystroke — soft and high. */
    key: function () {
      blip(880, 0.05, 0.05);
    },
    /* Wrong keystroke — lower and a touch louder, so mistakes are audible. */
    wrong: function () {
      blip(180, 0.09, 0.11);
    },
    /* Line finished. */
    done: function () {
      blip(1320, 0.06, 0.13);
    }
  };
})(window);
