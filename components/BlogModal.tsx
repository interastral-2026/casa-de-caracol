
import React from 'react';
import { BlogPost } from '../blogData';
import { useLanguage, Language } from '../LanguageContext';
import { translations } from '../translations';

interface Props {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  isNightMode: boolean;
}

const BlogModal: React.FC<Props> = ({ post, isOpen, onClose, isNightMode }) => {
  const { language } = useLanguage();
  const t = translations[language as Language];

  if (!isOpen || !post) return null;

  // Fallback para inglês se o idioma atual não tiver tradução específica
  const content = (post.translations as any)[language] || post.translations.en;

  // Textos para o botão de ação baseados no idioma
  const ctaText = {
    pt: 'Explorar Esculturas Habitacionais',
    en: 'Explore Living Sculptures',
    es: 'Explorar Esculturas Habitables',
    fr: 'Explorer les Sculptures Habitables'
  }[language as Language] || 'Explore Living Sculptures';

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border shadow-2xl transition-all duration-700
        ${isNightMode ? 'bg-[#0b1220] border-cyan-500/20 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        
        <button onClick={onClose} className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-cyan-500 text-white transition-all">
          <i className="fas fa-times"></i>
        </button>

        <div className="relative h-[300px] md:h-[450px]">
          <img src={post.image} className="w-full h-full object-cover" alt={content.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <span className="text-cyan-400 font-orbitron text-[10px] tracking-[0.3em] font-bold uppercase mb-4 block">{post.date}</span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white leading-tight">
              {content.title}
            </h2>
          </div>
        </div>

        <div className="p-8 md:p-16 space-y-8">
          {content.content.map((para: string, idx: number) => (
            <p key={idx} className={`text-lg md:text-xl leading-relaxed font-light ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {para}
            </p>
          ))}

          <div className={`mt-16 p-8 rounded-3xl border ${isNightMode ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-teal-50/50 border-teal-500/20'}`}>
            <h4 className={`font-orbitron font-bold text-xs tracking-widest uppercase mb-4 ${isNightMode ? 'text-cyan-400' : 'text-teal-700'}`}>
              {language === 'pt' ? 'Inspirado por esta visão?' : 'Inspired by this vision?'}
            </h4>
            <p className={`mb-6 ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'pt' 
                ? 'Descubra como os nossos módulos biónicos podem transformar o seu conceito de habitação.' 
                : 'Discover how our bionic modules can transform your living concept.'}
            </p>
            <a 
              href="#modules" 
              onClick={(e) => {
                onClose();
                const target = document.querySelector('#modules');
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              className={`inline-block px-8 py-4 rounded-xl font-orbitron font-bold text-[10px] tracking-widest uppercase transition-all
                ${isNightMode ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-900/20' : 'bg-teal-600 text-white hover:bg-teal-500 shadow-lg shadow-teal-900/10'}`}>
              {ctaText}
            </a>
          </div>
        </div>

        <div className="p-8 border-t border-white/5 flex justify-center">
          <button onClick={onClose} className="font-orbitron text-[10px] font-bold tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity">
            [ {t.blog.back} ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
