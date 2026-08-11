/* ==========================================================================
   ScrollGlobe — scroll tracking, section detection and globe transforms.
   Ports the original component's effect logic to plain JS.
   ========================================================================== */
(function () {
  'use strict';

  var stage = document.getElementById('globe-stage');
  var bar = document.getElementById('progress-fill');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.sg-section'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.sg-dot'));

  if (!stage || !sections.length) return;

  // The component's defaultGlobeConfig, unchanged — the page reads
  // left-to-right in English, so these land exactly as designed. Arabic
  // flips the reading direction, so the stops mirror to keep the sphere
  // clear of the text column.
  function baseStops() {
    var stops = [
      { top: 50, left: 75, scale: 1.4 },
      { top: 25, left: 50, scale: 0.9 },
      { top: 15, left: 90, scale: 2 },
      { top: 50, left: 50, scale: 1.8 }
    ];

    if (document.documentElement.dir === 'rtl') {
      stops = stops.map(function (p) {
        return { top: p.top, left: 100 - p.left, scale: p.scale };
      });
    }
    return stops;
  }

  var POSITIONS = baseStops();

  var active = -1;
  var ticking = false;

  function transformFor(i) {
    var p = POSITIONS[Math.min(i, POSITIONS.length - 1)];
    return 'translate3d(' + p.left + 'vw, ' + p.top + 'vh, 0)' +
           ' translate3d(-50%, -50%, 0)' +
           ' scale3d(' + p.scale + ', ' + p.scale + ', 1)';
  }

  function updateScrollPosition() {
    ticking = false;

    var scrollTop = window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

    if (bar) bar.style.transform = 'scaleX(' + progress + ')';

    var viewportCenter = window.innerHeight / 2;
    var next = 0;
    var minDistance = Infinity;

    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      var distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        next = i;
      }
    }

    stage.style.transform = transformFor(next);
    // The last section uses the globe as a dimmed backdrop
    stage.style.filter = 'opacity(' + (next === 3 ? 0.4 : 0.85) + ')';

    if (next !== active) {
      active = next;
      dots.forEach(function (dot, i) {
        var on = i === active;
        dot.classList.toggle('is-active', on);
        dot.setAttribute('aria-current', on ? 'true' : 'false');
      });
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollPosition);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // Recompute the stops when the reading direction flips
  document.addEventListener('langchange', function () {
    POSITIONS = baseStops();
    active = -1;
    onScroll();
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      sections[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  updateScrollPosition();
})();
