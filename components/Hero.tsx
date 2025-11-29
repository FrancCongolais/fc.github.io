
import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock, TrendingUp, ShieldCheck, Target, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';

const Hero: React.FC = () => {
  // Casting motion.div to any to resolve TypeScript errors with current framer-motion types configuration
  const MotionDiv = motion.div as any;

  const [prices, setPrices] = useState({
    usdt: '0.000005112',
    bnb: '0.000000006',
    change24h: -0.61
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Attempt to fetch from DexScreener for the specific token address
        const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/0xddf5d280948c0c9529ffa93471ae5fb924084444');
        
        if (!response.ok) {
            // Silently fail to fallback values
            return;
        }

        const data = await response.json();

        if (data.pairs && data.pairs.length > 0) {
          // Get the most liquid pair (usually first)
          const pair = data.pairs[0];
          setPrices({
            usdt: pair.priceUsd || '0.000005112',
            bnb: pair.priceNative || '0.000000006',
            change24h: pair.priceChange?.h24 || 0
          });
        }
      } catch (error) {
        // Silence errors to prevent console spam for user
        // console.warn("Using fallback prices due to fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Refresh every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const buyLink = "https://web3.binance.com/fr/token/bsc/0xddf5d280948c0c9529ffa93471ae5fb924084444";

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse duration-[4000ms]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center gap-8 mb-10">
             {/* Real-Time Price Badges */}
             <div className="flex flex-wrap justify-center gap-4">
               {/* FC/USDT Pair */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900/80 border border-blue-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)] rounded-lg animate-fade-in-up">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-slate-400 text-xs font-serif uppercase tracking-wider font-bold">FC / USDT</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700"></div>
                  <span className="text-white font-mono font-bold text-sm tracking-wide">
                    ${prices.usdt}
                  </span>
                  {prices.change24h !== 0 && (
                    <span className={`text-xs font-bold ${prices.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {prices.change24h > 0 ? '+' : ''}{prices.change24h}%
                    </span>
                  )}
                </div>

                {/* FC/BNB Pair */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900/80 border border-yellow-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.15)] rounded-lg animate-fade-in-up delay-100">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-slate-400 text-xs font-serif uppercase tracking-wider font-bold">FC / BNB</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700"></div>
                  <span className="text-yellow-400 font-mono font-bold text-sm tracking-wide">
                    {parseFloat(prices.bnb).toFixed(9)} BNB
                  </span>
                </div>
             </div>

            {/* Network Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-700 backdrop-blur-md shadow-lg rounded-sm mt-2">
              <span className="text-slate-300 text-[10px] font-serif font-bold tracking-widest uppercase">Binance Smart Chain (BEP-20)</span>
            </div>
            
            {/* Objective Badge */}
            <div className="group relative inline-flex items-center gap-5 py-4 px-8 bg-gradient-to-b from-slate-800 to-slate-900 border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.15)] cursor-default overflow-hidden rounded-sm mt-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="p-2 bg-yellow-900/20 border border-yellow-500/20 rounded-full">
                <Target className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 font-sans">Objectif National</span>
                <div className="flex items-baseline gap-3 font-serif">
                  <span className="text-white font-bold text-2xl">1 FC</span>
                  <span className="text-slate-500 text-lg italic">≥</span>
                  <span className="text-gradient-gold font-black text-2xl drop-shadow-sm">0.1 USDT</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-8 leading-[1.1]">
            L'Avenir Financier <br className="hidden md:block" />
            <span className="inline-block mt-2 text-gradient-blue-white bg-300% animate-gradient">
               de la RDC
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 font-serif italic leading-relaxed px-4 border-l-4 border-blue-600 pl-6 text-left md:text-center md:border-none md:pl-0">
            "Justice – Paix – Travail"
            <br/>
            <span className="text-slate-300 not-italic mt-2 block font-sans font-light text-base">
                Le Franc Congolais (FC) incarne la souveraineté numérique et l'innovation blockchain au service du peuple.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto px-4">
            <a 
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white font-serif font-bold uppercase tracking-wider transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 rounded-sm"
            >
              Acquérir des FC
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#whitepaper" 
              className="group px-8 py-4 bg-transparent hover:bg-white/5 text-white font-serif font-bold uppercase tracking-wider transition-all border border-slate-600 hover:border-white flex items-center justify-center gap-3 rounded-sm backdrop-blur-sm"
            >
              <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" /> 
              Livre Blanc
            </a>
          </div>
        </MotionDiv>

        <MotionDiv 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800 pt-12"
        >
          {[
            {
              icon: <Lock className="w-8 h-8" />,
              title: "Sécurité Souveraine",
              desc: "Contrat audité et liquidité verrouillée pour protéger l'épargne nationale."
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Stabilité Économique",
              desc: "Mécanismes anti-inflationnistes et frais de transaction intelligents (2-5%)."
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: "Fierté Nationale",
              desc: "Un symbole fort de l'indépendance technologique du Congo."
            }
          ].map((item, idx) => (
            <div key={idx} className="group text-left p-6 hover:bg-slate-900/50 transition-colors rounded-lg">
              <div className="mb-4 text-blue-500 group-hover:text-yellow-500 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-serif">{item.desc}</p>
            </div>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

export default Hero;
