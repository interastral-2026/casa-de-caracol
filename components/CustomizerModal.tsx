
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ModuleDetail } from '../types';
import { useLanguage } from '../LanguageContext';
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
  const t = translations[language];
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

      const prompt = `You are the lead architect of 'A Porta do Caracol'. You have received a photo of a client's property.
      CRITICAL INSTRUCTION: Integrate ONLY the '${moduleName}' module into this photo.
      
      - Description: ${moduleDesc}
      - Strict Style: Organic bionic architecture, snail-like curves, sustainable natural materials.
      - If '${moduleName}' is a Jacuzzi: Place a snail-shaped wooden/stone jacuzzi in the garden or terrace shown.
      - If '${moduleName}' is a Kitchen: Place the bionic kitchen into an interior or semi-outdoor space.
      - If '${moduleName}' is the House (Casa Caracol): Integrate the main spiral living structure into the landscape.
      
      Maintain exact perspective and lighting of the original photo. The result must look like a real, high-end architectural photo of the completed project. Do not add people or unrelated items. Focus purely on architectural integration.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/png' } },
            { text: prompt }
          ]
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Design Processing Error:", error);
      alert("A nossa equipa técnica não conseguiu processar o pedido neste momento. Verifique a sua ligação.");
    } finally {
      clearInterval(interval);
      setIsProcessing(false);
    }
  };

  const handleOrder = () => {
    const subject = encodeURIComponent(`Solicitação de Orçamento: ${localizedModule.title}`);
    const body = encodeURIComponent(`Olá equipa da Porta do Caracol,\n\nGostaria de receber mais informações e um orçamento para o módulo: ${localizedModule.title}.\n\nObrigado.`);
    window.location.href = `mailto:aportadocaracol@gmail.com?subject=${subject}&body=${body}`;
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `Projeto_Personalizado_${localizedModule.title.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] border shadow-2xl transition-all duration-700
        ${isNightMode ? 'bg-[#0b1220] border-cyan-500/30' : 'bg-white border-slate-200'}`}>
        
        <button onClick={onClose} className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-black/20 text-white hover:bg-cyan-500 transition-all">
          <i className="fas fa-times"></i>
        </button>

        <div className="p-8 md:p-12">
          <header className="mb-10 text-center">
            <span className={`text-[10px] font-orbitron font-bold tracking-[0.4em] uppercase mb-3 block ${isNightMode ? 'text-cyan-400' : 'text-teal-600'}`}>
              {t.customizer.lab}
            </span>
            <h2 className={`text-3xl md:text-5xl font-playfair font-bold mb-4 ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
              {t.customizer.question}
            </h2>
            <p className={`text-lg opacity-70 ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.customizer.desc}
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-video rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
                  ${userImage ? 'border-transparent p-0' : (isNightMode ? 'border-white/10 hover:border-cyan-500/50' : 'border-slate-200 hover:border-teal-500')}`}
              >
                {userImage ? (
                  <img src={userImage} className="w-full h-full object-cover" alt="User source" />
                ) : (
                  <div className="text-center p-8">
                    <i className={`fas fa-camera-retro text-4xl mb-4 ${isNightMode ? 'text-cyan-500' : 'text-teal-600'}`}></i>
                    <p className="font-orbitron text-[10px] font-bold tracking-widest uppercase">{t.customizer.upload}</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>

              <button 
                onClick={generateVisualization}
                disabled={!userImage || isProcessing}
                className={`w-full py-5 rounded-2xl font-orbitron font-bold text-[10px] tracking-[0.3em] uppercase transition-all
                  ${!userImage ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : (isNightMode ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40 hover:bg-cyan-500' : 'bg-teal-600 text-white shadow-lg hover:bg-teal-500')}
                  ${isProcessing ? 'animate-pulse' : 'hover:scale-[1.02]'}`}
              >
                {isProcessing ? t.customizer.loading[loadingStep] : t.customizer.generate}
              </button>
            </div>

            <div className="space-y-6">
              <div className={`aspect-video rounded-[2.5rem] border flex items-center justify-center overflow-hidden relative
                ${isNightMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                {isProcessing ? (
                  <div className="flex flex-col items-center text-center p-8">
                    <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-6" />
                    <p className="font-orbitron text-[10px] tracking-widest text-cyan-400 animate-pulse uppercase">
                      {t.chatbot.processing}
                    </p>
                  </div>
                ) : generatedImage ? (
                  <img src={generatedImage} className="w-full h-full object-cover animate-in fade-in duration-1000" alt="Result" />
                ) : (
                  <div className="text-center opacity-30 p-8">
                    <i className="fas fa-pencil-ruler text-4xl mb-4"></i>
                    <p className="text-xs uppercase tracking-widest">{t.customizer.result}</p>
                  </div>
                )}
              </div>

              {generatedImage && !isProcessing && (
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={downloadImage} className={`py-4 rounded-xl border font-orbitron font-bold text-[9px] tracking-widest uppercase transition-all ${isNightMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-800 hover:bg-slate-50'}`}>
                    {t.customizer.download}
                  </button>
                  <button onClick={handleOrder} className={`py-4 rounded-xl font-orbitron font-bold text-[9px] tracking-widest uppercase transition-all shadow-xl ${isNightMode ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-teal-600 text-white hover:bg-teal-500'}`}>
                    {t.customizer.order}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizerModal;
