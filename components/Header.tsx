
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../LanguageContext';
import { translations } from '../translations';

interface HeaderProps {
  isVisible: boolean;
  isNightMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isVisible, isNightMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language as Language];
  
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t.nav.systems, href: '#sustainability' },
    { name: t.nav.products, href: '#gallery' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' }
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideDesktop = desktopLangRef.current && !desktopLangRef.current.contains(target);
      const isOutsideMobile = mobileLangRef.current && !mobileLangRef.current.contains(target);
      
      if (isOutsideDesktop && isOutsideMobile) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const LanguageDropdown = ({ align = 'right' }: { align?: 'left' | 'right' }) => (
    <div className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} mt-3 w-44 p-2 rounded-2xl border backdrop-blur-2xl transition-all duration-300 origin-top-right z-[100]
      ${isLangOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
      ${isNightMode ? 'bg-[#0b1220]/95 border-white/10 shadow-2xl' : 'bg-white/95 border-slate-200 shadow-xl'}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
            ${language === lang.code 
              ? (isNightMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-teal-500/10 text-teal-700') 
              : (isNightMode ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600')}`}
        >
          <span className="text-xl">{lang.flag}</span>
          <span className="text-[10px] font-bold font-orbitron tracking-wider">{lang.label.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );

  const ThemeToggleButton = () => (
    <button 
      onClick={onToggleTheme}
      className={`relative flex items-center h-10 w-[100px] md:w-[130px] rounded-full font-bold text-[9px] md:text-[10px] transition-all duration-500 overflow-hidden group
        ${isNightMode 
          ? 'bg-gradient-to-r from-blue-700 to-indigo-900 text-white shadow-[0_0_15px_rgba(29,78,216,0.3)]' 
          : 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-900 shadow-md shadow-teal-500/20'}`}
    >
      <div className={`absolute w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow-lg transition-all duration-500 ease-in-out z-10
        ${isNightMode ? 'left-1.5' : 'left-[calc(100%-2.25rem)] md:left-[calc(100%-2.5rem)]'}`} 
      />
      <div className="relative w-full h-full flex items-center justify-center uppercase tracking-tighter md:tracking-widest">
        <span className={`absolute transition-all duration-500 flex items-center gap-1
          ${isNightMode ? 'opacity-100 translate-x-4' : 'opacity-0 -translate-x-10'}`}>
          ☀️ {language === 'pt' ? 'DIA' : (language === 'en' ? 'DAY' : (language === 'es' ? 'DÍA' : 'JOUR'))}
        </span>
        <span className={`absolute transition-all duration-500 flex items-center gap-1
          ${isNightMode ? 'opacity-0 translate-x-10' : 'opacity-100 -translate-x-4'}`}>
          🌙 {language === 'pt' ? 'NOITE' : (language === 'en' ? 'NIGHT' : (language === 'es' ? 'NOCHE' : 'NUIT'))}
        </span>
      </div>
    </button>
  );

  return (
    <header 
      id="mainHeader"
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'} 
        ${isNightMode 
          ? 'bg-[#00001e]/30 backdrop-blur-xl border-cyan-500/20' 
          : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer py-1" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center overflow-visible">
            <img 
              src="https://i.imgur.com/KEc0hAJ.png" 
              className={`w-full h-full object-contain transition-transform hover:scale-110 duration-500 logo-shine
                ${!isNightMode ? 'drop-shadow-[0_0_12px_rgba(0,0,0,0.25)]' : ''}`} 
              alt="Logo" 
            />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-orbitron font-bold text-[10px] tracking-widest transition-all hover:text-cyan-400 relative group
                  ${isNightMode ? 'text-cyan-300' : 'text-slate-600'}`}
              >
                {link.name.toUpperCase()}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className={`w-px h-8 ${isNightMode ? 'bg-white/10' : 'bg-slate-200'}`} />
          <ThemeToggleButton />

          <div className="relative" ref={desktopLangRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300
                ${isNightMode ? 'bg-white/5 border-white/10 hover:border-cyan-500/50 text-cyan-400' : 'bg-slate-100 border-slate-200 hover:border-teal-500 text-slate-600'}`}
            >
              <span className="text-xl">{currentLang.flag}</span>
            </button>
            <LanguageDropdown />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:gap-3 lg:hidden">
          <ThemeToggleButton />
          <div className="relative" ref={mobileLangRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300
                ${isNightMode ? 'bg-white/5 border-white/10 text-cyan-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}
            >
              <span className="text-xl">{currentLang.flag}</span>
            </button>
            <LanguageDropdown align="right" />
          </div>
          <button 
            className={`text-xl w-10 h-10 flex items-center justify-center rounded-xl transition-all border ${isNightMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-800'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 top-20 transition-all duration-500 z-40
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
        
        <div className={`relative w-full h-fit max-h-[80vh] p-10 flex flex-col transform transition-all duration-700 ease-out border-b backdrop-blur-[40px]
          ${isNightMode 
            ? 'bg-[#00001e]/60 border-cyan-500/20 shadow-[0_20px_50px_rgba(6,182,212,0.15)]' 
            : 'bg-white/70 border-slate-200 shadow-xl'}
          ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none
            ${isNightMode ? 'bg-cyan-500' : 'bg-teal-400'}`} />

          <div className="relative z-10 flex flex-col gap-8 items-center text-center">
            {navLinks.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-2xl font-orbitron font-bold tracking-[0.2em] transition-all duration-500 transform
                  ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                  ${isNightMode ? 'text-white hover:text-cyan-400' : 'text-slate-800 hover:text-teal-600'}`} 
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
