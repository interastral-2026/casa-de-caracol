
import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../blogData';
import { useLanguage, Language } from '../LanguageContext';
import { translations } from '../translations';
import BlogModal from './BlogModal';

interface Props {
  id: string;
  isNightMode: boolean;
}

const SectionBlog: React.FC<Props> = ({ id, isNightMode }) => {
  const { language } = useLanguage();
  const t = translations[language as Language];
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id={id} className={`py-24 transition-colors duration-700 ${isNightMode ? 'bg-[#050b18]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className={`text-[10px] font-orbitron font-bold tracking-[0.5em] uppercase mb-4 block ${isNightMode ? 'text-cyan-500' : 'text-teal-600'}`}>
            Knowledge Hub
          </span>
          <h2 className={`text-4xl md:text-5xl font-playfair font-bold mb-4 ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
            {t.blog.title}
          </h2>
          <p className={`text-lg ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.blog.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => {
            const content = (post.translations as any)[language] || post.translations.en;
            return (
              <article 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`group cursor-pointer relative rounded-[2.5rem] overflow-hidden border transition-all duration-500
                  ${isNightMode ? 'bg-[#0b1220] border-white/5 hover:border-cyan-500/30' : 'bg-white border-slate-200 hover:border-teal-500/30 hover:shadow-xl'}`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                </div>
                
                <div className="p-8">
                  <div className={`text-[10px] font-orbitron font-bold tracking-widest mb-4 ${isNightMode ? 'text-cyan-500/60' : 'text-slate-400'}`}>
                    {post.date}
                  </div>
                  <h3 className={`text-xl font-playfair font-bold mb-4 leading-snug group-hover:text-cyan-400 transition-colors ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                    {content.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {content.excerpt}
                  </p>
                  
                  <div className={`flex items-center gap-2 text-[9px] font-orbitron font-bold tracking-[0.2em] uppercase
                    ${isNightMode ? 'text-cyan-400' : 'text-teal-600'}`}>
                    {t.blog.readMore} <i className="fas fa-arrow-right text-[8px] transition-transform group-hover:translate-x-2"></i>
                  </div>
                </div>

                <div className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0
                  ${isNightMode ? 'bg-cyan-500 text-white' : 'bg-teal-600 text-white'}`}>
                  <i className="fas fa-plus"></i>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <BlogModal 
        isOpen={!!selectedPost} 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)}
        isNightMode={isNightMode}
      />
    </section>
  );
};

export default SectionBlog;
