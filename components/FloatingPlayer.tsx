
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  isNightMode: boolean;
}

const FloatingPlayer: React.FC<Props> = ({ isNightMode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = "https://files.catbox.moe/clezbp.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
    };

    const handleEnded = () => {
      setIsVisible(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Estratégia de Autoplay Agressiva
    const forceAutoplay = async () => {
      try {
        // 1. Tenta dar play com som (pode falhar devido às políticas do browser)
        await video.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (err) {
        // 2. Se falhar (bloqueio de som), tenta dar play MUTED (o browser quase sempre permite)
        console.log("Autoplay com som bloqueado. Tentando modo silencioso...");
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
          setIsPlaying(true);
        } catch (retryErr) {
          console.error("Autoplay falhou completamente:", retryErr);
        }
      }
    };

    // Função para ativar o som na primeira interação real com o site
    const unmuteOnInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
        // Garante que está a tocar
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
        
        // Limpa os listeners após a primeira interação
        window.removeEventListener('click', unmuteOnInteraction);
        window.removeEventListener('touchstart', unmuteOnInteraction);
        window.removeEventListener('scroll', unmuteOnInteraction);
      }
    };

    forceAutoplay();

    // Adiciona listeners para "acordar" o som assim que o user mexer no site
    window.addEventListener('click', unmuteOnInteraction, { once: true });
    window.addEventListener('touchstart', unmuteOnInteraction, { once: true });
    window.addEventListener('scroll', unmuteOnInteraction, { once: true });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      window.removeEventListener('click', unmuteOnInteraction);
      window.removeEventListener('touchstart', unmuteOnInteraction);
      window.removeEventListener('scroll', unmuteOnInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedPos = (x / rect.width);
      videoRef.current.currentTime = clickedPos * videoRef.current.duration;
    }
  };

  const skip = (e: React.MouseEvent, seconds: number) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-24 right-6 z-[90] w-64 md:w-80 group animate-in slide-in-from-right duration-700 select-none`}>
      <div className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 backdrop-blur-md
        ${isNightMode ? 'bg-black/40 border-cyan-500/30 shadow-cyan-900/20' : 'bg-white/60 border-slate-200 shadow-slate-300'}`}>
        
        {/* Header/Close Controls */}
        <div className="absolute top-0 inset-x-0 p-3 flex justify-between items-start z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <button 
              onClick={toggleMute}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-lg border transition-all
                ${isNightMode ? 'bg-black/20 border-white/10 text-white hover:bg-cyan-500' : 'bg-white/40 border-slate-200 text-slate-800 hover:bg-teal-500 hover:text-white'}`}
              title={isMuted ? "Ativar som" : "Desativar som"}
            >
              <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'} text-[10px]`}></i>
            </button>
            <button 
              onClick={(e) => skip(e, -10)}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-lg border transition-all
                ${isNightMode ? 'bg-black/20 border-white/10 text-white hover:bg-cyan-500' : 'bg-white/40 border-slate-200 text-slate-800 hover:bg-teal-500 hover:text-white'}`}
              title="Recuar 10s"
            >
              <i className="fas fa-undo text-[10px]"></i>
            </button>
            <button 
              onClick={(e) => skip(e, 10)}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-lg border transition-all
                ${isNightMode ? 'bg-black/20 border-white/10 text-white hover:bg-cyan-500' : 'bg-white/40 border-slate-200 text-slate-800 hover:bg-teal-500 hover:text-white'}`}
              title="Avançar 10s"
            >
              <i className="fas fa-redo text-[10px]"></i>
            </button>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-lg border transition-all
              ${isNightMode ? 'bg-black/20 border-white/10 text-white hover:bg-red-500' : 'bg-white/40 border-slate-200 text-slate-800 hover:bg-red-500 hover:text-white'}`}
            title="Fechar"
          >
            <i className="fas fa-times text-[10px]"></i>
          </button>
        </div>

        {/* Video Surface */}
        <div className="relative aspect-video cursor-pointer" onClick={togglePlay}>
          <video 
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted={isMuted}
            loop
            className="w-full h-full object-cover"
          />
          
          {/* Mute Indicator Overlay (Aparece apenas se estiver tocando mutado) */}
          {isMuted && isPlaying && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <i className="fas fa-volume-mute text-white text-[10px]"></i>
                  <span className="text-white font-orbitron text-[8px] tracking-widest uppercase">Click to unmute</span>
               </div>
            </div>
          )}

          {/* Play/Pause UI Overlay (Apenas se o utilizador pausar manualmente) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]">
              <div className="w-16 h-16 rounded-full bg-cyan-500/90 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <i className="fas fa-play text-white text-2xl ml-1"></i>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div 
          className={`h-1.5 w-full cursor-pointer relative overflow-hidden transition-all group-hover:h-2
            ${isNightMode ? 'bg-white/10' : 'bg-slate-200'}`}
          onClick={handleSeek}
        >
          <div 
            className={`h-full absolute top-0 left-0 transition-all duration-300
              ${isNightMode ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : 'bg-teal-600'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Info Line */}
        <div className="p-2 px-4 flex justify-between items-center bg-black/10">
          <span className={`font-orbitron text-[7px] font-bold tracking-widest uppercase opacity-60
            ${isNightMode ? 'text-cyan-400' : 'text-teal-800'}`}>
            Live Preview
          </span>
          <div className="flex gap-1 items-center">
            <span className={`text-[6px] font-bold font-orbitron mr-1 ${isNightMode ? 'text-cyan-400' : 'text-teal-600'}`}>
               {isMuted ? 'MUTED' : 'AUDIO ON'}
            </span>
            <div className={`w-1 h-1 rounded-full animate-ping ${isNightMode ? 'bg-cyan-400' : 'bg-teal-600'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingPlayer;
