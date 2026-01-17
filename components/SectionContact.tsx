
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface Props {
  id: string;
  isNightMode: boolean;
}

const SectionContact: React.FC<Props> = ({ id, isNightMode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { language } = useLanguage();
  const t = translations[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de chamada de API / Serviço de Email
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      console.log("Dados do Formulário Enviados:", formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar a mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className={`py-20 transition-colors duration-700 ${isNightMode ? 'bg-[#050b18]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`rounded-[2.5rem] p-8 md:p-16 shadow-2xl border transition-all duration-500
          ${isNightMode ? 'bg-[#0b1220] border-white/5 shadow-cyan-900/5' : 'bg-slate-50 border-slate-100 shadow-slate-200'}`}>
          <div className="grid lg:grid-cols-2 gap-20">
            
            <div className="space-y-10">
              <div>
                <span className={`text-xs font-bold tracking-[0.3em] uppercase mb-4 block ${isNightMode ? 'text-cyan-500' : 'text-teal-600'}`}>
                  {language === 'pt' ? 'DIRETO AO SISTEMA' : 'DIRECT TO SYSTEM'}
                </span>
                <h3 className={`text-4xl md:text-5xl font-playfair font-bold mb-6 ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.contact.title}
                </h3>
                <p className={`text-lg leading-relaxed ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.contact.desc}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                    ${isNightMode ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white' : 'bg-teal-500/10 text-teal-600 group-hover:bg-teal-600 group-hover:text-white'}`}>
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Email</div>
                    <span className={`text-lg font-medium ${isNightMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      aportadocaracol@gmail.com
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                    ${isNightMode ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-800 group-hover:text-white'}`}>
                    <i className="fas fa-map-marker-alt text-xl"></i>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Localização</div>
                    <span className={`text-lg font-medium ${isNightMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      Lisboa, Portugal
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isNightMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.contact.name}</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className={`w-full p-4 rounded-2xl border outline-none transition-all duration-300
                          ${isNightMode 
                            ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500/50 focus:bg-white/10' 
                            : 'bg-white border-slate-200 text-slate-900 focus:border-teal-500 focus:shadow-lg focus:shadow-teal-500/5'}`} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isNightMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.contact.email}</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        className={`w-full p-4 rounded-2xl border outline-none transition-all duration-300
                          ${isNightMode 
                            ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500/50 focus:bg-white/10' 
                            : 'bg-white border-slate-200 text-slate-900 focus:border-teal-500 focus:shadow-lg focus:shadow-teal-500/5'}`} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 ${isNightMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.contact.message}</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5} 
                      required 
                      className={`w-full p-5 rounded-3xl border outline-none transition-all duration-300 resize-none
                        ${isNightMode 
                          ? 'bg-white/5 border-white/10 text-white focus:border-cyan-500/50 focus:bg-white/10' 
                          : 'bg-white border-slate-200 text-slate-900 focus:border-teal-500 focus:shadow-lg focus:shadow-teal-500/5'}`} 
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full py-5 font-orbitron font-bold text-xs tracking-[0.3em] uppercase rounded-2xl shadow-xl transition-all duration-500 overflow-hidden
                      ${isNightMode 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:shadow-cyan-500/20' 
                        : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-teal-500/20'}
                      ${isSubmitting ? 'scale-95 opacity-80 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                  >
                    <span className={`flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                      {t.contact.send} <i className="fas fa-paper-plane text-[10px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                    </span>
                    
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="ml-3 tracking-[0.2em]">{language === 'pt' ? 'A ENVIAR...' : 'SENDING...'}</span>
                      </div>
                    )}
                  </button>
                </form>
              ) : (
                <div className={`h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 rounded-[2rem] border animate-in zoom-in duration-500
                  ${isNightMode ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-teal-500/5 border-teal-500/20'}`}>
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 animate-bounce
                    ${isNightMode ? 'bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-teal-500 text-white shadow-lg'}`}>
                    <i className="fas fa-check text-4xl"></i>
                  </div>
                  <h3 className={`text-3xl font-playfair font-bold mb-4 ${isNightMode ? 'text-cyan-400' : 'text-teal-700'}`}>
                    {t.contact.success}
                  </h3>
                  <p className={`text-lg mb-10 ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {language === 'pt' 
                      ? 'A sua mensagem foi integrada no nosso sistema. Responderemos em breve.' 
                      : 'Your message has been integrated into our system. We will reply shortly.'}
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className={`font-orbitron text-[10px] font-bold tracking-[0.3em] uppercase transition-all
                      ${isNightMode ? 'text-cyan-500 hover:text-white' : 'text-teal-600 hover:text-teal-800'}`}>
                    {language === 'pt' ? '[ VOLTAR AO FORMULÁRIO ]' : '[ BACK TO FORM ]'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContact;
