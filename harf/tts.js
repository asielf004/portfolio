/* ==========================================================================
   حرف — neural text to speech
   Replaces the device's SpeechSynthesis voices (Thomas, Google, Microsoft
   and the rest) with ElevenLabs, whose output is what the learner actually
   needs to imitate.

   ---------------------------------------------------------------------------
   THE API KEY IS NEVER IN THIS FILE, AND MUST NEVER BE.
   ---------------------------------------------------------------------------
   This site is static and served from a public repository, so anything in
   the JavaScript is readable by anyone who opens the page, and anything
   committed is readable by anyone who opens the repo. A key placed here
   would be someone else's credits within a day.

   Two supported ways to supply it, in order of preference:

   1. A proxy you deploy, holding the key server-side. Point the app at it:
        localStorage.setItem('harf-tts-endpoint', 'https://your-worker.dev/tts')
      A ready-to-deploy Cloudflare Worker is in tts-proxy.example.js.
      The browser never sees the key.

   2. Your own key, kept in your own browser and nowhere else:
        localStorage.setItem('harf-tts-key', 'sk_...')
      Fine on a personal machine; it is still visible to anything running on
      that page, so do not use a key with billing you would miss.

   With neither configured the app falls back to the device voices, so it
   keeps working — just not as well.

   Exposes window.HARF_TTS.
   ========================================================================== */
(function (global) {
  'use strict';

  var ENDPOINT_KEY = 'harf-tts-endpoint';
  var API_KEY_KEY = 'harf-tts-key';
  var DIRECT_URL = 'https://api.elevenlabs.io/v1/text-to-speech/';

  /*
   * One fixed voice per language, so the learner hears the same speaker
   * throughout. eleven_multilingual_v2 carries a voice's own accent into
   * the target language, which is why French gets a French speaker rather
   * than an English one reading French.
   *
   * These are ElevenLabs' shared default voices. To use a different one,
   * override without touching this file:
   *   localStorage.setItem('harf-tts-voices', '{"fr":"<voiceId>"}')
   */
  var VOICES = {
    en: '21m00Tcm4TlvDq8ikWAM',   /* Rachel — calm, evenly paced */
    fr: 'XB0fDUnXU5powFXDhCwa'    /* Charlotte — used for French */
  };

  var MODEL = 'eleven_multilingual_v2';

  /* Steady and articulate rather than performed: this is a model to copy,
     not a reading. High stability, low style. */
  var VOICE_SETTINGS = {
    stability: 0.6,
    similarity_boost: 0.8,
    style: 0.15,
    use_speaker_boost: true
  };

  var CACHE_NAME = 'harf-tts-v1';
  var MEMORY_LIMIT = 120;

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  var endpoint = read(ENDPOINT_KEY);
  var apiKey = read(API_KEY_KEY);

  var voices = (function () {
    var override = read('harf-tts-voices');
    if (!override) return VOICES;
    try {
      var parsed = JSON.parse(override);
      return {
        en: parsed.en || VOICES.en,
        fr: parsed.fr || VOICES.fr
      };
    } catch (e) {
      return VOICES;
    }
  })();

  var available = !!(endpoint || apiKey) && !!global.fetch && !!global.Audio;

  var currentLang = 'en';
  var rate = 1;
  var memory = new Map();          /* cache key -> object URL */
  var playing = null;              /* the <audio> currently sounding */
  var chain = Promise.resolve();   /* serialises queued clips */
  var failures = 0;

  function cacheKey(text, lang) {
    return lang + '|' + voices[lang] + '|' + text;
  }

  /* ------------------------------------------------------------- fetching */

  function request(text, lang) {
    var voiceId = voices[lang] || voices.en;

    if (endpoint) {
      /* The proxy holds the key; it only ever receives what to say. */
      return global.fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          voiceId: voiceId,
          modelId: MODEL,
          voiceSettings: VOICE_SETTINGS
        })
      });
    }

    return global.fetch(DIRECT_URL + voiceId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text: text,
        model_id: MODEL,
        voice_settings: VOICE_SETTINGS
      })
    });
  }

  /*
   * Clips are cached by text, so a line replayed ten times is fetched once —
   * this is a metered API and the same handful of phrases recur constantly.
   * Cache Storage survives reloads; the Map avoids even that round trip.
   */
  function audioUrl(text, lang) {
    var key = cacheKey(text, lang);
    if (memory.has(key)) return Promise.resolve(memory.get(key));

    return caches
      .open(CACHE_NAME)
      .then(function (cache) {
        var req = new Request('harf-tts/' + encodeURIComponent(key));
        return cache.match(req).then(function (hit) {
          if (hit) return hit.blob();
          return request(text, lang).then(function (res) {
            if (!res.ok) throw new Error('tts ' + res.status);
            return res.blob().then(function (blob) {
              cache.put(req, new Response(blob.slice()));
              return blob;
            });
          });
        });
      })
      .catch(function () {
        /* No Cache Storage (private mode, old browser) — fetch each time. */
        return request(text, lang).then(function (res) {
          if (!res.ok) throw new Error('tts ' + res.status);
          return res.blob();
        });
      })
      .then(function (blob) {
        var url = URL.createObjectURL(blob);
        if (memory.size >= MEMORY_LIMIT) {
          var oldest = memory.keys().next().value;
          URL.revokeObjectURL(memory.get(oldest));
          memory.delete(oldest);
        }
        memory.set(key, url);
        return url;
      });
  }

  /* ------------------------------------------------------------- playback */

  function stop() {
    if (playing) {
      playing.pause();
      playing = null;
    }
  }

  function play(url) {
    return new Promise(function (resolve) {
      var audio = new global.Audio(url);
      /*
       * Speed is applied on playback rather than asked of the model: the
       * clip is identical at every speed, so slow and fast are the same
       * voice saying the same thing, and neither costs another request.
       */
      audio.playbackRate = rate;
      audio.preservesPitch = true;
      audio.mozPreservesPitch = true;
      audio.webkitPreservesPitch = true;

      playing = audio;
      audio.onended = audio.onerror = function () {
        if (playing === audio) playing = null;
        resolve();
      };
      var started = audio.play();
      if (started && started.catch) started.catch(function () { resolve(); });
    });
  }

  /*
   * `queue` keeps consecutive clips from cutting each other off, which is
   * what per-letter speech needs; without it every keystroke would truncate
   * the letter before it.
   */
  function speak(text, options) {
    if (!available || !text) return false;
    var opts = options || {};

    if (!opts.queue) {
      chain = Promise.resolve();
      stop();
    }

    chain = chain
      .then(function () {
        return audioUrl(String(text), currentLang);
      })
      .then(play)
      .catch(function () {
        failures++;
        /* Three failures in a row means the key or endpoint is wrong; stop
           trying and let the caller fall back rather than hanging silently. */
        if (failures >= 3) available = false;
      });

    return true;
  }

  /* Fetch without playing, so the opening line is ready before it is needed. */
  function preload(text) {
    if (!available || !text) return;
    audioUrl(String(text), currentLang).catch(function () {});
  }

  global.HARF_TTS = {
    get available() {
      return available;
    },
    configured: !!(endpoint || apiKey),
    usingProxy: !!endpoint,
    setLang: function (lang) {
      currentLang = voices[lang] ? lang : 'en';
    },
    setRate: function (value) {
      rate = Math.max(0.5, Math.min(2, Number(value) || 1));
      if (playing) playing.playbackRate = rate;
    },
    speak: speak,
    preload: preload,
    cancel: function () {
      chain = Promise.resolve();
      stop();
    }
  };
})(window);
