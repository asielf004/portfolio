import { useEffect, useState } from 'react';
import SpotlightHero from './components/SpotlightHero';
import Sections from './components/Sections';
import type { Lang } from './lang';

const STORAGE_KEY = 'rimas-lang';

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch {
      /* private mode — fall through to the default */
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar' ? 'ريماس سعد — مطوّرة ويب' : 'Rimas Saad — Web Developer';

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* nothing to do if storage is unavailable */
    }
  }, [lang]);

  return (
    <div
      className="min-h-screen bg-black tracking-[-0.02em]"
      style={{ fontFamily: "'Thmanyah', serif" }}
    >
      <SpotlightHero lang={lang} setLang={setLang} />
      <Sections lang={lang} />
    </div>
  );
}
