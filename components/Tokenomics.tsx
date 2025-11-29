
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DistributionItem } from '../types';

const data: DistributionItem[] = [
  { name: 'Liquidité Auto', value: 40, color: '#3b82f6', description: 'PancakeSwap' },
  { name: 'Développement', value: 30, color: '#6366f1', description: 'Innovation & Secu' },
  { name: 'Communauté', value: 20, color: '#eab308', description: 'Airdrops & Marketing' },
  { name: 'Burn Program', value: 10, color: '#ef4444', description: 'Déflationniste' },
];

const Tokenomics: React.FC = () => {
  return (
    <section id="tokenomics" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Économie du Token</h2>
          <p className="text-slate-400 font-serif">Une distribution équilibrée pour assurer la stabilité et la croissance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Chart Section */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 p-8 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden">
             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
             
             <div className="h-[350px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', padding: '12px' }} 
                    itemStyle={{ color: '#cbd5e1', fontFamily: 'serif' }}
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{ fontFamily: 'serif', fontSize: '14px' }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
             </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6 flex flex-col justify-center">
            
            {/* Supply Card */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-serif font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                Supply Totale
              </h3>
              <p className="text-4xl md:text-5xl font-mono font-bold text-blue-500 tracking-tight">
                1 000 000 000 <span className="text-xl text-slate-500 font-serif">FC</span>
              </p>
            </div>

            {/* Tax System Card */}
            <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-xl flex-grow flex flex-col">
              <h3 className="text-xl font-serif font-bold text-white mb-6 border-b border-slate-800 pb-4">
                Système de Taxe (2% - 5%)
              </h3>
              <div className="grid grid-cols-2 gap-4 flex-grow">
                {data.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl hover:border-slate-600 transition-colors">
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-slate-400 font-sans">{item.name}</p>
                    <p className="text-2xl font-bold font-mono" style={{ color: item.color }}>{item.value}%</p>
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

export default Tokenomics;
