
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ModuleDetail } from '../types';
import { useLanguage, Language } from '../LanguageContext';
import { translations } from '../translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  module: ModuleDetail | null;
  localizedModule: any | null; 
  isNightMode: boolean;
}

const CustomizerModal: React.FC<Props> = ({ isOpen, onClose, module, localizedModule, isNightMode }) => {
  const { language } = useLanguage();
  const t = translations[language as Language];
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !module || !localizedModule) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateVisualization = async () => {
    if (!userImage) return;
    setIsProcessing(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % t.customizer.loading.length);
    }, 2500);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = userImage.split(',')[1];
      
      const moduleName = localizedModule.title;
      const moduleDesc = localizedModule.texts.join(' ');

      const prompt = `Architectural integration: Add the '${moduleName}' (${moduleDesc}) into this site photo. Bionic style.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/png' } },
            { text: prompt }
          ]
        }
      });

      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Design Processing Error:", error);
      alert("Error processing. Please try again.");
    } finally {
      clearInterval(interval);
      setIsProcessing(false);
    }
  };

  const handleOrder = () => {
    window.location.href = `mailto:aportadocaracol@gmail.com?subject=Order: ${localizedModule.title}`;
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "design.png";
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] border p-8 shadow-2xl transition-all duration-700
        ${isNightMode ? 'bg-[#0b1220] border-cyan-500/30' : 'bg-white border-slate-200'}`}>
        
        <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-cyan-500 transition-colors">
          <i className="fas fa-times text-2xl"></i>
        </button>

        <header className="mb-10 text-center">
          <h2 className={`text-3xl font-playfair font-bold mb-4 ${isNightMode ? 'text-white' : 'text-slate-900'}`}>{t.customizer.question}</h2>
          <p className="opacity-70">{t.customizer.desc}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div onClick={() => fileInputRef.current?.click()} className={`aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
              ${userImage ? 'border-transparent' : 'border-white/10 hover:border-cyan-500/50'}`}>
              {userImage ? <img src={userImage} className="w-full h-full object-cover" alt="Source" /> : <div className="text-center p-8"><i className="fas fa-camera text-3xl mb-4"></i><p>{t.customizer.upload}</p></div>}
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
            </div>
            <button onClick={generateVisualization} disabled={!userImage || isProcessing} className="w-full py-4 bg-cyan-600 rounded-2xl font-bold uppercase tracking-widest hover:bg-cyan-500 disabled:bg-slate-800 transition-all">
              {isProcessing ? t.customizer.loading[loadingStep] : t.customizer.generate}
            </button>
          </div>

          <div className="space-y-6">
            <div className={`aspect-video rounded-3xl border flex items-center justify-center overflow-hidden bg-black/40 border-white/5`}>
              {generatedImage ? <img src={generatedImage} className="w-full h-full object-cover" alt="Result" /> : <div className="opacity-30"><i className="fas fa-magic text-3xl"></i></div>}
            </div>
            {generatedImage && !isProcessing && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={downloadImage} className="py-4 border border-white/10 rounded-xl hover:bg-white/5 uppercase text-[10px] font-bold tracking-widest">{t.customizer.download}</button>
                <button onClick={handleOrder} className="py-4 bg-teal-600 rounded-xl hover:bg-teal-500 uppercase text-[10px] font-bold tracking-widest">{t.customizer.order}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizerModal;
