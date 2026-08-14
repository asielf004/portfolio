/* ==========================================================================
   حرف — أغلفة القصص

   لا صور خارجية في المشروع: كل غلاف يُرسم SVG من `hue` القصة ومن بذرة
   مشتقّة من مُعرّفها، فيخرج ثابتًا لنفس القصة ومختلفًا بين قصة وأخرى،
   ويبقى التطبيق يعمل كاملًا بلا شبكة.
   ========================================================================== */
(function (global) {
  'use strict';

  var W = 400, H = 560;

  function seedFrom(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  /* mulberry32 — صغير وكافٍ، والمهم أنه ثابت لنفس البذرة. */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* الأغلفة تُطبع على ورق فاتح، والزخارف كُتبت أصلًا بأحبار فاتحة على أرضية
     داكنة. قلب الإضاءة هنا يحوّلها كلها دفعة واحدة إلى حبر غامق على أرضية
     فاتحة — بدل إعادة ضبط أربعة عشر زخرفًا يدويًا. */
  function hsl(h, s, l, a) {
    var L = Math.max(14, Math.min(72, 100 - l));
    var S = Math.min(s, 58);
    var A = a == null ? 1 : Math.min(1, a * 1.25);
    return 'hsla(' + h + ',' + S + '%,' + L + '%,' + A + ')';
  }

  /* ---------------------------------------------------------- the motifs */
  var MOTIFS = {
    rain: function (r, h) {
      var out = '';
      for (var i = 0; i < 46; i++) {
        var x = r() * W, y = r() * H, len = 26 + r() * 54;
        out += '<line x1="' + x + '" y1="' + y + '" x2="' + (x - 14) + '" y2="' + (y + len) +
          '" stroke="' + hsl(h - 8, 80, 86, 0.16 + r() * 0.3) + '" stroke-width="' + (1 + r() * 1.6) + '"/>';
      }
      for (var j = 0; j < 5; j++) {
        var cx = r() * W, cy = H - 40 - r() * 70;
        out += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (20 + r() * 46) + '" ry="' + (4 + r() * 5) +
          '" fill="none" stroke="' + hsl(h, 70, 88, 0.2) + '" stroke-width="1.4"/>';
      }
      return out;
    },

    room: function (r, h) {
      return '<rect x="52" y="286" width="296" height="150" rx="16" fill="' + hsl(h, 46, 62, 0.34) + '"/>' +
        '<rect x="52" y="252" width="140" height="58" rx="14" fill="' + hsl(h, 50, 74, 0.4) + '"/>' +
        '<rect x="236" y="76" width="122" height="150" rx="10" fill="' + hsl(h + 16, 62, 84, 0.28) + '"/>' +
        '<line x1="297" y1="76" x2="297" y2="226" stroke="' + hsl(h, 40, 92, 0.34) + '" stroke-width="3"/>' +
        '<line x1="236" y1="151" x2="358" y2="151" stroke="' + hsl(h, 40, 92, 0.34) + '" stroke-width="3"/>' +
        '<circle cx="96" cy="150" r="30" fill="' + hsl(h + 30, 60, 78, 0.26) + '"/>';
    },

    keys: function (r, h) {
      var out = '';
      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 5; col++) {
          var x = 44 + col * 64 + row * 9;
          var y = 168 + row * 62;
          out += '<rect x="' + x + '" y="' + y + '" width="54" height="52" rx="11" fill="' +
            hsl(h + row * 5, 55, 76, 0.14 + r() * 0.2) + '" stroke="' + hsl(h, 60, 86, 0.24) + '"/>';
        }
      }
      return out;
    },

    books: function (r, h) {
      var out = '', x = 34;
      while (x < W - 40) {
        var w = 20 + r() * 30, tall = 150 + r() * 210;
        out += '<rect x="' + x + '" y="' + (H - 60 - tall) + '" width="' + w + '" height="' + tall +
          '" rx="5" fill="' + hsl(h + r() * 60 - 30, 58, 58 + r() * 22, 0.42) + '"/>';
        x += w + 7;
      }
      out += '<rect x="24" y="' + (H - 62) + '" width="' + (W - 48) + '" height="9" rx="4" fill="' + hsl(h, 40, 84, 0.3) + '"/>';
      return out;
    },

    cup: function (r, h) {
      var out = '<path d="M132 250 h136 v92 a68 68 0 0 1 -136 0 z" fill="' + hsl(h, 52, 70, 0.36) + '"/>' +
        '<path d="M268 268 a40 40 0 0 1 0 62" fill="none" stroke="' + hsl(h, 52, 78, 0.4) + '" stroke-width="12" stroke-linecap="round"/>' +
        '<ellipse cx="200" cy="250" rx="68" ry="17" fill="' + hsl(h + 18, 60, 84, 0.4) + '"/>';
      for (var i = 0; i < 3; i++) {
        var sx = 168 + i * 32;
        out += '<path d="M' + sx + ' 216 q 14 -30 0 -58 q -14 -28 0 -52" fill="none" stroke="' +
          hsl(h, 60, 90, 0.22 + i * 0.06) + '" stroke-width="4" stroke-linecap="round"/>';
      }
      return out;
    },

    flowers: function (r, h) {
      var out = '';
      for (var i = 0; i < 7; i++) {
        var x = 54 + i * 48 + (r() * 12 - 6);
        var top = 150 + r() * 130;
        out += '<path d="M' + x + ' ' + H + ' C ' + (x + 16) + ' ' + (top + 130) + ', ' +
          (x - 16) + ' ' + (top + 70) + ', ' + x + ' ' + top + '" fill="none" stroke="' +
          hsl(140, 40, 62, 0.36) + '" stroke-width="3.5"/>';
        var rad = 15 + r() * 13;
        out += '<circle cx="' + x + '" cy="' + top + '" r="' + rad + '" fill="' +
          hsl(h + r() * 50 - 25, 66, 70, 0.5) + '"/>';
        out += '<circle cx="' + x + '" cy="' + top + '" r="' + (rad * 0.4) + '" fill="' + hsl(h + 40, 70, 88, 0.55) + '"/>';
      }
      return out;
    },

    screen: function (r, h) {
      var out = '<rect x="56" y="146" width="288" height="188" rx="16" fill="' + hsl(h, 48, 22, 0.75) +
        '" stroke="' + hsl(h, 55, 74, 0.34) + '" stroke-width="2"/>';
      for (var i = 0; i < 9; i++) {
        out += '<rect x="72" y="' + (166 + i * 19) + '" width="' + (60 + r() * 200) + '" height="6" rx="3" fill="' +
          hsl(h + 10, 60, 80, 0.08 + r() * 0.16) + '"/>';
      }
      out += '<rect x="176" y="342" width="48" height="34" rx="6" fill="' + hsl(h, 45, 60, 0.34) + '"/>' +
        '<rect x="132" y="378" width="136" height="10" rx="5" fill="' + hsl(h, 45, 68, 0.34) + '"/>';
      return out;
    },

    waves: function (r, h) {
      var out = '';
      for (var i = 0; i < 9; i++) {
        var y = 150 + i * 40;
        var amp = 16 + r() * 22;
        out += '<path d="M-20 ' + y + ' q 60 ' + -amp + ' 120 0 t 120 0 t 120 0 t 120 0" fill="none" stroke="' +
          hsl(h + i * 4, 62, 74, 0.14 + r() * 0.24) + '" stroke-width="' + (2 + r() * 3) + '"/>';
      }
      return out;
    },

    lighthouse: function (r, h) {
      var out = '';
      for (var i = 0; i < 5; i++) {
        var spread = 60 + i * 46;
        out += '<path d="M200 196 L' + (200 - spread) + ' ' + H + ' L' + (200 + spread) + ' ' + H + ' z" fill="' +
          hsl(h, 80, 78, 0.05) + '"/>';
      }
      out += '<path d="M172 196 h56 l16 250 h-88 z" fill="' + hsl(h + 200, 24, 72, 0.4) + '"/>' +
        '<rect x="166" y="164" width="68" height="38" rx="8" fill="' + hsl(h, 82, 72, 0.62) + '"/>' +
        '<circle cx="200" cy="183" r="11" fill="' + hsl(h + 20, 92, 92, 0.85) + '"/>' +
        '<path d="M158 446 h84" stroke="' + hsl(h + 200, 24, 82, 0.4) + '" stroke-width="7"/>';
      return out;
    },

    tangle: function (r, h) {
      var out = '';
      for (var i = 0; i < 16; i++) {
        var x1 = r() * W, y1 = 120 + r() * 300;
        out += '<path d="M' + x1 + ' ' + y1 +
          ' C ' + (r() * W) + ' ' + (r() * H) + ', ' + (r() * W) + ' ' + (r() * H) + ', ' +
          (r() * W) + ' ' + (120 + r() * 300) + '" fill="none" stroke="' +
          hsl(h, 40, 84, 0.12 + r() * 0.16) + '" stroke-width="' + (1 + r() * 1.8) + '"/>';
      }
      return out;
    },

    sofa: function (r, h) {
      return '<rect x="48" y="268" width="304" height="120" rx="22" fill="' + hsl(h, 44, 60, 0.36) + '"/>' +
        '<rect x="48" y="222" width="304" height="76" rx="20" fill="' + hsl(h, 48, 68, 0.3) + '"/>' +
        '<rect x="36" y="248" width="46" height="140" rx="20" fill="' + hsl(h, 44, 66, 0.42) + '"/>' +
        '<rect x="318" y="248" width="46" height="140" rx="20" fill="' + hsl(h, 44, 66, 0.42) + '"/>' +
        '<rect x="104" y="238" width="82" height="62" rx="14" fill="' + hsl(h + 24, 52, 76, 0.34) + '"/>' +
        '<rect x="214" y="238" width="82" height="62" rx="14" fill="' + hsl(h + 24, 52, 76, 0.34) + '"/>' +
        '<rect x="86" y="388" width="16" height="34" rx="6" fill="' + hsl(h, 30, 48, 0.5) + '"/>' +
        '<rect x="298" y="388" width="16" height="34" rx="6" fill="' + hsl(h, 30, 48, 0.5) + '"/>';
    },

    road: function (r, h) {
      var out = '<path d="M120 ' + H + ' L170 150 h60 l50 ' + (H - 150) + ' z" fill="' + hsl(h, 40, 58, 0.26) + '"/>';
      for (var i = 0; i < 7; i++) {
        var t = i / 7;
        var y = 170 + t * (H - 200);
        var w = 6 + t * 16, hh = 16 + t * 34;
        out += '<rect x="' + (200 - w / 2) + '" y="' + y + '" width="' + w + '" height="' + hh +
          '" rx="3" fill="' + hsl(h + 20, 60, 88, 0.34) + '"/>';
      }
      out += '<circle cx="200" cy="126" r="30" fill="' + hsl(h + 30, 70, 76, 0.3) + '"/>';
      return out;
    },

    city: function (r, h) {
      var out = '', x = 20;
      while (x < W) {
        var w = 30 + r() * 44, tall = 120 + r() * 260;
        var y = H - tall;
        out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + tall +
          '" fill="' + hsl(h + 200, 26, 16 + r() * 12, 0.9) + '"/>';
        // نوافذ مضيئة متفرّقة — هي مصدر التوهّج في المقال
        for (var wy = y + 14; wy < H - 20; wy += 22) {
          for (var wx = x + 8; wx < x + w - 10; wx += 16) {
            if (r() > 0.45) {
              out += '<rect x="' + wx + '" y="' + wy + '" width="7" height="10" fill="' +
                hsl(h, 88, 74, 0.3 + r() * 0.5) + '"/>';
            }
          }
        }
        x += w + 5;
      }
      out += '<rect width="' + W + '" height="' + H + '" fill="' + hsl(h, 70, 60, 0.09) + '"/>';
      return out;
    },

    cells: function (r, h) {
      var out = '';
      for (var i = 0; i < 34; i++) {
        var cx = r() * W, cy = 90 + r() * (H - 150), rad = 9 + r() * 26;
        out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rad + '" fill="' +
          hsl(h + r() * 40 - 20, 58, 62, 0.16 + r() * 0.24) + '" stroke="' +
          hsl(h, 66, 80, 0.26) + '" stroke-width="1.4"/>';
        if (r() > 0.55) {
          out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (rad * 0.34) + '" fill="' + hsl(h + 30, 70, 86, 0.42) + '"/>';
        }
      }
      return out;
    }
  };

  /* --------------------------------------------------------------- build */
  function cover(story) {
    var r = rng(seedFrom(story.id));
    var h = story.hue;
    var motif = MOTIFS[story.motif] || MOTIFS.waves;
    var gid = 'g-' + story.id;

    return '<svg class="cover-art" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      '<defs>' +
        '<linearGradient id="' + gid + '" x1="0" y1="0" x2="0.6" y2="1">' +
          '<stop offset="0%" stop-color="hsl(' + (h + 18) + ',44%,93%)"/>' +
          '<stop offset="55%" stop-color="hsl(' + h + ',38%,87%)"/>' +
          '<stop offset="100%" stop-color="hsl(' + (h - 14) + ',34%,80%)"/>' +
        '</linearGradient>' +
        '<radialGradient id="' + gid + '-h" cx="0.7" cy="0.2" r="0.85">' +
          '<stop offset="0%" stop-color="hsla(42,60%,99%,0.75)"/>' +
          '<stop offset="100%" stop-color="hsla(42,60%,99%,0)"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="url(#' + gid + ')"/>' +
      '<rect width="' + W + '" height="' + H + '" fill="url(#' + gid + '-h)"/>' +
      motif(r, h) +
      '</svg>';
  }

  global.HARF_COVER = cover;
})(window);
