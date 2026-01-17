
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SectionAbout from './components/SectionAbout';
import SectionModules from './components/SectionModules';
import SectionSustainability from './components/SectionSustainability';
import SectionGallery from './components/SectionGallery';
import SectionContact from './components/SectionContact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import FloatingPlayer from './components/FloatingPlayer';
import { LanguageProvider } from './LanguageContext';

const App: React.FC = () => {
  const [isNightMode, setIsNightMode] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
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

  return (
    <LanguageProvider>
      <div className={`min-h-screen transition-colors duration-700 ${isNightMode ? 'bg-[#0b1220]' : 'bg-[#f8fbff] text-slate-900'}`}>
        <Header 
          isVisible={showHeader} 
          isNightMode={isNightMode} 
          onToggleTheme={() => setIsNightMode(!isNightMode)} 
        />
        
        <main className="pt-20">
          <SectionModules id="modules" isNightMode={isNightMode} />
          <SectionAbout id="about" isNightMode={isNightMode} />
          <SectionSustainability id="sustainability" isNightMode={isNightMode} />
          <SectionGallery id="gallery" isNightMode={isNightMode} />
          <SectionContact id="contact" isNightMode={isNightMode} />
        </main>

        <Footer />
        <Chatbot />
        <FloatingPlayer isNightMode={isNightMode} />
      </div>
    </LanguageProvider>
  );
};

export default App;
