
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface Props {
  isNightMode: boolean;
  onOpenLab: () => void;
}

const SectionCreativeCall: React.FC<Props> = ({ isNightMode, onOpenLab }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`relative rounded-[3.5rem] p-12 md:p-24 overflow-hidden border shadow-2xl transition-all duration-700
          ${isNightMode ? 'bg-[#0b1220] border-cyan-500/20' : 'bg-white border-slate-100 shadow-slate-200'}`}>
          
          {/* Background Elements */}
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none
            ${isNightMode ? 'bg-cyan-500' : 'bg-teal-400'}`} />
          <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none
            ${isNightMode ? 'bg-blue-600' : 'bg-emerald-400'}`} />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className={`text-xs font-bold tracking-[0.4em] uppercase mb-4 block ${isNightMode ? 'text-cyan-400' : 'text-teal-600'}`}>
                  {t.billboard.subtitle}
                </span>
                <h2 className={`text-5xl md:text-7xl font-playfair font-bold leading-tight mb-6 ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.billboard.title}
                </h2>
                <p className={`text-lg md:text-xl leading-relaxed max-w-lg ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.billboard.desc}
                </p>
              </div>

              <button 
                onClick={onOpenLab}
                className={`group relative px-10 py-5 rounded-2xl font-orbitron font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden
                  ${isNightMode 
                    ? 'bg-cyan-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:bg-cyan-500' 
                    : 'bg-teal-600 text-white shadow-xl hover:bg-teal-500'}`}
              >
                <span className="flex items-center gap-4">
                  {t.billboard.cta}
                  <i className="fas fa-magic group-hover:rotate-12 transition-transform"></i>
                </span>
              </button>
            </div>

            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden group shadow-2xl border-4 transition-transform duration-1000 hover:scale-[1.02]
              ${isNightMode ? 'border-[#0b1220] bg-black/40' : 'border-white bg-slate-100'}">
              <img 
                src="https://files.catbox.moe/a9f0uq.png" 
                className="w-full h-full object-cover opacity-80 transition-all duration-1000 group-hover:opacity-100 group-hover:scale-110" 
                alt="AI Design Preview" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center animate-pulse">
                <i className="fas fa-camera text-white text-3xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCreativeCall;
