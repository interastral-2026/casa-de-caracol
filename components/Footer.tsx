
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-[#040813] text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-orbitron font-bold text-xl mb-6">A Porta do Caracol</h3>
            <p className="leading-relaxed mb-6">
              {t.about.description}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t.nav.systems}</h4>
            <ul className="space-y-3 text-sm">
              <li>{language === 'pt' ? 'Módulos' : (language === 'en' ? 'Modules' : 'Módulos')}</li>
              <li>{language === 'pt' ? 'Sustentabilidade' : (language === 'en' ? 'Sustainability' : 'Sostenibilidad')}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-900 text-center text-[10px] uppercase tracking-widest">
          <p>© 2025 A Porta do Caracol. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
