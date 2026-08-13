/* ==========================================================================
   حرف — التطبيق

   موجّه بسيط على الـhash، وكل شاشة دالة تُرجع HTML. الحالة كلها في
   HARF_STORE، فإعادة الرسم لا تفقد شيئًا.
   ========================================================================== */
(function () {
  'use strict';

  var D = window.HARF_DATA;
  var S = window.HARF_STORE;
  var cover = window.HARF_COVER;

  var app = document.getElementById('app');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------- helpers */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function levelChip(levelId) {
    var lv = D.levelOf(levelId);
    return '<span class="chip chip-' + lv.id + '"><i class="dot"></i>' + esc(lv.ar) + '</span>';
  }

  /* شارة الحالة على البطاقة: منتهية، أو جارية، أو مجانية. */
  function statusBadge(story) {
    var p = S.progressFor(story.id);
    if (p.done) {
      return '<span class="badge badge-done" title="مكتملة" aria-label="مكتملة">' +
        '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    }
    if (p.line > 0) {
      var pct = Math.round((p.line / story.lines.length) * 100);
      return '<span class="badge badge-part" aria-label="' + pct + '٪ مقروءة">' + pct + '<i>٪</i></span>';
    }
    if (story.free) return '<span class="badge badge-free">مجانية</span>';
    return '';
  }

  function storyCard(story) {
    var p = S.progressFor(story.id);
    var pct = story.lines.length ? (p.line / story.lines.length) * 100 : 0;
    return '<a class="scard" href="#/story/' + story.id + '">' +
      '<span class="scard-art">' + cover(story) +
        '<span class="scard-en">' + esc(story.en) + '</span>' +
        statusBadge(story) +
        (pct > 0 && pct < 100 ? '<span class="scard-bar"><i style="width:' + pct + '%"></i></span>' : '') +
      '</span>' +
      '<span class="scard-body">' +
        '<span class="scard-title">' + esc(story.ar) + '</span>' +
        '<span class="scard-blurb">' + esc(story.blurb) + '</span>' +
        '<span class="scard-meta">' + levelChip(story.level) +
          '<span class="scard-lines">' + story.lines.length + ' أسطر</span>' +
        '</span>' +
      '</span>' +
    '</a>';
  }

  /* ============================================================ الرئيسية */
  function viewHome() {
    var last = S.state.lastStory ? D.storyOf(S.state.lastStory) : null;
    var lastP = last ? S.progressFor(last.id) : null;
    var week = S.week();
    var max = Math.max.apply(null, week.map(function (d) { return d.count; }).concat([1]));
    var dayNames = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

    var resume = '';
    if (last && !lastP.done) {
      resume = '<a class="resume" href="#/story/' + last.id + '">' +
        '<span class="resume-art">' + cover(last) + '</span>' +
        '<span class="resume-body">' +
          '<span class="resume-k">أكمل من حيث وقفت</span>' +
          '<span class="resume-t">' + esc(last.ar) + '</span>' +
          '<span class="resume-en">' + esc(last.en) + '</span>' +
          '<span class="resume-bar"><i style="width:' +
            ((lastP.line / last.lines.length) * 100) + '%"></i></span>' +
          '<span class="resume-n">السطر ' + (lastP.line + 1) + ' من ' + last.lines.length + '</span>' +
        '</span>' +
      '</a>';
    }

    var picks = D.STORIES.filter(function (s) { return !S.progressFor(s.id).done; }).slice(0, 4);

    return '<div class="view">' +
      '<header class="phead">' +
        '<p class="peyebrow">حرف</p>' +
        '<h1 class="ptitle">اقرأ سطرًا، وافهمه</h1>' +
        '<p class="plede">قصص إنجليزية متدرّجة مع الترجمة العربية لكل سطر. اضغط أي كلمة لتعرف معناها، أو استمع للسطر كاملًا.</p>' +
      '</header>' +

      resume +

      '<section class="stats">' +
        '<div class="stat-card"><span class="stat-n">' + S.streak() + '</span><span class="stat-k">يوم متواصل</span></div>' +
        '<div class="stat-card"><span class="stat-n">' + S.linesRead() + '</span><span class="stat-k">سطر مقروء</span></div>' +
        '<div class="stat-card"><span class="stat-n">' + S.storiesDone() + '</span><span class="stat-k">قصة مكتملة</span></div>' +
        '<div class="stat-card"><span class="stat-n">' + S.knownCount() + '</span><span class="stat-k">كلمة محفوظة</span></div>' +
      '</section>' +

      '<section class="panel">' +
        '<h2 class="h-sec">آخر سبعة أيام</h2>' +
        '<div class="wchart">' +
          week.map(function (d, i) {
            var date = new Date(d.key + 'T00:00:00');
            var pct = d.count ? Math.max(8, (d.count / max) * 100) : 3;
            return '<div class="wcol"><div class="wbar' + (d.count ? '' : ' is-zero') +
              '" style="--h:' + pct + '%" title="' + d.count + ' سطر"></div>' +
              '<span class="wday">' + dayNames[date.getDay()] + '</span></div>';
          }).join('') +
        '</div>' +
      '</section>' +

      '<section class="panel">' +
        '<div class="sec-head"><h2 class="h-sec">اقترحنا لك</h2>' +
        '<a class="linkish" href="#/library">كل القصص ←</a></div>' +
        '<div class="grid grid-4">' + picks.map(storyCard).join('') + '</div>' +
      '</section>' +
    '</div>';
  }

  /* ============================================================= المسارات */
  function viewPaths() {
    return '<div class="view">' +
      '<header class="phead">' +
        '<h1 class="ptitle">المسارات</h1>' +
        '<p class="plede">ابدأ من مستواك وتدرّج. كل مستوى يبني على الذي قبله.</p>' +
      '</header>' +
      D.LEVELS.map(function (lv) {
        var list = D.STORIES.filter(function (s) { return s.level === lv.id; });
        var done = list.filter(function (s) { return S.progressFor(s.id).done; }).length;
        return '<section class="path" id="lv-' + lv.id + '">' +
          '<div class="path-head path-' + lv.id + '">' +
            '<h2><i class="dot"></i>' + esc(lv.ar) + '</h2>' +
            '<span class="path-tag">' + esc(lv.en) + '</span>' +
            '<span class="path-rule"></span>' +
            '<span class="path-count" dir="ltr">' + done + ' / ' + list.length + '</span>' +
          '</div>' +
          '<div class="grid grid-4">' + list.map(storyCard).join('') + '</div>' +
        '</section>';
      }).join('') +
    '</div>';
  }

  /* ============================================================== المكتبة */
  var libFilter = { level: 'all', status: 'all', q: '' };

  function libMatches(s) {
    if (libFilter.level !== 'all' && s.level !== libFilter.level) return false;

    var p = S.progressFor(s.id);
    if (libFilter.status === 'done' && !p.done) return false;
    if (libFilter.status === 'reading' && !(p.line > 0 && !p.done)) return false;
    if (libFilter.status === 'new' && p.line > 0) return false;

    if (libFilter.q) {
      var q = libFilter.q.toLowerCase();
      if ((s.en + ' ' + s.ar + ' ' + s.blurb).toLowerCase().indexOf(q) === -1) return false;
    }
    return true;
  }

  function libResults() {
    var list = D.STORIES.filter(libMatches);
    return list.length
      ? '<div class="grid grid-4">' + list.map(storyCard).join('') + '</div>'
      : '<p class="empty">ما فيه قصة تطابق البحث. جرّب كلمة أخرى أو امسح المرشّحات.</p>';
  }

  function viewLibrary() {
    function chips(name, options) {
      return options.map(function (o) {
        var on = libFilter[name] === o.v;
        return '<button type="button" class="fchip' + (on ? ' is-on' : '') +
          '" data-filter="' + name + '" data-value="' + o.v + '" aria-pressed="' + on + '">' +
          (o.dot ? '<i class="dot dot-' + o.v + '"></i>' : '') + esc(o.t) + '</button>';
      }).join('');
    }

    return '<div class="view">' +
      '<header class="phead">' +
        '<h1 class="ptitle">المكتبة</h1>' +
        '<p class="plede">كل القصص في مكان واحد.</p>' +
      '</header>' +

      '<div class="filters">' +
        '<div class="search">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" stroke-linecap="round"/></svg>' +
          '<input type="search" id="lib-q" placeholder="ابحث عن قصة…" aria-label="ابحث عن قصة" value="' + esc(libFilter.q) + '">' +
        '</div>' +
        '<div class="fchips">' +
          chips('level', [{ v: 'all', t: 'كل المستويات' }, { v: 'a1', t: 'مبتدئ', dot: 1 },
                          { v: 'a2', t: 'متوسط', dot: 1 }, { v: 'b1', t: 'متقدم', dot: 1 }]) +
        '</div>' +
        '<div class="fchips">' +
          chips('status', [{ v: 'all', t: 'الكل' }, { v: 'new', t: 'لم تُقرأ' },
                           { v: 'reading', t: 'جارية' }, { v: 'done', t: 'مكتملة' }]) +
        '</div>' +
      '</div>' +

      '<div id="lib-results">' + libResults() + '</div>' +
    '</div>';
  }

  /* ========================================================= قوائم الكلمات */
  function viewWords() {
    return '<div class="view">' +
      '<header class="phead">' +
        '<h1 class="ptitle">قوائم الكلمات</h1>' +
        '<p class="plede">اقلب البطاقة لتشوف المعنى، وعلّم الكلمة إذا حفظتها.</p>' +
      '</header>' +
      D.WORDLISTS.map(function (list) {
        var known = list.words.filter(function (w) { return S.isKnown(w.en); }).length;
        return '<section class="panel">' +
          '<div class="sec-head">' +
            '<h2 class="h-sec">' + esc(list.ar) + '</h2>' +
            '<span class="wl-count"><b dir="ltr">' + known + ' / ' + list.words.length + '</b> محفوظة</span>' +
          '</div>' +
          '<div class="wgrid">' +
            list.words.map(function (w) {
              var on = S.isKnown(w.en);
              return '<button type="button" class="wcard' + (on ? ' is-known' : '') +
                '" data-word="' + esc(w.en) + '" aria-pressed="' + on + '">' +
                '<span class="wcard-in">' +
                  '<span class="wcard-face wcard-en" dir="ltr">' + esc(w.en) + '</span>' +
                  '<span class="wcard-face wcard-ar">' + esc(w.ar) + '</span>' +
                '</span></button>';
            }).join('') +
          '</div>' +
        '</section>';
      }).join('') +
    '</div>';
  }

  /* =============================================================== القارئ */
  var reader = null;

  function viewStory(id) {
    var story = D.storyOf(id);
    if (!story) return '<div class="view"><p class="empty">ما لقينا هذي القصة.</p></div>';

    var p = S.progressFor(id);
    var at = Math.min(p.line, story.lines.length - 1);

    return '<div class="view view-reader">' +
      '<a class="back" href="#/library">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        'رجوع للمكتبة</a>' +

      '<header class="rhead">' +
        '<div class="rhead-art">' + cover(story) + '</div>' +
        '<div class="rhead-body">' +
          levelChip(story.level) +
          '<h1 class="rtitle">' + esc(story.ar) + '</h1>' +
          '<p class="rtitle-en" dir="ltr">' + esc(story.en) + '</p>' +
          '<p class="rblurb">' + esc(story.blurb) + '</p>' +
        '</div>' +
      '</header>' +

      '<div class="rbar">' +
        '<div class="rprog"><i id="rprog-fill" style="width:' +
          ((p.line / story.lines.length) * 100) + '%"></i></div>' +
        '<span class="rprog-n" id="rprog-n" dir="ltr">' + p.line + ' / ' + story.lines.length + '</span>' +
        '<button type="button" class="rtoggle" id="toggle-ar" aria-pressed="true">إخفاء الترجمة</button>' +
        '<button type="button" class="rtoggle" id="reset-story">من البداية</button>' +
      '</div>' +

      '<ol class="lines" id="lines" data-story="' + esc(id) + '">' +
        story.lines.map(function (line, i) {
          return '<li class="line' + (i === at ? ' is-active' : '') + (i < p.line ? ' is-read' : '') +
            '" data-i="' + i + '" tabindex="0">' +
            '<span class="line-n">' + (i + 1) + '</span>' +
            '<div class="line-main">' +
              '<p class="line-en" dir="ltr">' + words(line) + '</p>' +
              '<p class="line-ar">' + esc(line.ar) + '</p>' +
            '</div>' +
            '<button type="button" class="line-say" data-say="' + esc(line.en) + '" aria-label="استمع للسطر">' +
              '<svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4z" stroke-linejoin="round"/>' +
              '<path d="M15.5 8.5a5 5 0 0 1 0 7" stroke-linecap="round"/></svg>' +
            '</button>' +
          '</li>';
        }).join('') +
      '</ol>' +

      '<div class="rdone" id="rdone">' +
        '<p class="rdone-t">خلّصت القصة</p>' +
        '<p class="rdone-s">كل سطر قرأته ينحسب في تقدّمك.</p>' +
        '<a class="btn btn-primary" href="#/library">قصة ثانية</a>' +
      '</div>' +
    '</div>';
  }

  /* كل كلمة عنصر مستقل حتى تُنقر — والكلمات المشروحة تُعلَّم بخط سفلي. */
  function words(line) {
    return line.en.split(/(\s+)/).map(function (token) {
      if (/^\s+$/.test(token)) return token;
      var bare = token.replace(/[^A-Za-z'-]/g, '').toLowerCase();
      if (!bare) return esc(token);
      var gloss = null;
      for (var k in line.w) {
        if (k.toLowerCase() === bare || k.toLowerCase().split(' ')[0] === bare) { gloss = line.w[k]; break; }
      }
      return '<button type="button" class="w' + (gloss ? ' has-gloss' : '') +
        (S.isKnown(bare) ? ' is-known' : '') + '" data-w="' + esc(bare) + '"' +
        (gloss ? ' data-gloss="' + esc(gloss) + '"' : '') + '>' + esc(token) + '</button>';
    }).join('');
  }

  /* ---------------------------------------------------------- speech */
  function say(text, lang) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = lang || 'en-US';
      u.rate = 0.88;
      window.speechSynthesis.speak(u);
    } catch (e) { /* بعض المتصفحات ترفض بدون تفاعل — نتجاهل بهدوء */ }
  }

  /* --------------------------------------------------- reader behaviour */
  function wireReader(id) {
    var story = D.storyOf(id);
    if (!story) return;

    var list = document.getElementById('lines');
    var fill = document.getElementById('rprog-fill');
    var num = document.getElementById('rprog-n');
    var done = document.getElementById('rdone');
    var showAr = true;

    function refresh() {
      var p = S.progressFor(id);
      fill.style.width = ((p.line / story.lines.length) * 100) + '%';
      num.textContent = p.line + ' / ' + story.lines.length;  // العنصر نفسه dir=ltr
      done.classList.toggle('is-on', p.done);
    }

    function activate(i, opts) {
      i = Math.max(0, Math.min(story.lines.length - 1, i));
      var items = list.querySelectorAll('.line');
      items.forEach(function (n, j) {
        n.classList.toggle('is-active', j === i);
        if (j <= i) n.classList.add('is-read');
      });
      S.markLine(id, i, story.lines.length);
      refresh();

      if (opts && opts.scroll) {
        items[i].scrollIntoView({ block: 'center', behavior: reduced.matches ? 'auto' : 'smooth' });
      }
      if (opts && opts.speak) say(story.lines[i].en);
      return i;
    }

    function currentIndex() {
      var active = list.querySelector('.line.is-active');
      return active ? Number(active.dataset.i) : 0;
    }

    // ضغطة على السطر تنشّطه؛ وضغطة على كلمة تعرض معناها بدل ما تنقل التنشيط.
    list.addEventListener('click', function (e) {
      var sayBtn = e.target.closest('.line-say');
      if (sayBtn) { say(sayBtn.dataset.say); return; }

      var word = e.target.closest('.w');
      if (word) { showGloss(word); return; }

      var li = e.target.closest('.line');
      if (li) activate(Number(li.dataset.i), {});
    });

    list.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var li = e.target.closest('.line');
        if (li && e.target === li) { e.preventDefault(); activate(Number(li.dataset.i), { speak: true }); }
      }
    });

    document.getElementById('toggle-ar').addEventListener('click', function () {
      showAr = !showAr;
      list.classList.toggle('hide-ar', !showAr);
      this.textContent = showAr ? 'إخفاء الترجمة' : 'إظهار الترجمة';
      this.setAttribute('aria-pressed', String(showAr));
    });

    document.getElementById('reset-story').addEventListener('click', function () {
      S.resetStory(id);
      list.querySelectorAll('.line').forEach(function (n, j) {
        n.classList.toggle('is-active', j === 0);
        n.classList.remove('is-read');
      });
      refresh();
      list.querySelector('.line').scrollIntoView({ block: 'center', behavior: reduced.matches ? 'auto' : 'smooth' });
    });

    // الأسهم تتنقّل بين الأسطر — القراءة بالكيبورد وحدها ممكنة.
    reader = function (e) {
      if (e.target.matches('input, textarea')) return;
      if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); activate(currentIndex() + 1, { scroll: true }); }
      else if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); activate(currentIndex() - 1, { scroll: true }); }
      else if (e.key === 'Enter') { e.preventDefault(); say(story.lines[currentIndex()].en); }
    };
    document.addEventListener('keydown', reader);

    refresh();
  }

  /* ------------------------------------------------------------- الشرح */
  var pop = null;

  function showGloss(btn) {
    hideGloss();
    var word = btn.dataset.w;
    var gloss = btn.dataset.gloss;
    var known = S.isKnown(word);

    pop = el('<div class="pop" role="dialog" aria-label="معنى الكلمة">' +
      '<p class="pop-w" dir="ltr">' + esc(word) + '</p>' +
      (gloss ? '<p class="pop-g">' + esc(gloss) + '</p>' : '<p class="pop-g pop-none">ما فيه شرح لهذي الكلمة</p>') +
      '<div class="pop-acts">' +
        '<button type="button" class="pop-b" data-act="say">استمع</button>' +
        '<button type="button" class="pop-b' + (known ? ' is-on' : '') + '" data-act="know">' +
          (known ? 'محفوظة ✓' : 'علّمها محفوظة') + '</button>' +
      '</div>' +
    '</div>');

    document.body.appendChild(pop);

    var r = btn.getBoundingClientRect();
    var top = r.bottom + 10;
    // لو ما فيه مكان تحت الكلمة، الشرح يطلع فوقها بدل ما يخرج من الشاشة.
    if (top + pop.offsetHeight > window.innerHeight - 12) top = r.top - pop.offsetHeight - 10;
    var left = r.left + r.width / 2 - pop.offsetWidth / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - pop.offsetWidth - 12));
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
    pop.classList.add('is-in');

    pop.addEventListener('click', function (e) {
      var b = e.target.closest('.pop-b');
      if (!b) return;
      if (b.dataset.act === 'say') say(word);
      else {
        S.toggleKnown(word);
        document.querySelectorAll('.w[data-w="' + CSS.escape(word) + '"]').forEach(function (n) {
          n.classList.toggle('is-known', S.isKnown(word));
        });
        hideGloss();
      }
    });
  }

  function hideGloss() {
    if (pop && pop.parentNode) pop.parentNode.removeChild(pop);
    pop = null;
  }

  document.addEventListener('click', function (e) {
    if (pop && !e.target.closest('.pop') && !e.target.closest('.w')) hideGloss();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideGloss(); });
  window.addEventListener('resize', hideGloss);

  /* ============================================================ التوجيه */
  var ROUTES = [
    { re: /^#\/?$/,              view: viewHome,    nav: 'home' },
    { re: /^#\/paths$/,          view: viewPaths,   nav: 'paths' },
    { re: /^#\/library$/,        view: viewLibrary, nav: 'library' },
    { re: /^#\/words$/,          view: viewWords,   nav: 'words' },
    { re: /^#\/story\/([\w-]+)$/, view: viewStory,  nav: 'library' }
  ];

  function render() {
    // القارئ السابق يترك مستمع كيبورد على المستند — نفكّه قبل أي رسم جديد.
    if (reader) { document.removeEventListener('keydown', reader); reader = null; }
    hideGloss();

    var hash = location.hash || '#/';
    var match = null, arg = null;

    for (var i = 0; i < ROUTES.length; i++) {
      var m = hash.match(ROUTES[i].re);
      if (m) { match = ROUTES[i]; arg = m[1]; break; }
    }
    if (!match) { location.hash = '#/'; return; }

    app.innerHTML = match.view(arg);
    app.scrollTop = 0;
    window.scrollTo(0, 0);

    document.querySelectorAll('.nav-item').forEach(function (n) {
      var on = n.dataset.nav === match.nav;
      n.classList.toggle('is-on', on);
      if (on) n.setAttribute('aria-current', 'page');
      else n.removeAttribute('aria-current');
    });

    if (match.nav === 'library') wireLibrary();
    if (match.nav === 'words') wireWords();
    if (arg) wireReader(arg);

    document.body.classList.remove('menu-open');
  }

  function wireLibrary() {
    var results = document.getElementById('lib-results');
    if (!results) return;

    document.querySelectorAll('.fchip').forEach(function (b) {
      b.addEventListener('click', function () {
        libFilter[b.dataset.filter] = b.dataset.value;
        document.querySelectorAll('.fchip[data-filter="' + b.dataset.filter + '"]').forEach(function (o) {
          var on = o === b;
          o.classList.toggle('is-on', on);
          o.setAttribute('aria-pressed', String(on));
        });
        results.innerHTML = libResults();
      });
    });

    var q = document.getElementById('lib-q');
    if (q) {
      q.addEventListener('input', function () {
        libFilter.q = q.value.trim();
        results.innerHTML = libResults();
      });
    }
  }

  function wireWords() {
    document.querySelectorAll('.wcard').forEach(function (card) {
      card.addEventListener('click', function () {
        // نقرة واحدة تقلب البطاقة، والثانية تعلّمها محفوظة.
        if (!card.classList.contains('is-flipped')) {
          card.classList.add('is-flipped');
          say(card.dataset.word);
          return;
        }
        S.toggleKnown(card.dataset.word);
        var on = S.isKnown(card.dataset.word);
        card.classList.toggle('is-known', on);
        card.setAttribute('aria-pressed', String(on));
        card.classList.remove('is-flipped');
      });
    });
  }

  /* ------------------------------------------------------------- القائمة */
  var menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
  }
  document.querySelector('.scrim').addEventListener('click', function () {
    document.body.classList.remove('menu-open');
  });

  window.addEventListener('hashchange', render);
  render();
})();
