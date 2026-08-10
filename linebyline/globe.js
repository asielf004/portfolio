/* ==========================================================================
   Line by Line — hero globe
   The same behaviour as the React <Globe /> wrapper (auto-spin, drag to
   turn, resize, fade in) written against the plain cobe API, which is not
   React-specific. Loaded as a module; if WebGL is unavailable the hero
   simply renders without it.
   ========================================================================== */
import createGlobe from './vendor/cobe.js';

var canvas = document.getElementById('lbl-globe');
if (canvas) {
  /* Cities of the two languages being practised — the markers say what the
     app is for rather than decorating the hero. */
  var MARKERS = [
    { location: [51.5074, -0.1278], size: 0.09 },   /* London */
    { location: [40.7128, -74.006], size: 0.1 },    /* New York */
    { location: [48.8566, 2.3522], size: 0.1 },     /* Paris */
    { location: [45.5019, -73.5674], size: 0.07 },  /* Montréal */
    { location: [24.7136, 46.6753], size: 0.08 },   /* Riyadh */
    { location: [50.8503, 4.3517], size: 0.05 },    /* Brussels */
    { location: [46.2044, 6.1432], size: 0.04 },    /* Geneva */
    { location: [14.6928, -17.4467], size: 0.06 },  /* Dakar */
    { location: [-33.8688, 151.2093], size: 0.06 }, /* Sydney */
    { location: [1.3521, 103.8198], size: 0.05 }    /* Singapore */
  ];

  var phi = 0;
  var width = 0;
  var rotation = 0;
  var pointerFrom = null;
  var pointerDelta = 0;
  var globe = null;

  /* cobe takes colours as 0-1 RGB triplets, so the palette is mirrored here. */
  function rgb(r, g, b) {
    return [r / 255, g / 255, b / 255];
  }

  function isDark() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function onResize() {
    width = canvas.offsetWidth;
  }

  function build() {
    if (globe) globe.destroy();
    onResize();
    if (!width) return;

    var dark = isDark();

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.28,
        dark: dark ? 1 : 0,
        diffuse: dark ? 0.6 : 0.45,
        mapSamples: 16000,
        /*
         * From cobe's fragment shader, land is shaded
         *   mix((1 - q) * pow(i, 0.4), q, dark)   where q = land * mapBrightness
         * so the two themes need opposite treatment. In light mode (dark = 0)
         * the dots come out *darker* than the sphere and clamp to black once
         * mapBrightness passes 1 — so the base stays near-white and the
         * brightness sits just above 1. In dark mode the dots are the bright
         * part, which needs a dark base and a much higher value.
         */
        mapBrightness: dark ? 5 : 1.15,
        baseColor: dark ? rgb(38, 38, 52) : rgb(252, 251, 255),
        markerColor: rgb(251, 100, 21),      /* orange — the brand accent */
        glowColor: dark ? rgb(124, 58, 237) : rgb(214, 208, 232),
        markers: MARKERS,
        onRender: function (state) {
          if (pointerFrom === null) phi += 0.004;
          state.phi = phi + rotation;
          state.width = width * 2;
          state.height = width * 2;
        }
      });
      requestAnimationFrame(function () {
        canvas.style.opacity = '1';
      });
    } catch (e) {
      /* No WebGL — leave the hero without a globe rather than breaking it. */
      canvas.remove();
    }
  }

  /* --- drag to turn the globe --- */
  function grab(clientX) {
    pointerFrom = clientX - pointerDelta;
    canvas.style.cursor = 'grabbing';
  }

  function release() {
    pointerFrom = null;
    canvas.style.cursor = 'grab';
  }

  function move(clientX) {
    if (pointerFrom === null) return;
    pointerDelta = clientX - pointerFrom;
    rotation = pointerDelta / 200;
  }

  canvas.addEventListener('pointerdown', function (e) {
    grab(e.clientX);
  });
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  canvas.addEventListener('pointermove', function (e) {
    move(e.clientX);
  });
  canvas.addEventListener('touchmove', function (e) {
    if (e.touches[0]) move(e.touches[0].clientX);
  }, { passive: true });

  /* --- lifecycle --- */
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    /* Rebuild rather than resize: cobe bakes the pixel ratio in at creation. */
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 200);
  });

  /* The globe has to be redrawn in the other theme's colours */
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.addEventListener('click', function () {
    setTimeout(build, 0);
  });

  /*
   * Built once. Tearing the globe down when it scrolls out of view sounds
   * thrifty, but destroying it resizes the canvas, which re-fires the
   * observer that destroyed it — the two ping-pong forever. The browser
   * already throttles requestAnimationFrame for hidden tabs.
   */
  build();
}
