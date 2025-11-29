import React from 'react';
import { Scale, Heart, Hammer, Globe2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <div className="inline-block mb-4 px-3 py-1 border border-blue-500/30 rounded-full bg-blue-500/10">
              <span className="text-blue-400 font-serif text-xs uppercase tracking-widest font-bold">À Propos du Projet</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight">
              Souveraineté Numérique & <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Développement National</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
              Le <strong className="text-white">Franc Congolais (FC)</strong> n'est pas seulement une cryptomonnaie. C'est un instrument de transformation économique conçu pour la République Démocratique du Congo. 
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Notre mission est de fournir une alternative financière stable, sécurisée et accessible à tous les citoyens, tout en finançant des infrastructures numériques locales grâce à la technologie blockchain.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-blue-500/50 transition-colors">
                  <Globe2 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-white mb-1">Vision Panafricaine</h4>
                  <p className="text-slate-500 text-sm">Positionner la RDC comme le hub central de la finance décentralisée (DeFi) en Afrique Centrale.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-yellow-500/50 transition-colors">
                  <Heart className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-white mb-1">Inclusion Sociale</h4>
                  <p className="text-slate-500 text-sm">Permettre aux non-bancarisés d'accéder à l'épargne et aux paiements numériques sécurisés.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-3xl blur-2xl"></div>
            <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-3xl p-8 md:p-12 relative">
              <h3 className="text-2xl font-serif font-bold text-white mb-8 text-center border-b border-slate-800 pb-4">Nos Valeurs Fondamentales</h3>
              
              <div className="grid grid-cols-1 gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                    <Scale className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold text-white">Justice</h4>
                    <p className="text-slate-400 text-sm mt-1">Transparence totale des transactions et équité dans la distribution des richesses.</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-yellow-900/30 rounded-full flex items-center justify-center border border-yellow-500/30 flex-shrink-0">
                    <Heart className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold text-white">Paix</h4>
                    <p className="text-slate-400 text-sm mt-1">Stabilité économique pour favoriser un climat de confiance et de sécurité.</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center border border-red-500/30 flex-shrink-0">
                    <Hammer className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold text-white">Travail</h4>
                    <p className="text-slate-400 text-sm mt-1">Valorisation de l'effort entrepreneurial et soutien aux initiatives locales.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;