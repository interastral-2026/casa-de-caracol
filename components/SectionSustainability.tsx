
import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage, Language } from '../LanguageContext';
import { translations } from '../translations';

interface Props {
  id: string;
  isNightMode: boolean;
}

const SectionSustainability: React.FC<Props> = ({ id, isNightMode }) => {
  const { language } = useLanguage();
  const t = translations[language as Language];
  const [activeTab, setActiveTab] = useState<number>(0);

  const barData = [
    { name: 'ISOCEL', value: 0.039, label: 'K-Value' },
    { name: 'Lã Rocha', value: 0.045, label: 'K-Value' },
    { name: 'EPS', value: 0.036, label: 'K-Value' },
    { name: 'Cortiça', value: 0.042, label: 'K-Value' },
  ];

  const pieData = [
    { name: 'Solar', value: 65 },
    { name: 'Wind', value: 20 },
    { name: 'Recap', value: 15 },
  ];

  const lineData = [
    { name: 'Jan', pluvial: 400, cons: 240 },
    { name: 'Mar', pluvial: 300, cons: 139 },
    { name: 'Mai', pluvial: 200, cons: 980 },
    { name: 'Jul', pluvial: 150, cons: 390 },
    { name: 'Set', pluvial: 250, cons: 480 },
    { name: 'Nov', pluvial: 450, cons: 380 },
  ];

  const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg border shadow-xl ${isNightMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
          <p className="font-bold text-sm mb-1">{label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} className="text-xs" style={{ color: p.color }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = (idx: number) => {
    if (idx === 0) {
        return (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" stroke={isNightMode ? "#64748b" : "#94a3b8"} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(6, 182, 212, 0.05)'}} />
              <Bar 
                dataKey="value" 
                fill={isNightMode ? "#06b6d4" : "#0d9488"} 
                radius={[6, 6, 0, 0]} 
                animationDuration={1500}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        );
    } else if (idx === 1) {
        return (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie 
                data={pieData} 
                innerRadius={60} 
                outerRadius={85} 
                paddingAngle={8} 
                dataKey="value"
                animationDuration={1500}
              >
                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );
    } else {
        return (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isNightMode ? "#1e293b" : "#e2e8f0"} vertical={false} />
              <XAxis dataKey="name" stroke={isNightMode ? "#64748b" : "#94a3b8"} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="pluvial" 
                stroke="#06b6d4" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6 }}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="cons" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
                animationDuration={2500}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <section id={id} className={`py-24 transition-colors duration-700 ${isNightMode ? 'bg-[#071025]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 sticky top-24">
            <span className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 block ${isNightMode ? 'text-cyan-500' : 'text-teal-600'}`}>
              Performance Eco
            </span>
            <h2 className={`text-4xl md:text-5xl font-playfair font-bold mb-8 leading-tight ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
              {t.sustainability.title}
            </h2>
            <p className={`text-lg mb-8 ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.sustainability.desc}
            </p>
            
            <div className="space-y-3">
              {t.sustainabilitySystems.map((sys: any, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all border
                    ${activeTab === idx 
                      ? (isNightMode ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-teal-500/10 border-teal-500 text-teal-700 shadow-sm') 
                      : (isNightMode ? 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-700' : 'bg-transparent border-slate-200 text-slate-400 hover:border-slate-300')}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg
                    ${activeTab === idx ? 'bg-current text-white' : 'bg-slate-800/50 text-slate-600'}`}>
                    {idx + 1}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm uppercase tracking-wider">{sys.title}</div>
                    <div className="text-xs opacity-70">{sys.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className={`relative min-h-[500px] rounded-[2.5rem] p-8 md:p-12 border transition-all duration-700
              ${isNightMode ? 'bg-slate-900/50 border-slate-800 backdrop-blur-xl' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200'}`}>
              
              <div className="mb-12">
                <div className="flex flex-wrap gap-2 mb-6">
                  {t.sustainabilitySystems[activeTab].details.map((detail: string, i: number) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isNightMode ? 'bg-slate-800 text-cyan-400' : 'bg-slate-100 text-teal-600'
                    }`}>
                      {detail}
                    </span>
                  ))}
                </div>
                <h3 className={`text-3xl font-playfair font-bold mb-4 ${isNightMode ? 'text-white' : 'text-slate-800'}`}>
                  {t.sustainabilitySystems[activeTab].title}
                </h3>
                <p className={`text-lg leading-relaxed ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>
                   {t.sustainabilitySystems[activeTab].subtitle}
                </p>
              </div>

              <div className={`p-6 rounded-3xl ${isNightMode ? 'bg-black/20' : 'bg-slate-50'}`}>
                {renderChart(activeTab)}
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: language === 'pt' ? 'Reciclagem' : 'Recycling', value: '100%' },
                  { label: language === 'pt' ? 'CO2 Salvo' : 'CO2 Saved', value: '12t/ano' },
                  { label: language === 'pt' ? 'Eficiência' : 'Efficiency', value: 'A+++' },
                  { label: language === 'pt' ? 'Vida Útil' : 'Lifetime', value: '80 years' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-2xl font-orbitron font-bold ${isNightMode ? 'text-cyan-400' : 'text-teal-600'}`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionSustainability;
