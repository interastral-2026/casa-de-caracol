
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SectionAbout from './components/SectionAbout';
import SectionModules from './components/SectionModules';
import SectionSustainability from './components/SectionSustainability';
import SectionGallery from './components/SectionGallery';
import SectionContact from './components/SectionContact';
import SectionCreativeCall from './components/SectionCreativeCall';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import FloatingPlayer from './components/FloatingPlayer';
import CustomizerModal from './components/CustomizerModal';
import { LanguageProvider } from './LanguageContext';
import { MODULE_DATA } from './constants';
import { ModuleKey } from './types';

const App: React.FC = () => {
  const [isNightMode, setIsNightMode] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeModuleKey, setActiveModuleKey] = useState<ModuleKey>('casa');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCustomizer = (key?: ModuleKey) => {
    if (key) setActiveModuleKey(key);
    setIsCustomizerOpen(true);
  };

  return (
    <LanguageProvider>
      <div className={`min-h-screen transition-colors duration-700 ${isNightMode ? 'bg-[#0b1220]' : 'bg-[#f8fbff] text-slate-900'}`}>
        <Header 
          isVisible={showHeader} 
          isNightMode={isNightMode} 
          onToggleTheme={() => setIsNightMode(!isNightMode)} 
          onOpenLab={() => openCustomizer()}
        />
        
        <main className="pt-20">
          <SectionModules id="modules" isNightMode={isNightMode} onOpenCustomizer={openCustomizer} />
          <SectionAbout id="about" isNightMode={isNightMode} />
          <SectionCreativeCall isNightMode={isNightMode} onOpenLab={() => openCustomizer()} />
          <SectionSustainability id="sustainability" isNightMode={isNightMode} />
          <SectionGallery id="gallery" isNightMode={isNightMode} />
          <SectionContact id="contact" isNightMode={isNightMode} />
        </main>

        <Footer />
        <Chatbot />
        <FloatingPlayer isNightMode={isNightMode} />

        <CustomizerModal 
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          initialModuleKey={activeModuleKey}
          isNightMode={isNightMode}
        />
      </div>
    </LanguageProvider>
  );
};

export default App;
