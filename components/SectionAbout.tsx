
import React from 'react';
import { IMAGE_ASSETS } from '../imageAssets';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface Props {
  id: string;
  isNightMode: boolean;
}

const SectionAbout: React.FC<Props> = ({ id, isNightMode }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const aboutImage = isNightMode ? IMAGE_ASSETS.about.night : IMAGE_ASSETS.about.day;

  return (
    <section id={id} className={`py-20 animate-fade-in transition-colors duration-700 ${isNightMode ? 'bg-[#0b1220]/50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-playfair font-bold mb-4 ${isNightMode ? 'text-white' : 'text-slate-800'}`}>{t.about.title}</h2>
          <p className={`text-xl ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.about.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className={`absolute -inset-4 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000
              ${isNightMode ? 'bg-gradient-to-r from-blue-600 to-cyan-400' : 'bg-gradient-to-r from-teal-400 to-cyan-500'}`}></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-800 aspect-[4/3]">
              <img src={aboutImage} alt="Architecture" className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-105" />
            </div>
          </div>

          <div className="space-y-8">
            <h3 className={`text-3xl font-bold font-playfair ${isNightMode ? 'text-cyan-400' : 'text-teal-600'}`}>{t.hero.titleSuffix}</h3>
            <p className={`text-lg leading-relaxed ${isNightMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {t.about.description}
            </p>
            <p className={`text-xl leading-relaxed italic border-l-4 pl-6 py-2 ${isNightMode ? 'border-cyan-500 text-slate-400' : 'border-teal-500 text-slate-500'}`}>
              "{t.about.quote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAbout;
