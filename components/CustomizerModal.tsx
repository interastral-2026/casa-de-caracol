
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ModuleKey } from '../types';
import { MODULE_DATA } from '../constants';
import { useLanguage, Language } from '../LanguageContext';
import { translations } from '../translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialModuleKey: ModuleKey;
  isNightMode: boolean;
}

const CustomizerModal: React.FC<Props> = ({ isOpen, onClose, initialModuleKey, isNightMode }) => {
  const { language } = useLanguage();
  const t = translations[language as Language];
  
  const [selectedKey, setSelectedKey] = useState<ModuleKey>(initialModuleKey);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedKey(initialModuleKey);
    // Resetar resultados ao mudar o módulo inicial ou abrir
    setGeneratedImage(null);
  }, [initialModuleKey, isOpen]);

  if (!isOpen) return null;

  const currentModuleTech = MODULE_DATA[selectedKey];
  const currentModuleLoc = (t.modules as any)[selectedKey];

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
    setGeneratedImage(null);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % t.customizer.loading.length);
    }, 2500);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = userImage.split(',')[1];
      
      const moduleName = currentModuleLoc.title;
      const moduleDesc = currentModuleLoc.texts.join(' ');

      const prompt = `High-end architectural integration: Embed the '${moduleName}' (${moduleDesc}) into this site photo. Style: Bionic architecture, organic curves inspired by snail shells, seamless landscape integration, hyper-realistic materials, matching the photo's lighting.`;

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
      alert("Error processing visualization. Please try a different photo.");
    } finally {
      clearInterval(interval);
      setIsProcessing(false);
    }
  };

  const handleOrder = () => {
    const subject = encodeURIComponent(`${language === 'pt' ? 'Solicitação de Orçamento' : 'Quote Request'}: ${currentModuleLoc.title}`);
    const bodyText = language === 'pt' 
      ? `Olá equipa da Porta do Caracol,\n\nGostaria de solicitar um orçamento para o módulo: ${currentModuleLoc.title}.\n\n[ANEXE AQUI A IMAGEM GERADA]\n\nAguardo o vosso contacto.`
      : `Hello team,\n\nI would like a quote for: ${currentModuleLoc.title}.\n\n[ATTACH THE GENERATED IMAGE HERE]\n\nBest regards.`;
    
    window.location.href = `mailto:aportadocaracol@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `creative_lab_design_${selectedKey}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] border p-6 md:p-10 shadow-2xl transition-all duration-700
        ${isNightMode ? 'bg-[#0b1220] border-cyan-500/30' : 'bg-white border-slate-200'}`}>
        
        <button onClick={onClose} className={`absolute top-8 right-8 transition-colors ${isNightMode ? 'text-white/40 hover:text-cyan-400' : 'text-slate-400 hover:text-teal-600'}`}>
          <i className="fas fa-times text-2xl"></i>
        </button>

        <header className="mb-10 text-center pr-8 pl-8">
          <span className={`text-[10px] font-orbitron font-bold tracking-[0.4em] uppercase mb-3 block ${isNightMode ? 'text-cyan-400' : 'text-teal-600'}`}>
            {t.customizer.lab}
          </span>
          <h2 className={`text-3xl md:text-4xl font-playfair font-bold mb-4 ${isNightMode ? 'text-white' : 'text-slate-900'}`}>{t.customizer.question}</h2>
          
          <div className="mt-6 max-w-sm mx-auto">
            <label className={`block text-[9px] font-bold tracking-widest uppercase mb-2 ${isNightMode ? 'text-slate-500' : 'text-slate-400'}`}>
              {t.customizer.selectModule}
            </label>
            <select 
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value as ModuleKey)}
              className={`w-full p-4 rounded-xl border outline-none font-orbitron text-[10px] tracking-widest uppercase cursor-pointer transition-all
                ${isNightMode ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-teal-500'}`}
            >
              {Object.keys(MODULE_DATA).map((key) => (
                <option key={key} value={key} className={isNightMode ? 'bg-slate-900' : 'bg-white'}>
                  {(t.modules as any)[key].title.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div onClick={() => fileInputRef.current?.click()} className={`aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
              ${userImage ? 'border-transparent' : (isNightMode ? 'border-white/10 hover:border-cyan-500/50' : 'border-slate-200 hover:border-teal-500')}`}>
              {userImage ? (
                <img src={userImage} className="w-full h-full object-cover" alt="Source" />
              ) : (
                <div className="text-center p-8">
                  <i className={`fas fa-camera text-3xl mb-4 ${isNightMode ? 'text-cyan-500' : 'text-teal-600'}`}></i>
                  <p className="text-[10px] font-orbitron font-bold tracking-widest uppercase opacity-60">{t.customizer.upload}</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
            </div>
            <button 
              onClick={generateVisualization} 
              disabled={!userImage || isProcessing} 
              className={`w-full py-5 rounded-2xl font-orbitron font-bold text-[10px] tracking-[0.3em] uppercase transition-all
                ${!userImage || isProcessing 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : (isNightMode ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 hover:bg-cyan-500' : 'bg-teal-600 text-white shadow-lg hover:bg-teal-500')}`}
            >
              {isProcessing ? t.customizer.loading[loadingStep] : t.customizer.generate}
            </button>
          </div>

          <div className="space-y-6">
            <div className={`aspect-video rounded-3xl border flex items-center justify-center overflow-hidden relative
              ${isNightMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              {isProcessing ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
                  <p className="font-orbitron text-[8px] tracking-[0.2em] text-cyan-400 uppercase animate-pulse">{t.chatbot.processing}</p>
                </div>
              ) : generatedImage ? (
                <img src={generatedImage} className="w-full h-full object-cover animate-in fade-in duration-1000" alt="Result" />
              ) : (
                <div className="opacity-20 text-center p-8">
                  <i className="fas fa-magic text-3xl mb-4"></i>
                  <p className="text-[10px] font-orbitron font-bold tracking-widest uppercase">{t.customizer.result}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {generatedImage && !isProcessing && (
                <>
                  <button onClick={downloadImage} className={`py-4 rounded-xl border font-orbitron font-bold text-[9px] tracking-widest uppercase transition-all ${isNightMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-800 hover:bg-slate-50'}`}>
                    {t.customizer.download}
                  </button>
                  <button onClick={handleOrder} className={`py-4 rounded-xl font-orbitron font-bold text-[9px] tracking-widest uppercase transition-all shadow-xl ${isNightMode ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-teal-600 text-white hover:bg-teal-500'}`}>
                    {t.customizer.order}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={onClose}
            className={`px-8 py-3 rounded-full border text-[9px] font-orbitron font-bold tracking-widest uppercase transition-all
              ${isNightMode ? 'border-white/10 text-white/40 hover:text-white hover:border-white/30' : 'border-slate-200 text-slate-400 hover:text-slate-800 hover:border-slate-400'}`}
          >
            {language === 'pt' ? 'FECHAR' : 'CLOSE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizerModal;
