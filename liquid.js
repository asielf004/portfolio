/* ==========================================================================
   Liquid metal backdrop — flowing, ink-blue WebGL surface behind the hero.
   Degrades to the CSS gradient already painted on the canvas host when WebGL
   is missing, and stays still when the visitor asks for reduced motion.
   ========================================================================== */
(function () {
  'use strict';

  var canvas = document.getElementById('liquid');
  if (!canvas) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var gl =
    canvas.getContext('webgl', { antialias: false, alpha: true }) ||
    canvas.getContext('experimental-webgl', { antialias: false, alpha: true });

  if (!gl) return; // CSS gradient underneath remains visible

  var VERT = [
    'attribute vec2 p;',
    'void main(){ gl_Position = vec4(p, 0.0, 1.0); }'
  ].join('\n');

  var FRAG = [
    'precision highp float;',
    'uniform vec2  u_res;',
    'uniform float u_time;',
    'uniform vec2  u_pointer;',
    'uniform float u_dark;',

    // value noise + fbm
    'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
    'float noise(vec2 p){',
    '  vec2 i = floor(p), f = fract(p);',
    '  vec2 u = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),',
    '             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);',
    '}',
    'float fbm(vec2 p){',
    '  float v = 0.0, a = 0.5;',
    '  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }',
    '  return v;',
    '}',

    'void main(){',
    '  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);',
    '  float t = u_time * 0.06;',

    // pointer pulls the flow towards it
    '  vec2 toward = uv - u_pointer;',
    '  float pull = 0.22 / (dot(toward, toward) + 0.35);',
    '  uv -= toward * pull * 0.13;',

    // domain warping — the "liquid" part
    '  vec2 q = vec2(fbm(uv * 1.6 + t), fbm(uv * 1.6 + vec2(4.3, 1.7) - t));',
    '  vec2 r = vec2(fbm(uv * 2.1 + 3.4 * q + vec2(1.2, 9.2) + t * 1.4),',
    '                fbm(uv * 2.1 + 3.4 * q + vec2(8.3, 2.8) - t * 1.1));',
    '  float f = fbm(uv * 2.4 + 3.2 * r);',

    // metallic banding — the "metal" part
    '  float bands = sin((f * 7.0 + r.x * 3.0 + t * 2.2) * 3.14159);',
    '  float sheen = pow(abs(bands), 2.2);',

    // ink-blue ramp: near-black -> deep navy -> brand blue -> pale sky
    '  vec3 c0 = mix(vec3(0.016, 0.031, 0.078), vec3(0.035, 0.078, 0.180), smoothstep(0.15, 0.75, f));',
    '  vec3 c1 = mix(c0, vec3(0.118, 0.227, 0.541), smoothstep(0.35, 0.95, f + r.y * 0.35));',
    '  vec3 col = mix(c1, vec3(0.639, 0.769, 0.996), sheen * 0.55 * smoothstep(0.25, 1.0, f));',

    // a breath of blueberry violet in the troughs
    '  col += vec3(0.06, 0.03, 0.12) * (1.0 - smoothstep(0.0, 0.6, f));',

    // light mode: lift the whole ramp towards paper
    '  vec3 paper = mix(vec3(0.937, 0.953, 0.980), vec3(0.478, 0.612, 0.898), sheen * 0.5 + f * 0.35);',
    '  col = mix(paper, col, u_dark);',

    // vignette so the type on top always reads
    '  float vig = smoothstep(1.25, 0.15, length(uv));',
    '  col *= mix(0.72, 1.0, vig);',

    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('liquid: shader failed —', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('liquid: link failed —', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  // Fullscreen triangle
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, 'u_res');
  var uTime = gl.getUniformLocation(prog, 'u_time');
  var uPointer = gl.getUniformLocation(prog, 'u_pointer');
  var uDark = gl.getUniformLocation(prog, 'u_dark');

  var pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  var visible = true;
  var running = false;
  var raf = 0;

  // The hero is a deep-water stage in both themes: white type sits on it, so
  // the ramp must stay dark regardless of the page theme.
  function isDark() {
    return 1;
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    var w = Math.round(canvas.clientWidth * dpr);
    var h = Math.round(canvas.clientHeight * dpr);
    if (w === canvas.width && h === canvas.height) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  }

  function draw(ms) {
    raf = 0;
    resize();

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, reduced ? 8.0 : (ms || 0) * 0.001);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.uniform1f(uDark, isDark());
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (!reduced && visible) schedule();
    else running = false;
  }

  function schedule() {
    if (raf) return;
    running = true;
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function () {
    if (!running) schedule();
  });

  window.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    var m = Math.min(r.width, r.height) || 1;
    pointer.tx = (e.clientX - r.left - r.width / 2) / m;
    pointer.ty = -(e.clientY - r.top - r.height / 2) / m;
    if (!running) schedule();
  }, { passive: true });

  // Stop drawing once the hero scrolls away
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    }, { threshold: 0.01 }).observe(canvas);
  }

  // Repaint when the theme flips, even while paused
  new MutationObserver(function () {
    schedule();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  schedule();
})();
