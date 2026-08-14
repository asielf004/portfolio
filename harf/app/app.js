/* ==========================================================================
   حرف — التطبيق

   موجّه على الـhash، وكل شاشة دالة تُرجع HTML. الحالة كلها في HARF_STORE،
   فإعادة الرسم لا تفقد شيئًا. الواجهة عربية دائمًا؛ ما يتبدّل هو لغة
   القراءة — إنجليزي أو فرنسي.
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

  /* النصوص المتاحة في لغة القراءة الحالية */
  function inLang() {
    var lang = S.contentLang();
    return D.TEXTS.filter(function (t) { return t.lang === lang; });
  }

  function levelChip(id) {
    var lv = D.levelOf(id);
    return '<span class="chip lv-' + lv.id + '"><i class="dot"></i>' + esc(lv.ar) + '</span>';
  }

  function ring(pct, done) {
    if (done) {
      return '<span class="tick" aria-label="مكتمل"><svg viewBox="0 0 24 24">' +
        '<path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    }
    if (!pct) return '<span class="ring-space" aria-hidden="true"></span>';
    var C = 2 * Math.PI * 13;
    return '<svg class="ring" viewBox="0 0 30 30" aria-label="' + Math.round(pct) + '٪">' +
      '<circle class="bg" cx="15" cy="15" r="13"/>' +
      '<circle class="fg" cx="15" cy="15" r="13" stroke-dasharray="' + C +
      '" stroke-dashoffset="' + (C - (pct / 100) * C) + '"/></svg>';
  }

  /* صف الفهرس — الوحدة الأساسية في كل الشاشات */
  function entry(text) {
    var p = S.progressFor(text.id);
    var pct = text.lines.length ? (p.line / text.lines.length) * 100 : 0;
    var kind = D.kindOf(text.kind);
    var lang = D.langOf(text.lang);

    return '<a class="entry" href="#/read/' + text.id + '">' +
      '<span class="entry-art">' + cover(text) + '</span>' +
      '<span class="entry-body">' +
        '<span class="entry-titles">' +
          '<span class="entry-ar">' + esc(text.ar) + '</span>' +
          '<span class="entry-orig">' + esc(text.en) + '</span>' +
        '</span>' +
        '<span class="entry-blurb">' + esc(text.blurb) + '</span>' +
        '<span class="entry-meta">' +
          levelChip(text.level) +
          '<i class="sep"></i><span class="tag-kind">' + esc(kind.ar) + '</span>' +
          '<i class="sep"></i><span class="tag-lang">' + esc(lang.native) + '</span>' +
          '<i class="sep"></i><span>' + D.minutesFor(text) + ' د</span>' +
        '</span>' +
      '</span>' +
      '<span class="entry-end">' + ring(pct, p.done) + '</span>' +
    '</a>';
  }

  function entryList(list) {
    return '<div class="entries">' + list.map(entry).join('') + '</div>';
  }

  /* ============================================================ الرئيسية */
  function viewHome() {
    var mine = inLang();
    var last = S.state.lastText ? D.textOf(S.state.lastText) : null;
    if (last && last.lang !== S.contentLang()) last = null;
    var lastP = last ? S.progressFor(last.id) : null;

    var week = S.week();
    var max = Math.max.apply(null, week.map(function (d) { return d.count; }).concat([1]));
    var dayNames = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

    var resume = '';
    if (last && lastP && !lastP.done) {
      resume = '<a class="resume" href="#/read/' + last.id + '">' +
        '<span class="resume-art">' + cover(last) + '</span>' +
        '<span class="resume-body">' +
          '<span class="resume-k">أكمل من حيث وقفت</span>' +
          '<span class="resume-t">' + esc(last.ar) + '</span>' +
          '<span class="resume-orig">' + esc(last.en) + '</span>' +
          '<span class="resume-line">السطر ' + (lastP.line + 1) + ' من ' + last.lines.length + '</span>' +
          '<span class="resume-bar"><i style="width:' +
            ((lastP.line / last.lines.length) * 100) + '%"></i></span>' +
        '</span>' +
      '</a>';
    }

    var fresh = mine.filter(function (t) { return !S.progressFor(t.id).line; }).slice(0, 5);
    var langName = D.langOf(S.contentLang()).ar;

    return '<div class="view">' +
      '<header class="phead">' +
        '<p class="peyebrow">حرف</p>' +
        '<h1 class="ptitle">اقرأ وافهم</h1>' +
        '<p class="plede">قصص ومقالات بـ' + esc(langName) +
          '، من المبتدئ إلى المتمكّن. كل سطر ومعناه بالعربي تحته، وأي كلمة تضغطها يظهر معناها.</p>' +
      '</header>' +

      resume +

      '<section class="stats">' +
        '<div><span class="stat-n">' + S.streak() + '</span><span class="stat-k">يوم متواصل</span></div>' +
        '<div><span class="stat-n">' + S.linesRead() + '</span><span class="stat-k">سطر مقروء</span></div>' +
        '<div><span class="stat-n">' + S.textsDone() + '</span><span class="stat-k">نص مكتمل</span></div>' +
        '<div><span class="stat-n">' + S.knownCount() + '</span><span class="stat-k">كلمة محفوظة</span></div>' +
      '</section>' +

      '<section class="sec">' +
        '<div class="sec-head"><h2 class="h-sec">آخر سبعة أيام</h2></div>' +
        '<div class="wchart">' +
          week.map(function (d) {
            var date = new Date(d.key + 'T00:00:00');
            var pct = d.count ? Math.max(9, (d.count / max) * 100) : 3;
            return '<div class="wcol"><div class="wbar' + (d.count ? '' : ' is-zero') +
              '" style="--h:' + pct + '%" title="' + d.count + ' سطر"></div>' +
              '<span class="wday">' + dayNames[date.getDay()] + '</span></div>';
          }).join('') +
        '</div>' +
      '</section>' +

      '<section class="sec">' +
        '<div class="sec-head"><h2 class="h-sec">ابدأ بواحد من هذي</h2>' +
        '<a class="linkish" href="#/library">كل النصوص ←</a></div>' +
        (fresh.length ? entryList(fresh) : '<p class="empty">خلّصت كل النصوص في هذي اللغة.</p>') +
      '</section>' +
    '</div>';
  }

  /* ============================================================= المسارات */
  function viewPaths() {
    var mine = inLang();
    return '<div class="view">' +
      '<header class="phead">' +
        '<h1 class="ptitle">المسارات</h1>' +
        '<p class="plede">ابدأ من مستواك وتدرّج. كل مستوى يبني على الذي قبله.</p>' +
      '</header>' +
      D.LEVELS.map(function (lv) {
        var list = mine.filter(function (t) { return t.level === lv.id; });
        var done = list.filter(function (t) { return S.progressFor(t.id).done; }).length;
        return '<section class="path">' +
          '<div class="path-head">' +
            '<h2 class="lv-' + lv.id + '"><i class="dot"></i>' + esc(lv.ar) + '</h2>' +
            '<span class="path-tag">' + esc(lv.en) + '</span>' +
            '<span class="path-rule"></span>' +
            '<span class="path-count" dir="ltr">' + done + ' / ' + list.length + '</span>' +
          '</div>' +
          (list.length ? entryList(list) : '<p class="empty">ما فيه نصوص في هذا المستوى بعد.</p>') +
        '</section>';
      }).join('') +
    '</div>';
  }

  /* ============================================================== المكتبة */
  var lib = { level: 'all', kind: 'all', status: 'all', q: '' };

  function libMatches(t) {
    if (lib.level !== 'all' && t.level !== lib.level) return false;
    if (lib.kind !== 'all' && t.kind !== lib.kind) return false;

    var p = S.progressFor(t.id);
    if (lib.status === 'done' && !p.done) return false;
    if (lib.status === 'reading' && !(p.line > 0 && !p.done)) return false;
    if (lib.status === 'new' && p.line > 0) return false;

    if (lib.q) {
      var q = lib.q.toLowerCase();
      if ((t.en + ' ' + t.ar + ' ' + t.blurb).toLowerCase().indexOf(q) === -1) return false;
    }
    return true;
  }

  function libResults() {
    var list = inLang().filter(libMatches);
    if (!list.length) {
      return '<p class="empty">ما فيه نص يطابق البحث. جرّب كلمة ثانية أو امسح المرشّحات.</p>';
    }
    return '<p class="count-line">' + list.length + ' نصًا</p>' + entryList(list);
  }

  function viewLibrary() {
    function chips(name, opts) {
      return opts.map(function (o) {
        var on = lib[name] === o.v;
        return '<button type="button" class="fchip' + (on ? ' is-on' : '') +
          '" data-filter="' + name + '" data-value="' + o.v + '" aria-pressed="' + on + '">' +
          (o.lv ? '<i class="dot"></i>' : '') + esc(o.t) + '</button>';
      }).join('');
    }

    return '<div class="view">' +
      '<header class="phead">' +
        '<h1 class="ptitle">المكتبة</h1>' +
        '<p class="plede">كل القصص والمقالات في مكان واحد.</p>' +
      '</header>' +

      '<div class="filters">' +
        '<div class="search">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" stroke-linecap="round"/></svg>' +
          '<input type="search" id="lib-q" placeholder="ابحث…" aria-label="ابحث عن نص" value="' + esc(lib.q) + '">' +
        '</div>' +
        '<div class="fchips">' + chips('kind', [
          { v: 'all', t: 'الكل' }, { v: 'story', t: 'قصص' }, { v: 'article', t: 'مقالات' }
        ]) + '</div>' +
      '</div>' +

      '<div class="filters">' +
        '<div class="fchips">' + chips('level', [
          { v: 'all', t: 'كل المستويات' }, { v: 'a1', t: 'مبتدئ', lv: 1 },
          { v: 'a2', t: 'متوسط', lv: 1 }, { v: 'b1', t: 'متقدم', lv: 1 }, { v: 'c1', t: 'متمكّن', lv: 1 }
        ]) + '</div>' +
        '<div class="fchips">' + chips('status', [
          { v: 'all', t: 'أي حالة' }, { v: 'new', t: 'لم تُقرأ' },
          { v: 'reading', t: 'جارية' }, { v: 'done', t: 'مكتملة' }
        ]) + '</div>' +
      '</div>' +

      '<div id="lib-results">' + libResults() + '</div>' +
    '</div>';
  }

  /* ========================================================= قوائم الكلمات */
  function viewWords() {
    var saved = S.savedWords();

    return '<div class="view">' +
      '<header class="phead">' +
        '<h1 class="ptitle">الكلمات</h1>' +
        '<p class="plede">اضغط البطاقة تنقلب وتسمع نطقها، واضغطها مرة ثانية تعلّمها محفوظة.</p>' +
      '</header>' +

      (saved.length
        ? '<section class="sec">' +
            '<div class="sec-head"><h2 class="h-sec">كلماتي المحفوظة</h2>' +
            '<span class="wl-count">' + saved.length + '</span></div>' +
            '<div class="wgrid">' + saved.map(function (w) {
              return '<button type="button" class="wcard is-known" data-word="' + esc(w) + '" aria-pressed="true">' +
                '<span class="wcard-in">' +
                  '<span class="wcard-face wcard-en">' + esc(w) + '</span>' +
                  '<span class="wcard-face wcard-ar">محفوظة</span>' +
                '</span></button>';
            }).join('') + '</div>' +
          '</section>'
        : '') +

      D.WORDLISTS.map(function (list) {
        var known = list.words.filter(function (w) { return S.isKnown(w.en); }).length;
        return '<section class="sec">' +
          '<div class="sec-head"><h2 class="h-sec">' + esc(list.ar) + '</h2>' +
          '<span class="wl-count"><b dir="ltr">' + known + ' / ' + list.words.length + '</b> محفوظة</span></div>' +
          '<div class="wgrid">' + list.words.map(function (w) {
            var on = S.isKnown(w.en);
            return '<button type="button" class="wcard' + (on ? ' is-known' : '') +
              '" data-word="' + esc(w.en) + '" aria-pressed="' + on + '">' +
              '<span class="wcard-in">' +
                '<span class="wcard-face wcard-en">' + esc(w.en) + '</span>' +
                '<span class="wcard-face wcard-ar">' + esc(w.ar) + '</span>' +
              '</span></button>';
          }).join('') + '</div>' +
        '</section>';
      }).join('') +
    '</div>';
  }

  /* =============================================================== القارئ */
  var readerKeys = null;

  function viewRead(id) {
    var text = D.textOf(id);
    if (!text) return '<div class="view"><p class="empty">ما لقينا هذا النص.</p></div>';

    var p = S.progressFor(id);
    var at = Math.min(p.line, text.lines.length - 1);
    var kind = D.kindOf(text.kind);
    var lang = D.langOf(text.lang);

    return '<div class="view reader">' +
      '<a class="back" href="#/library">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        'المكتبة</a>' +

      '<header class="rhead">' +
        '<div class="rkicker">' + levelChip(text.level) +
          '<i class="sep"></i><span>' + esc(kind.ar) + '</span>' +
          '<i class="sep"></i><span>' + esc(lang.native) + '</span>' +
          '<i class="sep"></i><span>' + D.minutesFor(text) + ' دقائق</span>' +
        '</div>' +
        '<h1 class="rtitle">' + esc(text.ar) + '</h1>' +
        '<p class="rtitle-orig">' + esc(text.en) + '</p>' +
        '<p class="rblurb">' + esc(text.blurb) + '</p>' +
      '</header>' +

      '<div class="rbar">' +
        '<div class="rprog"><i id="rprog-fill" style="width:' +
          ((p.line / text.lines.length) * 100) + '%"></i></div>' +
        '<span class="rprog-n" id="rprog-n" dir="ltr">' + p.line + ' / ' + text.lines.length + '</span>' +
        '<button type="button" class="rtoggle" id="toggle-ar" aria-pressed="false">إخفاء الترجمة</button>' +
        '<button type="button" class="rtoggle" id="toggle-focus" aria-pressed="false">تركيز</button>' +
      '</div>' +

      '<ol class="lines" id="lines">' +
        text.lines.map(function (line, i) {
          return '<li class="line' + (i === at ? ' is-active' : '') + '" data-i="' + i + '" tabindex="0">' +
            '<span class="line-n">' + (i + 1) + '</span>' +
            '<p class="line-en">' + words(line, text.lang) + '</p>' +
            '<p class="line-ar">' + esc(line.ar) + '</p>' +
            '<button type="button" class="line-say" data-say="' + esc(line.en) + '">' +
              '<svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4z" stroke-linejoin="round"/>' +
              '<path d="M15.5 8.5a5 5 0 0 1 0 7" stroke-linecap="round"/></svg>استمع</button>' +
          '</li>';
        }).join('') +
      '</ol>' +

      '<div class="rdone" id="rdone">' +
        '<p class="rdone-t">خلّصت النص</p>' +
        '<p class="rdone-s">كل سطر قرأته انحسب في تقدّمك.</p>' +
        '<a class="btn btn-primary" href="#/library">نص ثاني</a>' +
      '</div>' +
    '</div>';
  }

  /* كل كلمة عنصر مستقل حتى تُنقر. الحروف اللاتينية المشكولة (é, à, ç…) جزء
     من الكلمة الفرنسية، فلا تُقتطع من النطاق. */
  function words(line, lang) {
    return line.en.split(/(\s+)/).map(function (token) {
      if (/^\s+$/.test(token)) return token;
      var bare = token.replace(/[^A-Za-zÀ-ÿ'-]/g, '').toLowerCase();
      if (!bare) return esc(token);

      var gloss = null;
      for (var k in line.w) {
        var key = k.toLowerCase();
        if (key === bare || key.split(/[\s']/)[0] === bare) { gloss = line.w[k]; break; }
      }
      return '<button type="button" class="w' + (gloss ? ' has-gloss' : '') +
        (S.isKnown(bare) ? ' is-known' : '') + '" data-w="' + esc(bare) + '" data-lang="' + esc(lang) + '"' +
        (gloss ? ' data-gloss="' + esc(gloss) + '"' : '') + '>' + esc(token) + '</button>';
    }).join('');
  }

  function say(text, langId) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = D.langOf(langId || S.contentLang()).speech;
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } catch (e) { /* بعض المتصفحات ترفض بلا تفاعل — نتجاهل بهدوء */ }
  }

  function wireReader(id) {
    var text = D.textOf(id);
    if (!text) return;

    var list = document.getElementById('lines');
    var fill = document.getElementById('rprog-fill');
    var num = document.getElementById('rprog-n');
    var done = document.getElementById('rdone');

    function refresh() {
      var p = S.progressFor(id);
      fill.style.width = ((p.line / text.lines.length) * 100) + '%';
      num.textContent = p.line + ' / ' + text.lines.length;
      done.classList.toggle('is-on', p.done);
    }

    function activate(i, opts) {
      i = Math.max(0, Math.min(text.lines.length - 1, i));
      list.querySelectorAll('.line').forEach(function (n, j) {
        n.classList.toggle('is-active', j === i);
      });
      S.markLine(id, i, text.lines.length);
      refresh();

      if (opts && opts.scroll) {
        list.querySelectorAll('.line')[i].scrollIntoView({
          block: 'center', behavior: reduced.matches ? 'auto' : 'smooth'
        });
      }
      if (opts && opts.speak) say(text.lines[i].en, text.lang);
    }

    function current() {
      var a = list.querySelector('.line.is-active');
      return a ? Number(a.dataset.i) : 0;
    }

    list.addEventListener('click', function (e) {
      var sayBtn = e.target.closest('.line-say');
      if (sayBtn) { e.preventDefault(); say(sayBtn.dataset.say, text.lang); return; }

      var word = e.target.closest('.w');
      if (word) { showGloss(word); return; }

      var li = e.target.closest('.line');
      if (li) activate(Number(li.dataset.i), {});
    });

    list.addEventListener('keydown', function (e) {
      var li = e.target.closest('.line');
      if (li && e.target === li && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        activate(Number(li.dataset.i), { speak: true });
      }
    });

    document.getElementById('toggle-ar').addEventListener('click', function () {
      var hidden = list.classList.toggle('hide-ar');
      this.textContent = hidden ? 'إظهار الترجمة' : 'إخفاء الترجمة';
      this.classList.toggle('is-on', hidden);
      this.setAttribute('aria-pressed', String(hidden));
    });

    document.getElementById('toggle-focus').addEventListener('click', function () {
      var on = list.classList.toggle('focus');
      this.classList.toggle('is-on', on);
      this.setAttribute('aria-pressed', String(on));
    });

    readerKeys = function (e) {
      if (e.target.matches('input, textarea')) return;
      if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); activate(current() + 1, { scroll: true }); }
      else if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); activate(current() - 1, { scroll: true }); }
      else if (e.key === 'Enter') { e.preventDefault(); say(text.lines[current()].en, text.lang); }
    };
    document.addEventListener('keydown', readerKeys);

    refresh();
  }

  /* --------------------------------------------------------------- الشرح */
  var pop = null;

  function showGloss(btn) {
    hideGloss();
    var word = btn.dataset.w;
    var gloss = btn.dataset.gloss;
    var lang = btn.dataset.lang;
    var known = S.isKnown(word);

    pop = el('<div class="pop" role="dialog" aria-label="معنى الكلمة">' +
      '<p class="pop-w">' + esc(word) + '</p>' +
      (gloss ? '<p class="pop-g">' + esc(gloss) + '</p>'
             : '<p class="pop-g pop-none">ما فيه شرح لهذي الكلمة</p>') +
      '<div class="pop-acts">' +
        '<button type="button" class="pop-b" data-act="say">استمع</button>' +
        '<button type="button" class="pop-b' + (known ? ' is-on' : '') + '" data-act="know">' +
          (known ? 'محفوظة ✓' : 'احفظها') + '</button>' +
      '</div></div>');

    document.body.appendChild(pop);

    var r = btn.getBoundingClientRect();
    var top = r.bottom + 9;
    // لو ما فيه مكان تحت الكلمة، الشرح يطلع فوقها بدل ما يخرج من الشاشة
    if (top + pop.offsetHeight > window.innerHeight - 12) top = r.top - pop.offsetHeight - 9;
    var left = r.left + r.width / 2 - pop.offsetWidth / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - pop.offsetWidth - 12));
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
    pop.classList.add('is-in');

    pop.addEventListener('click', function (e) {
      var b = e.target.closest('.pop-b');
      if (!b) return;
      if (b.dataset.act === 'say') { say(word, lang); return; }
      S.toggleKnown(word);
      document.querySelectorAll('.w[data-w="' + CSS.escape(word) + '"]').forEach(function (n) {
        n.classList.toggle('is-known', S.isKnown(word));
      });
      hideGloss();
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

  /* ==================================================== مبدّل لغة القراءة */
  function renderLangSel() {
    var host = document.getElementById('langsel');
    if (!host) return;
    host.innerHTML = D.LANGS.map(function (l) {
      var on = S.contentLang() === l.id;
      return '<button type="button" data-lang="' + l.id + '" class="' + (on ? 'is-on' : '') +
        '" aria-pressed="' + on + '">' + esc(l.native) + '</button>';
    }).join('');

    host.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (S.contentLang() === b.dataset.lang) return;
        S.setContentLang(b.dataset.lang);
        renderLangSel();
        // القارئ مربوط بنص بلغة معيّنة، فتبديل اللغة يرجّع للمكتبة
        if (/^#\/read\//.test(location.hash)) location.hash = '#/library';
        else render();
      });
    });
  }

  /* ============================================================== التوجيه */
  var ROUTES = [
    { re: /^#\/?$/,               view: viewHome,    nav: 'home' },
    { re: /^#\/paths$/,           view: viewPaths,   nav: 'paths' },
    { re: /^#\/library$/,         view: viewLibrary, nav: 'library' },
    { re: /^#\/words$/,           view: viewWords,   nav: 'words' },
    { re: /^#\/read\/([\w-]+)$/,  view: viewRead,    nav: 'library' }
  ];

  function render() {
    // القارئ السابق يترك مستمع كيبورد على المستند — يُفكّ قبل أي رسم جديد
    if (readerKeys) { document.removeEventListener('keydown', readerKeys); readerKeys = null; }
    hideGloss();

    var hash = location.hash || '#/';
    var match = null, arg = null;

    for (var i = 0; i < ROUTES.length; i++) {
      var m = hash.match(ROUTES[i].re);
      if (m) { match = ROUTES[i]; arg = m[1]; break; }
    }
    if (!match) { location.hash = '#/'; return; }

    app.innerHTML = match.view(arg);
    window.scrollTo(0, 0);

    document.querySelectorAll('.nav-item').forEach(function (n) {
      var on = n.dataset.nav === match.nav;
      n.classList.toggle('is-on', on);
      if (on) n.setAttribute('aria-current', 'page');
      else n.removeAttribute('aria-current');
    });

    if (match.nav === 'library' && !arg) wireLibrary();
    if (match.nav === 'words') wireWords();
    if (arg) wireReader(arg);

    closeMenu();
  }

  function wireLibrary() {
    var results = document.getElementById('lib-results');
    if (!results) return;

    document.querySelectorAll('.fchip').forEach(function (b) {
      b.addEventListener('click', function () {
        lib[b.dataset.filter] = b.dataset.value;
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
        lib.q = q.value.trim();
        results.innerHTML = libResults();
      });
    }
  }

  function wireWords() {
    document.querySelectorAll('.wcard').forEach(function (card) {
      card.addEventListener('click', function () {
        // نقرة تقلب البطاقة، والثانية تعلّمها محفوظة
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
  function closeMenu() {
    document.body.classList.remove('menu-open');
    var b = document.getElementById('menu-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
  }

  var menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelector('.scrim').addEventListener('click', closeMenu);

  renderLangSel();
  window.addEventListener('hashchange', render);
  render();
})();
