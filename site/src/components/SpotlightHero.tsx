import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const BG_IMAGE_1 = './bg1.webp';
const BG_IMAGE_2 = './bg2.webp';

const SPOTLIGHT_R = 380;

type Lang = 'en' | 'ar';

const COPY = {
  en: {
    dir: 'ltr' as const,
    wordmark: 'Rimas',
    nav: ['About', 'Projects', 'Skills', 'Contact'],
    cta: 'Get in Touch',
    line1: 'Every page',
    line2: 'tells a story',
    left:
      'I study Internet Applications and Web Programming, and I build interfaces that stay clear under real use — ordered layouts, readable contrast, and everything reachable from a keyboard.',
    right:
      'Drag your finger — or your cursor — to look closer. Everything here was made to be read, used and understood, not only looked at.',
    action: 'View My Work',
    toggle: 'عربي',
    toggleLabel: 'Switch to Arabic',
    menu: 'Open menu',
    close: 'Close menu',
  },
  ar: {
    dir: 'rtl' as const,
    wordmark: 'ريماس',
    nav: ['نبذة عني', 'مشاريعي', 'مهاراتي', 'تواصل معي'],
    cta: 'تواصل معي',
    line1: 'كل صفحة',
    line2: 'تحكي قصة',
    left:
      'أدرس تطبيقات الإنترنت وبرمجة الويب، وأبني واجهات تبقى واضحة تحت الاستخدام الحقيقي — تخطيط مرتّب، تباين مقروء، وكل شيء يمكن الوصول إليه بالكيبورد.',
    right:
      'مرّر إصبعك أو المؤشر لتقترب أكثر. كل ما هنا صُنع ليُقرأ ويُستخدم ويُفهم، لا ليُشاهد فقط.',
    action: 'شوف مشاريعي',
    toggle: 'EN',
    toggleLabel: 'التبديل إلى الإنجليزية',
    menu: 'فتح القائمة',
    close: 'إغلاق القائمة',
  },
};

/* -------------------------------------------------------------------------
   RevealLayer — the second image, masked to a soft circle around the pointer.

   The mask is a plain CSS radial-gradient rather than a canvas re-encoded to
   a data URL every frame: `toDataURL()` on a full-screen canvas is far too
   slow to run at 60fps on a tablet, and it was the reason the reveal stuttered
   or never appeared at all on iPad.
   ------------------------------------------------------------------------- */
function RevealLayer({
  image,
  cursorX,
  cursorY,
}: {
  image: string;
  cursorX: number;
  cursorY: number;
}) {
  const mask = `radial-gradient(circle ${SPOTLIGHT_R}px at ${cursorX}px ${cursorY}px,
      rgba(0,0,0,1) 0%,
      rgba(0,0,0,1) 60%,
      rgba(0,0,0,0.85) 76%,
      rgba(0,0,0,0.5) 88%,
      rgba(0,0,0,0.18) 96%,
      rgba(0,0,0,0) 100%)`;

  return (
    <div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `url("${image}")`,
        maskImage: mask,
        WebkitMaskImage: mask,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    />
  );
}

/* ------------------------------------------------------------------------- */

