
import React from 'react';
import { IMAGE_ASSETS } from '../imageAssets';

interface Props {
  id: string;
  isNightMode?: boolean; // Adicionado para suportar troca de imagem na galeria
}

const SectionGallery: React.FC<Props> = ({ id, isNightMode = true }) => {
  const galleryImages = isNightMode ? IMAGE_ASSETS.gallery.night : IMAGE_ASSETS.gallery.day;

  return (
    <section id={id} className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-4 ${isNightMode ? 'text-slate-400' : 'text-slate-700'}`}>Galeria de Elementos</h2>
        <p className="text-slate-500">A estética biônica em pormenor</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((src, i) => (
          <div key={i} className={`group relative aspect-square overflow-hidden rounded-xl ${isNightMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <img 
              src={src} 
              alt={`Gallery ${i}`} 
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-2"
            />
            <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <i className="fas fa-search-plus text-white text-3xl"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionGallery;
