
import React from 'react';
import { FileText, Download, ArrowRight, ShieldCheck, Cpu, Lock } from 'lucide-react';

const Whitepaper: React.FC = () => {
  return (
    <section id="whitepaper" className="py-24 relative bg-slate-900 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-800 to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl border border-slate-700 p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs font-serif uppercase tracking-widest">
              <FileText className="w-3 h-3" /> Documentation Technique
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Livre Blanc Officiel <br/>
              <span className="text-blue-400 text-3xl md:text-4xl">Version 1.0</span>
            </h2>
            
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
              Plongez dans les détails techniques, économiques et stratégiques du Franc Congolais. Découvrez comment nous utilisons la Binance Smart Chain pour sécuriser l'avenir financier de la RDC.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="whitepaper/Projet Token.pdf" 
                target="_blank"
                className="px-8 py-4 bg-white text-slate-900 hover:bg-blue-50 font-bold rounded-sm shadow-lg flex items-center gap-3 transition-all hover:-translate-y-1 group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Télécharger le PDF
              </a>
              <button className="px-8 py-4 bg-transparent border border-slate-500 text-white hover:bg-white/5 font-medium rounded-sm flex items-center gap-3 transition-all">
                Lire en ligne <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="relative bg-slate-800 rounded-xl p-8 border border-slate-600 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold shadow-lg z-20">
                FC
              </div>
              
              <div className="space-y-6">
                <div className="h-2 w-20 bg-blue-500 rounded mb-8"></div>
                <h3 className="text-2xl font-serif font-bold text-white">Table des Matières</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <span>Architecture & Sécurité</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    <span>Smart Contract Upgradeable</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Lock className="w-5 h-5 text-blue-400" />
                    <span>Mécanisme Anti-Inflation</span>
                  </li>
                </ul>
                <div className="pt-6 mt-6 border-t border-slate-700 flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>SHA-256: 7a9c...2f1b</span>
                  <span>42 Pages</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Whitepaper;