export default function SpotlightHero() {
  const [lang, setLang] = useState<Lang>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  const t = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.title =
      lang === 'ar' ? 'ريماس سعد — مطوّرة ويب' : 'Rimas Saad — Web Developer';
  }, [lang, t.dir]);

  useEffect(() => {
    // Start over the terrain, where the two images actually differ, so the
    // reveal is visible from the first frame instead of sitting off-screen.
    const home = () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.6,
    });

    mouse.current = home();
    smooth.current = home();
    setCursorPos(home());

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started = performance.now();
    let guided = !reduced; // drifts on its own until the visitor takes over

    const track = (x: number, y: number) => {
      guided = false;
      mouse.current.x = x;
      mouse.current.y = y;
    };

    // pointermove covers mouse, pen and touch-drag; the touch listeners are
    // there for older iOS Safari, which does not always emit pointer events.
    const onPointer = (e: PointerEvent) => track(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) track(touch.clientX, touch.clientY);
    };

    const loop = (now: number) => {
      if (guided) {
        const seconds = (now - started) / 1000;
        const { innerWidth: w, innerHeight: h } = window;
        mouse.current.x = w / 2 + Math.sin(seconds * 0.42) * w * 0.3;
        mouse.current.y = h * 0.6 + Math.sin(seconds * 0.84) * h * 0.16;
      }

      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.16;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.16;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };

    const opts = { passive: true } as const;
    window.addEventListener('pointermove', onPointer, opts);
    window.addEventListener('pointerdown', onPointer, opts);
    window.addEventListener('touchstart', onTouch, opts);
    window.addEventListener('touchmove', onTouch, opts);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isRtl = t.dir === 'rtl';

  return (
    <section
      className="relative w-full overflow-hidden h-screen bg-black"
      style={{ height: '100dvh' }}
    >
      {/* 1 · Base image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        aria-hidden="true"
        style={{ backgroundImage: `url("${BG_IMAGE_1}")` }}
      />

      {/* 2 · Reveal image, masked to the spotlight */}
      <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

      {/* Warm halo — keeps the spotlight readable over the black sky, where
          the two images are identical and the mask alone shows nothing */}
      <div
        className="absolute z-40 pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: SPOTLIGHT_R * 2,
          height: SPOTLIGHT_R * 2,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(232,112,42,0.20) 0%, rgba(232,112,42,0.10) 45%, rgba(232,112,42,0) 72%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <a href="#top" className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic">{t.wordmark}</span>
        </a>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {t.nav.map((item, i) => (
            <button
              key={item}
              type="button"
              className={
                i === 0
                  ? 'text-white px-4 py-1.5 rounded-full text-sm font-medium'
                  : 'text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium'
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label={t.toggleLabel}
            className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            {t.toggle}
          </button>

          <a
            href="mailto:rremas.1161.sdd@gmail.com"
            className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            {t.cta}
          </a>

          <button
            type="button"
            className="md:hidden text-white p-2"
            aria-label={menuOpen ? t.close : t.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[110] bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center gap-6">
          <button
            type="button"
            className="absolute top-5 right-5 text-white p-2"
            aria-label={t.close}
            onClick={() => setMenuOpen(false)}
          >
            <X size={24} />
          </button>
          {t.nav.map((item) => (
            <button
              key={item}
              type="button"
              className="text-white text-2xl font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </button>
          ))}
          <a
            href="mailto:rremas.1161.sdd@gmail.com"
            className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full"
          >
            {t.cta}
          </a>
        </div>
      )}

      {/* 3 · Heading */}
      <div
        id="top"
        className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none"
      >
        <h1 className="text-white leading-[0.95]">
          <span
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            {t.line1}
          </span>
          <span
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            {t.line2}
          </span>
        </h1>
      </div>

      {/* 4 · Bottom-start paragraph */}
      <div
        className={`hidden sm:block absolute bottom-14 z-50 max-w-[260px] hero-anim hero-fade ${
          isRtl ? 'right-10 md:right-14 text-right' : 'left-10 md:left-14'
        }`}
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-sm text-white/80 leading-relaxed">{t.left}</p>
      </div>

      {/* 5 · Bottom-end block */}
      <div
        className={`absolute bottom-10 sm:bottom-24 z-50 left-5 right-5 max-w-full sm:max-w-[260px] flex flex-col gap-4 sm:gap-5 hero-anim hero-fade ${
          isRtl
            ? 'sm:right-auto sm:left-10 md:left-14 items-end text-right'
            : 'sm:left-auto sm:right-10 md:right-14 items-start'
        }`}
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{t.right}</p>
        <a
          href="#projects"
          className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
        >
          {t.action}
        </a>
      </div>
    </section>
  );
}
