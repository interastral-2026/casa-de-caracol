
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [position, setPosition] = useState(20);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const movementRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
      return;
    }
    const bubbleInterval = setInterval(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 18000);
    return () => clearInterval(bubbleInterval);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (movementRef.current) cancelAnimationFrame(movementRef.current);
      return;
    }

    const moveSnail = () => {
      if (isHovered) {
        movementRef.current = requestAnimationFrame(moveSnail);
        return;
      }
      setPosition(prev => {
        const speed = 0.05;
        let nextPos = direction === 'right' ? prev + speed : prev - speed;
        if (nextPos >= 90) { setDirection('left'); return prev; }
        if (nextPos <= 5) { setDirection('right'); return prev; }
        return nextPos;
      });
      movementRef.current = requestAnimationFrame(moveSnail);
    };
    movementRef.current = requestAnimationFrame(moveSnail);
    return () => { if (movementRef.current) cancelAnimationFrame(movementRef.current); };
  }, [isOpen, direction, isHovered]);

  const welcomeMessages = {
    pt: 'Olá! Sou o Caracol, o guia oficial d’A Porta do Caracol. Como posso ajudar a projetar o seu futuro hoje?',
    en: 'Hello! I am Caracol, official guide of A Porta do Caracol. How can I help design your future today?',
    es: '¡Hola! Soy Caracol, guía oficial de A Porta do Caracol. ¿Cómo puedo ayudar a diseñar su futuro hoy?',
    fr: 'Bonjour ! Je suis Caracol, le guide officiel. Comment puis-je vous aider à concevoir votre futur aujourd\'hui ?'
  };

  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: welcomeMessages[language] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ sender: 'bot', text: welcomeMessages[language] }]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `Você é o Caracol, o guia humano e porta-voz da equipa de arquitetura 'A Porta do Caracol'. Você não é um robô, você é um representante da equipa. Seus arquitetos desenham esculturas biónicas. Use o contexto: ${JSON.stringify(t.modules)}. Responda de forma inspiradora em ${language}.`,
          temperature: 0.8,
        }
      });
      setMessages(prev => [...prev, { sender: 'bot', text: response.text || "..." }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Lamento, a nossa equipa de design está com tráfego elevado. Pode tentar em instantes?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`fixed z-[100] transition-[bottom,opacity] duration-700 ease-in-out ${isOpen ? 'bottom-6' : 'bottom-0'}`} style={{ left: `${position}%`, transform: `translateX(-50%)` }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {showBubble && !isOpen && (
        <div className="absolute bottom-[95%] mb-4 left-1/2 -translate-x-1/2 w-44 animate-bounce pointer-events-none">
          <div className="bg-cyan-500 text-white text-[10px] font-orbitron font-bold py-3 px-4 rounded-2xl shadow-2xl text-center whitespace-nowrap relative">
            {t.chatbot.helpBubble}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-cyan-500"></div>
          </div>
        </div>
      )}

      {isOpen ? (
        <div className="w-[340px] sm:w-[400px] h-[550px] bg-[#0b1220]/95 backdrop-blur-3xl border border-cyan-500/30 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-500">
          <div className="bg-gradient-to-r from-cyan-900/90 to-blue-900/90 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <img src="https://files.catbox.moe/t3ngct.gif" alt="Caracol" className="w-12 h-12 rounded-full border border-cyan-400 object-cover" />
              <div>
                <h3 className="font-orbitron font-bold text-[10px] tracking-widest text-cyan-400 uppercase">CARACOL</h3>
                <p className="text-[9px] text-white/50 uppercase font-bold tracking-widest">{t.chatbot.guide}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-900/40 to-black/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-md ${m.sender === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'}`}>{m.text}</div>
              </div>
            ))}
            {isTyping && <div className="flex justify-start animate-pulse"><div className="bg-white/5 text-slate-400 border border-white/10 rounded-2xl rounded-tl-none p-4 text-[12px]">{t.chatbot.processing}</div></div>}
          </div>
          <div className="p-6 bg-black/40 border-t border-white/10 flex gap-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} type="text" placeholder={t.chatbot.placeholder} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-xs outline-none focus:border-cyan-500/50" />
            <button onClick={handleSend} disabled={isTyping} className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all ${isTyping ? 'bg-slate-700' : 'bg-cyan-600 text-white hover:scale-105 active:scale-95'}`}><i className="fas fa-paper-plane text-sm"></i></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="group relative flex items-end justify-center p-0 cursor-pointer outline-none">
          <img src="https://files.catbox.moe/t3ngct.gif" alt="Caracol" className={`w-28 h-28 md:w-32 md:h-32 block relative z-10 transition-all duration-700 object-contain translate-y-3 md:translate-y-5 ${direction === 'left' ? 'scale-x-[-1]' : 'scale-x-[1]'} ${isHovered ? 'scale-110 -translate-y-1' : ''}`} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
