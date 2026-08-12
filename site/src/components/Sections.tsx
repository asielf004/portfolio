import { useEffect, useRef, type ReactNode } from 'react';
// lucide-react v1 dropped its brand icons, so the two profile links use
// generic marks rather than the GitHub and LinkedIn logos.
import { ArrowUpRight, Braces, Link, Mail, Phone } from 'lucide-react';
import {
  EMAIL,
  GITHUB,
  LINKEDIN,
  PHONE_DISPLAY,
  PHONE_HREF,
  type Lang,
} from '../lang';

/* -------------------------------------------------------------------------
   Copy — everything below the hero, in both languages.
   ------------------------------------------------------------------------- */

const COPY = {
  en: {
    about: {
      eyebrow: 'About',
      title: 'Built to be used,',
      titleAccent: 'not just looked at',
      body: [
        'I am a web programming student studying Internet Applications, learning to build front-end interfaces and wire them to a database. I like design that is clean and ordered, and I enjoy taking a technical problem apart step by step until the result is right.',
        'That means layouts that hold up on a phone, contrast that survives sunlight, and pages that work the same in Arabic as they do in English.',
      ],
      facts: [
        { k: 'Studying', v: 'Internet Applications & Web Programming' },
        { k: 'Status', v: 'Open to internships' },
        { k: 'Building with', v: 'HTML, CSS, PHP, MySQL' },
        { k: 'Works in', v: 'Arabic & English, both directions' },
      ],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Things I have',
      titleAccent: 'actually built',
      items: [
        {
          num: '01',
          name: 'Line by Line',
          desc: 'An app for learning English and French one line at a time — letters, numbers, grammar and typing speed, with daily, weekly and monthly tracking, a streak, and an analysis of every mistake you make.',
          tags: ['JavaScript', 'Web Speech API', 'Local storage'],
          status: 'Built',
        },
        {
          num: '02',
          name: 'Upcoming PHP project',
          desc: 'Reserved for a database-backed project I am building next. This card gets filled in the moment it ships.',
          tags: ['PHP', 'MySQL'],
          status: 'Coming soon',
        },
      ],
    },
    skills: {
      eyebrow: 'Skills',
      title: 'What I reach for',
      groups: [
        { g: 'Front-end', items: ['HTML', 'CSS', 'JavaScript', 'Responsive layout'] },
        { g: 'Back-end', items: ['PHP', 'MySQL'] },
        { g: 'Craft', items: ['Git', 'Accessibility', 'RTL & LTR', 'Keyboard support'] },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let us build',
      titleAccent: 'something',
      body: 'I am looking for an internship where I can keep learning by shipping real work. Take a look at what I have made, or just say hello.',
      cta: 'Email me',
      links: 'Elsewhere',
    },
    footer: 'Designed and built with care.',
  },

  ar: {
    about: {
      eyebrow: 'نبذة عني',
      title: 'مبني ليُستخدم،',
      titleAccent: 'لا ليُشاهد فقط',
      body: [
        'طالبة برمجة ويب، أدرس مقرر تطبيقات الإنترنت وأتعلّم بناء الواجهات وربطها بقواعد البيانات. أحب التصميم النظيف المرتّب، وأستمتع بتفكيك المشكلة التقنية خطوة بخطوة لين توصل النتيجة الصح.',
        'يعني تخطيط يصمد على الجوال، وتباين يبان تحت الشمس، وصفحات تشتغل بالعربي مثل ما تشتغل بالإنجليزي بالضبط.',
      ],
      facts: [
        { k: 'أدرس', v: 'تطبيقات الإنترنت وبرمجة الويب' },
        { k: 'الحالة', v: 'متاحة للتدريب' },
        { k: 'أبني بـ', v: 'HTML و CSS و PHP و MySQL' },
        { k: 'أعمل بـ', v: 'العربية والإنجليزية، بالاتجاهين' },
      ],
    },
    projects: {
      eyebrow: 'مشاريعي',
      title: 'أشياء بنيتها',
      titleAccent: 'فعلًا',
      items: [
        {
          num: '01',
          name: 'سطرًا بسطر',
          desc: 'تطبيق لتعلّم الإنجليزية والفرنسية سطرًا بسطر — الأحرف والأرقام والقواعد وسرعة الكتابة، مع متابعة يومية وأسبوعية وشهرية، وستريك، وتحليل لكل خطأ تسوينه.',
          tags: ['JavaScript', 'Web Speech API', 'التخزين المحلي'],
          status: 'مبني',
        },
        {
          num: '02',
          name: 'مشروع PHP قادم',
          desc: 'مساحة محجوزة لمشروع مربوط بقاعدة بيانات أبنيه بعدين. تنعبّي هذي البطاقة أول ما يخلص.',
          tags: ['PHP', 'MySQL'],
          status: 'قريبًا',
        },
      ],
    },
    skills: {
      eyebrow: 'مهاراتي',
      title: 'الأدوات اللي أشتغل فيها',
      groups: [
        { g: 'الواجهة', items: ['HTML', 'CSS', 'JavaScript', 'تخطيط متجاوب'] },
        { g: 'الخلفية', items: ['PHP', 'MySQL'] },
        { g: 'الحرفة', items: ['Git', 'إتاحة الوصول', 'عربي وإنجليزي', 'دعم الكيبورد'] },
      ],
    },
    contact: {
      eyebrow: 'تواصل معي',
      title: 'خلّنا نبني',
      titleAccent: 'شيئًا',
      body: 'أدوّر على فرصة تدريب أقدر أكمّل فيها تعلّمي وأنا أشتغل على شغل حقيقي. شوفي اللي بنيته، أو بس سلّمي عليّ.',
      cta: 'راسلني',
      links: 'في مكان آخر',
    },
    footer: 'صُمّم وبُني بعناية.',
  },
};

/* -------------------------------------------------------------------------
   Reveal — fades a block in the first time it scrolls into view.
   ------------------------------------------------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('is-in');
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sec-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#e8702a]">
      <span className="h-px w-8 bg-[#e8702a]/60" aria-hidden="true" />
      {children}
    </p>
  );
}

function Display({
  children,
  accent,
}: {
  children: ReactNode;
  accent?: ReactNode;
}) {
  return (
    <h2 className="mt-6 text-4xl leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
      {children}
      {accent ? (
        <>
          {' '}
          <span className="font-playfair italic font-normal text-white/70">
            {accent}
          </span>
        </>
      ) : null}
    </h2>
  );
}

/* ------------------------------------------------------------------------- */

export default function Sections({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <div className="relative bg-black text-white">
      {/* A single warm glow carried down from the hero, so the page below does
          not read as a flat black slab. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(232,112,42,0.13) 0%, rgba(232,112,42,0) 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* ---------------- About ---------------- */}
        <section id="about" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
          <Reveal>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <Display accent={t.about.titleAccent}>{t.about.title}</Display>
          </Reveal>

          <div className="mt-14 grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
            <Reveal delay={80}>
              <div className="space-y-6">
                {t.about.body.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-white/70 sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {t.about.facts.map((f) => (
                  <div key={f.k} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                    <dt className="text-xs uppercase tracking-[0.15em] text-white/50 sm:w-32 sm:shrink-0">
                      {f.k}
                    </dt>
                    <dd className="text-sm text-white/85">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Projects ---------------- */}
        <section id="projects" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
          <Reveal>
            <Eyebrow>{t.projects.eyebrow}</Eyebrow>
            <Display accent={t.projects.titleAccent}>{t.projects.title}</Display>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {t.projects.items.map((item, i) => (
              <Reveal key={item.name} delay={80 + i * 90}>
                <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-[#e8702a]/50 hover:bg-white/[0.05] sm:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-playfair text-3xl italic text-white/25">
                      {item.num}
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl tracking-[-0.03em] text-white sm:text-3xl">
                    {item.name}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65 sm:text-base">
                    {item.desc}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Skills ---------------- */}
        <section id="skills" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
          <Reveal>
            <Eyebrow>{t.skills.eyebrow}</Eyebrow>
            <Display>{t.skills.title}</Display>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {t.skills.groups.map((group, i) => (
              <Reveal key={group.g} delay={80 + i * 90}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {group.g}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white/85 transition-colors duration-300 hover:border-[#e8702a]/50 hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
          <div className="grid gap-14 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <Reveal>
              <Eyebrow>{t.contact.eyebrow}</Eyebrow>
              <Display accent={t.contact.titleAccent}>{t.contact.title}</Display>

              <p className="mt-8 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                {t.contact.body}
              </p>

              <a
                href={`mailto:${EMAIL}`}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#e8702a] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95"
              >
                <Mail size={16} aria-hidden="true" />
                {t.contact.cta}
              </a>
            </Reveal>

            <Reveal delay={120}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-white/50">
                {t.contact.links}
              </h3>

              <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {[
                  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}`, dir: 'ltr' },
                  { icon: Phone, label: PHONE_DISPLAY, href: `tel:${PHONE_HREF}`, dir: 'ltr' },
                  { icon: Link, label: 'linkedin.com/in/rimassaad', href: LINKEDIN, dir: 'ltr' },
                  { icon: Braces, label: 'github.com/asielf004', href: GITHUB, dir: 'ltr' },
                ].map(({ icon: Icon, label, href, dir }) => {
                  const external = href.startsWith('http');
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        {...(external
                          ? { target: '_blank', rel: 'noreferrer noopener' }
                          : {})}
                        className="group flex items-center gap-4 py-4 text-white/70 transition-colors duration-200 hover:text-white"
                      >
                        <Icon size={16} className="shrink-0 text-white/40" aria-hidden="true" />
                        <span className="flex-1 truncate text-sm" dir={dir}>
                          {label}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-white/25 transition-colors duration-200 group-hover:text-[#e8702a]"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>
      </div>

      {/* ---------------- Footer ---------------- */}
      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-white/40 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {lang === 'ar' ? 'ريماس سعد' : 'Rimas Saad'}</p>
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
