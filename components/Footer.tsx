
import React from 'react';
import { Twitter, Mail, MessageCircle, ExternalLink, Coins, Github, Send, LineChart, Globe, Wallet } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white font-serif mb-6">Franc Congolais (FC)</h3>
            <p className="text-slate-400 max-w-sm mb-6 font-serif">
              La première cryptomonnaie symbolisant la valeur nationale, la stabilité économique et la transformation numérique en RDC.
            </p>
            <div className="flex space-x-3">
              <a href="https://t.me/+UZUNcqtBESgxM2Zk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-800 hover:bg-blue-500 hover:text-white hover:border-blue-500 text-slate-400 transition-all">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://x.com/franc_Congo_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-800 hover:bg-black hover:text-white hover:border-slate-600 text-slate-400 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://chat.whatsapp.com/BF4PnVTYJp1Lpnzm9IatSq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-800 hover:bg-green-500 hover:text-white hover:border-green-500 text-slate-400 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://github.com/FrancCongolais/fc.github.io" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 text-slate-400 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:franc.congolais.fc@gmail.com" className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-800 hover:bg-red-500 hover:text-white hover:border-red-500 text-slate-400 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Liens Rapides</h4>
            <ul className="space-y-3 font-serif">
              <li><a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Accueil</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">À Propos</a></li>
              <li><a href="#tokenomics" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Tokenomics</a></li>
              <li><a href="#roadmap" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Roadmap</a></li>
              <li><a href="#media" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Média</a></li>
              <li><a href="#whitepaper" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Whitepaper</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Support & Contact</h4>
            <ul className="space-y-3 font-serif">
              <li className="flex items-center text-slate-400 text-sm group">
                <Send className="w-4 h-4 mr-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                <a href="https://t.me/+UZUNcqtBESgxM2Zk" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                  Canal Telegram
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm group">
                <MessageCircle className="w-4 h-4 mr-3 text-slate-500 group-hover:text-green-400 transition-colors" />
                <a href="https://chat.whatsapp.com/BF4PnVTYJp1Lpnzm9IatSq" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                  Groupe WhatsApp Officiel
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm group">
                <Mail className="w-4 h-4 mr-3 text-slate-500 group-hover:text-red-400 transition-colors" />
                <a href="mailto:franc.congolais.fc@gmail.com" className="group-hover:text-white transition-colors">
                  franc.congolais.fc@gmail.com
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm group">
                <ExternalLink className="w-4 h-4 mr-3 text-slate-500 group-hover:text-yellow-400 transition-colors" />
                <a href="https://bscscan.com/token/0xddf5d280948c0c9529ffa93471ae5fb924084444" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                  Voir sur BscScan
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm group">
                <LineChart className="w-4 h-4 mr-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                <a href="https://dex.coinmarketcap.com/fr/token/bsc/0xddf5d280948c0c9529ffa93471ae5fb924084444" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                  CoinMarketCap DEX
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm group">
                <Globe className="w-4 h-4 mr-3 text-slate-500 group-hover:text-teal-400 transition-colors" />
                <a href="https://www.kucoin.com/fr/web3/swap?inputCurrency=2&outputCurrency=6898177" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                  KuCoin Web3 Swap
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm group">
                <Coins className="w-4 h-4 mr-3 text-slate-500 group-hover:text-pink-400 transition-colors" />
                <a href="https://four.meme/token/0xddf5d280948c0c9529ffa93471ae5fb924084444?code=SZDG2N7YXATJ" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                  Acheter sur Four.meme
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm group">
                <Wallet className="w-4 h-4 mr-3 text-slate-500 group-hover:text-yellow-500 transition-colors" />
                <a href="https://web3.binance.com/fr/token/bsc/0xddf5d280948c0c9529ffa93471ae5fb924084444" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                  Acheter sur Binance Web3
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm group">
                <Github className="w-4 h-4 mr-3 text-slate-500 group-hover:text-white transition-colors" />
                <a href="https://github.com/FrancCongolais/fc.github.io" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                  Code Source (GitHub)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm font-serif">
            &copy; {new Date().getFullYear()} Franc Congolais. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-serif">
             <span className="text-slate-600 text-sm">Justice</span>
             <span className="text-slate-600 text-sm">•</span>
             <span className="text-slate-600 text-sm">Paix</span>
             <span className="text-slate-600 text-sm">•</span>
             <span className="text-slate-600 text-sm">Travail</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
