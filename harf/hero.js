/* ==========================================================================
   حرف — liquid metal hero backdrop
   The reference was a React component wrapping paper-design's LiquidMetal.
   ShaderMount underneath it is framework-agnostic — it takes a DOM element,
   a fragment shader and a uniform object — so it is driven directly here.
   Values are liquidMetalPresets[2] ("Backdrop"), which is the preset the
   reference component used.
   ========================================================================== */
import {
  ShaderMount,
  liquidMetalFragmentShader,
  getShaderColorFromString,
  defaultObjectSizing,
  ShaderFitOptions,
  LiquidMetalShapes
} from './vendor/paper-shaders.js';

var host = document.getElementById('harf-shader');

if (host) {
  var mount = null;

  /* liquidMetalPresets[2] — "Backdrop" */
  var PRESET = {
    speed: 1,
    frame: 0,
    scale: 1,
    softness: 0.05,
    repetition: 1.5,
    shiftRed: 0.3,
    shiftBlue: 0.3,
    distortion: 0.1,
    contour: 0.4,
    angle: 90,
    shape: 'none',
    worldWidth: 0,
    worldHeight: 0
  };

  function isDark() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function uniforms() {
    var dark = isDark();
    return {
      u_colorBack: getShaderColorFromString(dark ? '#17161c' : '#aaaaac'),
      u_colorTint: getShaderColorFromString(dark ? '#8b6bd9' : '#ffffff'),
      u_image: undefined,
      u_isImage: false,
      u_shape: LiquidMetalShapes[PRESET.shape],
      u_repetition: PRESET.repetition,
      u_softness: PRESET.softness,
      u_shiftRed: PRESET.shiftRed,
      u_shiftBlue: PRESET.shiftBlue,
      u_distortion: PRESET.distortion,
      u_contour: PRESET.contour,
      u_angle: PRESET.angle,

      /* sizing */
      u_fit: ShaderFitOptions[defaultObjectSizing.fit],
      u_scale: PRESET.scale,
      u_rotation: defaultObjectSizing.rotation,
      u_originX: defaultObjectSizing.originX,
      u_originY: defaultObjectSizing.originY,
      u_offsetX: defaultObjectSizing.offsetX,
      u_offsetY: defaultObjectSizing.offsetY,
      u_worldWidth: PRESET.worldWidth,
      u_worldHeight: PRESET.worldHeight
    };
  }

  /* A still frame carries the material just as well as a moving one, and
     costs nothing on a machine that asked for less motion. */
  function wantsMotion() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function build() {
    if (mount) {
      mount.setUniforms(uniforms());
      return;
    }
    try {
      mount = new ShaderMount(
        host,
        liquidMetalFragmentShader,
        uniforms(),
        undefined,
        wantsMotion() ? PRESET.speed : 0,
        wantsMotion() ? PRESET.frame : 2000
      );
      host.setAttribute('data-ready', 'true');
    } catch (e) {
      /* No WebGL2 — the hero keeps its CSS gradient and stays legible. */
      host.setAttribute('data-failed', 'true');
    }
  }

  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTimeout(build, 0);
    });
  }

  build();
}
