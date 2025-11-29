
import React from 'react';
import { Play, Image as ImageIcon, Share2, ExternalLink, Download, ArrowUpRight } from 'lucide-react';

const MediaGallery: React.FC = () => {
  const videos = [
    {
      id: 1,
      title: "Tuto : Acheter FC via Binance Web3 Wallet",
      thumbnail: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1920&auto=format&fit=crop",
      duration: "4:12",
      description: "Guide complet : Transférez des BNB vers votre portefeuille Binance Web3 et échangez-les contre des Francs Congolais."
    },
    {
      id: 2,
      title: "Échanger BNB/USDT contre FC sur PancakeSwap",
      thumbnail: "https://images.unsplash.com/photo-1516245834210-c4c14278733f?q=80&w=1920&auto=format&fit=crop",
      duration: "3:45",
      description: "Comment connecter Trust Wallet ou MetaMask à PancakeSwap pour obtenir vos tokens FC au meilleur prix."
    },
    {
      id: 3,
      title: "Importer le Token FC dans votre Portefeuille",
      thumbnail: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1920&auto=format&fit=crop",
      duration: "2:30",
      description: "Vous ne voyez pas vos FC ? Voici comment ajouter l'adresse du contrat manuellement dans MetaMask ou Trust Wallet."
    }
  ];

  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1000&auto=format&fit=crop", // Coins/Money
      category: "Concept",
      title: "Numérisation de la Monnaie"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1519074002996-a69e7ac6e0ed?q=80&w=1000&auto=format&fit=crop", // Professional/City
      category: "Institutionnel",
      title: "Kinshasa : Pôle Tech"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop", // Payment
      category: "Usage",
      title: "Paiements Mobiles Instantanés"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1622630998477-20aa696fa4f5?q=80&w=1000&auto=format&fit=crop", // Abstract Crypto
      category: "Technologie",
      title: "Blockchain Sécurisée"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop", // Women Tech
      category: "Communauté",
      title: "Entrepreneuriat Féminin"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", // Growth chart
      category: "Marché",
      title: "Croissance & Stabilité"
    }
  ];

  return (
    <section id="media" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-serif italic text-lg">Tutoriels & Actualités</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-2 mb-6">
            Comment Acquérir des FC ?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 mx-auto"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light mt-6 font-serif">
            Des guides vidéos pas à pas pour vous aider à acheter, échanger et sécuriser vos Francs Congolais dans votre portefeuille.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
            <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
              <Play className="w-6 h-6 text-red-500" />
              Guides Vidéos
            </h3>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors font-serif italic">
              Voir plus sur YouTube <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="group bg-slate-900 rounded-sm overflow-hidden border border-slate-800 hover:border-blue-900 transition-all duration-300 hover:-translate-y-2">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 font-mono">{video.duration}</span>
                </div>
                
                <div className="p-5">
                  <h4 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{video.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery Section */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
            <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
              <ImageIcon className="w-6 h-6 text-yellow-500" />
              Galerie Photo
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">{img.category}</span>
                  <h4 className="text-white font-serif font-bold text-lg">{img.title}</h4>
                </div>
                
                {/* Hover Overlay Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 transition-all duration-300"></div>
              </div>
            ))}
          </div>
          
          {/* Marketing Kit CTA */}
          <div className="mt-16 bg-slate-900 border border-slate-800 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
             
             <div className="relative z-10">
                <h4 className="text-3xl font-serif font-bold text-white mb-2">Kit Presse & Ambassadeur</h4>
                <p className="text-slate-400 max-w-xl font-serif">
                  Accédez aux ressources officielles : Logos HD, Charte Graphique, Bannières et Communiqués de presse.
                </p>
             </div>
             
             <button className="relative z-10 px-8 py-4 bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors flex items-center gap-3 rounded-sm shadow-lg">
                <Download className="w-5 h-5" />
                Télécharger les Assets
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
