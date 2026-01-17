
import React, { useState, useRef, useEffect } from 'react';
import { MODULE_DATA } from '../constants';
import { ModuleKey } from '../types';
import { useLanguage, Language } from '../LanguageContext';
import { translations } from '../translations';

interface Props { 
  id: string;
  isNightMode: boolean;
  onOpenCustomizer: (key: ModuleKey) => void;
}

const SectionModules: React.FC<Props> = ({ id, isNightMode, onOpenCustomizer }) => {
  const { language } = useLanguage();
  const t = translations[language as Language];
  const [selectedModule, setSelectedModule] = useState<ModuleKey | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  
  const [isCardDragging, setIsCardDragging] = useState(false);
  const [isVideoDragging, setIsVideoDragging] = useState(false);
  
  const viewerRef = useRef<any>(null);
  const cardSliderRef = useRef<HTMLDivElement>(null);
  const videoSliderRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  const moduleKeys = Object.keys(MODULE_DATA) as ModuleKey[];

  const cinematicVideos = [
    { id: 1, url: "https://files.catbox.moe/tzctk3.mp4", title: "Organic Flow" },
    { id: 2, url: "https://files.catbox.moe/l6hsde.mp4", title: "Bionic Structure" },
    { id: 3, url: "https://files.catbox.moe/pw9x75.mp4", title: "Natural Light" },
    { id: 4, url: "https://files.catbox.moe/ian7hf.mp4", title: "Sustainable Life" },
    { id: 5, url: "https://files.catbox.moe/da4o3e.mp4", title: "Geometric Peace" },
    { id: 6, url: "https://files.catbox.moe/p6ignk.mp4", title: "Living Art" }
  ];

  const handleModuleSelect = (key: ModuleKey, index?: number) => {
    setSelectedModule(key);
    setIsInfoVisible(true);
    setTimeout(() => {
      infoPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
    
    const foundIndex = index !== undefined ? index : t.infoCards.findIndex((card: any) => card.id === key);
    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex);
      scrollToIndex(cardSliderRef, foundIndex, 4);
    }
    
    if (MODULE_DATA[key].hotspotTarget && viewerRef.current) {
      viewerRef.current.cameraTarget = MODULE_DATA[key].hotspotTarget;
      viewerRef.current.cameraOrbit = '45deg 75deg 10m';
    }
  };

  const scrollToIndex = (ref: React.RefObject<HTMLDivElement | null>, index: number, divisor: number) => {
    if (ref.current) {
      const container = ref.current;
      const itemWidth = container.offsetWidth / (window.innerWidth < 768 ? 1.2 : divisor);
      container.scrollTo({
        left: index * (itemWidth + 24),
        behavior: 'smooth'
      });
    }
  };

  const useSliderDrag = (ref: React.RefObject<HTMLDivElement | null>, setDragging: (v: boolean) => void) => {
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
      if (!ref.current) return;
      isDown.current = true;
      setDragging(true);
      const pageX = 'touches' in e ? (e as React.TouchEvent).touches[0].pageX : (e as React.MouseEvent).pageX;
      startX.current = pageX - ref.current.offsetLeft;
      scrollLeft.current = ref.current.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown.current = false;
      setDragging(false);
    };

    const onMouseUp = () => {
      isDown.current = false;
      setDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDown.current || !ref.current) return;
      const pageX = 'touches' in e ? (e as React.TouchEvent).touches[0].pageX : (e as React.MouseEvent).pageX;
      const x = pageX - ref.current.offsetLeft;
      const walk = (x - startX.current) * 2;
      ref.current.scrollLeft = scrollLeft.current - walk;
    };

    return { onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
  };

  const cardDrag = useSliderDrag(cardSliderRef, setIsCardDragging);
  const videoDrag = useSliderDrag(videoSliderRef, setIsVideoDragging);

  useEffect(() => {
    const cardInterval = setInterval(() => {
      if (!isInfoVisible && !isCardDragging) {
        const next = (currentIndex + 1) % t.infoCards.length;
        setCurrentIndex(next);
        scrollToIndex(cardSliderRef, next, 4);
      }
    }, 6000);

    const videoInterval = setInterval(() => {
      if (!isVideoDragging && videoSliderRef.current) {
        const container = videoSliderRef.current;
        const maxScroll = container.scrollWidth - container.offsetWidth;
        const scrollStep = 320; 

        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => {
      clearInterval(cardInterval);
      clearInterval(videoInterval);
    };
  }, [currentIndex, isInfoVisible, isCardDragging, isVideoDragging, t.infoCards.length]);

  const themeKey = isNightMode ? 'night' : 'day';
  
  const currentModuleInfo = selectedModule ? (t.modules as any)[selectedModule] : null;
  const currentModuleTechnical = selectedModule ? MODULE_DATA[selectedModule] : null;

  return (
    <section id={id} className="max-w-7xl mx-auto px-6 py-8 md:py-16 animate-fade-in overflow-hidden relative select-none">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className={`font-orbitron font-bold tracking-[0.1em] mb-4 transition-all duration-700 text-5xl md:text-7xl lg:text-8xl ${isNightMode ? 'text-white animate-neon-halo-night' : 'text-slate-800 animate-neon-halo-day'}`}>
          A PORTA <br className="md:hidden" /> DO CARACOL
        </h1>
        <p className={`max-w-2xl mx-auto text-base md:text-lg font-light tracking-widest uppercase transition-colors duration-700 ${isNightMode ? 'text-cyan-400/60' : 'text-teal-600/70'}`}>
          {t.hero.subtitle}
        </p>
      </div>

      <div className="relative mb-12">
        <div className={`relative rounded-[2.5rem] border shadow-2xl overflow-hidden mb-10 transition-all duration-700 ${isNightMode ? 'bg-gradient-to-b from-slate-900/80 to-black border-cyan-500/10' : 'bg-gradient-to-b from-white to-slate-50 border-slate-100 shadow-slate-200'}`}>
          <model-viewer
            ref={viewerRef}
            src="https://files.catbox.moe/y1h5ay.glb"
            camera-controls
            auto-rotate={!isInfoVisible}
            camera-orbit="90deg 80deg 22m"
            camera-target="-1.2m 0m 0m"
            loading="lazy"
            reveal="auto"
            className="w-full h-[250px] md:h-[350px] relative z-10"
            style={{ '--poster-color': 'transparent' } as any}
          >
            {moduleKeys.map((key) => {
              const moduleTech = MODULE_DATA[key];
              if (!moduleTech.hotspotTarget) return null;
              return (
                <button
                  key={`hotspot-${key}`}
                  slot={`hotspot-${key}`}
                  data-position={moduleTech.hotspotTarget}
                  onClick={() => handleModuleSelect(key)}
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${selectedModule === key ? 'scale-150 bg-cyan-400 shadow-[0_0_15px_cyan]' : 'bg-white/30 border-white/50'}`}
                />
              );
            })}
          </model-viewer>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6 px-2">
             <div className={`h-[1px] flex-1 ${isNightMode ? 'bg-white/5' : 'bg-slate-200'}`} />
             <span className={`font-orbitron text-[9px] font-bold tracking-[0.4em] uppercase ${isNightMode ? 'text-cyan-400/40' : 'text-slate-400'}`}>Atmosfera Biónica</span>
             <div className={`h-[1px] flex-1 ${isNightMode ? 'bg-white/5' : 'bg-slate-200'}`} />
          </div>
          <div 
            ref={videoSliderRef}
            onMouseDown={videoDrag.onMouseDown}
            onMouseLeave={videoDrag.onMouseLeave}
            onMouseUp={videoDrag.onMouseUp}
            onMouseMove={videoDrag.onMouseMove}
            onTouchStart={videoDrag.onMouseDown}
            onTouchEnd={videoDrag.onMouseUp}
            onTouchMove={videoDrag.onMouseMove}
            className={`flex gap-6 overflow-x-auto scrollbar-hide px-2 py-4 transition-transform duration-300 ${isVideoDragging ? 'cursor-grabbing scale-[0.99]' : 'cursor-grab'}`}
          >
            {cinematicVideos.map((vid) => (
              <div key={vid.id} className={`min-w-[280px] md:min-w-[380px] aspect-[16/10] rounded-[2.5rem] overflow-hidden border relative group shadow-2xl transition-all duration-500 hover:scale-[1.03]
                ${isNightMode ? 'border-white/10 bg-black/40 shadow-cyan-900/10' : 'border-slate-200 bg-white shadow-slate-200'}`}>
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="metadata"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                >
                  <source src={vid.url} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-8">
                  <span className={`font-orbitron text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 group-hover:tracking-[0.5em]
                    ${isNightMode ? 'text-cyan-400' : 'text-white'}`}>
                    {vid.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative px-2 mb-8">
          <div 
            ref={cardSliderRef}
            onMouseDown={cardDrag.onMouseDown}
            onMouseLeave={cardDrag.onMouseLeave}
            onMouseUp={cardDrag.onMouseUp}
            onMouseMove={cardDrag.onMouseMove}
            onTouchStart={cardDrag.onMouseDown}
            onTouchEnd={cardDrag.onMouseUp}
            onTouchMove={cardDrag.onMouseMove}
            className={`flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 transition-all duration-300 ${isCardDragging ? 'cursor-grabbing scale-[0.99]' : 'cursor-grab'}`}
          >
            {t.infoCards.map((card: any, index: number) => {
              const isActive = selectedModule === card.id;
              const moduleImg = MODULE_DATA[card.id as ModuleKey]?.images[themeKey][0] || "";
              return (
                <div key={card.id} onClick={() => handleModuleSelect(card.id as ModuleKey, index)}
                  className={`min-w-[75%] sm:min-w-[40%] lg:min-w-[22%] snap-center group relative aspect-[14/10] rounded-[2rem] overflow-hidden border transition-all duration-700
                    ${isActive ? (isNightMode ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)] scale-105 z-10' : 'border-teal-500 shadow-xl scale-105 z-10') : (isNightMode ? 'border-white/5 opacity-80' : 'border-slate-200 opacity-90 hover:opacity-100')}`}>
                  <img 
                    src={moduleImg} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 pointer-events-none" 
                    alt={card.title} 
                  />
                  
                  <div className={`absolute top-4 left-4 px-4 py-2 rounded-full backdrop-blur-md border shadow-lg transition-all
                    ${isActive 
                      ? (isNightMode ? 'bg-cyan-500 border-cyan-400 text-white' : 'bg-teal-600 border-teal-500 text-white') 
                      : (isNightMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white/60 border-slate-200 text-slate-800')}`}>
                    <h3 className="font-orbitron font-bold text-[9px] tracking-widest uppercase">
                      {card.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div 
          ref={infoPanelRef}
          className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${isInfoVisible && currentModuleInfo ? 'max-h-[2500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}
        >
          <div className={`relative w-full rounded-[3.5rem] border shadow-2xl flex flex-col lg:flex-row overflow-hidden transition-all duration-700 ${isNightMode ? 'bg-[#0b1220]/90 border-cyan-500/20 backdrop-blur-3xl' : 'bg-white border-slate-100 shadow-slate-100 backdrop-blur-2xl'}`}>
            <button onClick={() => setIsInfoVisible(false)} className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full flex items-center justify-center text-sm bg-white/5 hover:bg-cyan-500 text-white transition-all shadow-lg border border-white/10">
              <i className="fas fa-times"></i>
            </button>

            <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col gap-6 items-center">
              <div className="w-[85%] aspect-[14/10] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/5 bg-black/5">
                <img 
                  src={currentModuleTechnical?.images[themeKey][0]} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-center transition-transform duration-[2s] group-hover:scale-105" 
                  alt="Architecture View 1" 
                />
              </div>
              
              <div className={`w-[60%] aspect-square rounded-[2rem] overflow-hidden shadow-xl self-end -mt-16 md:-mt-24 border-4 transition-transform duration-700 hover:translate-x-2 z-10 group bg-black/5 ${isNightMode ? 'border-[#0b1220]' : 'border-white'}`}>
                <img 
                  src={currentModuleTechnical?.images[themeKey][1] || currentModuleTechnical?.images[themeKey][0]} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                  alt="Architecture Detail" 
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
              <span className={`text-[9px] font-orbitron font-bold tracking-[0.5em] uppercase mb-4 block ${isNightMode ? 'text-cyan-400/80' : 'text-teal-600'}`}>Modular Architecture</span>
              <h2 className={`text-3xl md:text-5xl font-playfair font-bold mb-8 leading-tight ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                {currentModuleInfo?.title}
              </h2>
              <div className="space-y-6">
                {currentModuleInfo?.texts.map((text: string, idx: number) => (
                  <p key={idx} className={`text-base md:text-lg leading-relaxed font-light ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>{text}</p>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/5">
                <button 
                  onClick={() => selectedModule && onOpenCustomizer(selectedModule)}
                  className={`w-full py-4 rounded-xl font-orbitron font-bold text-[9px] tracking-[0.3em] uppercase transition-all ${isNightMode ? 'bg-cyan-600 text-white shadow-cyan-600/10 hover:shadow-cyan-600/30' : 'bg-teal-600 text-white shadow-lg'}`}
                >
                  {language === 'pt' ? 'PERSONALIZAR O MEU CARACOL' : (language === 'en' ? 'CUSTOMIZE MY SNAIL' : (language === 'es' ? 'PERSONALIZAR' : 'PERSONNALISER'))}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionModules;
