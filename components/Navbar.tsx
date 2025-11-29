import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
// Importation explicite de l'image pour que Vite l'inclue dans le dossier dist
import logoImg from '../assets/img/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'tokenomics', 'roadmap', 'media', 'whitepaper'];
      const scrollPosition = window.scrollY + 100; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home', id: 'home' },
    { name: 'À Propos', href: '#about', id: 'about' },
    { name: 'Tokenomics', href: '#tokenomics', id: 'tokenomics' },
    { name: 'Roadmap', href: '#roadmap', id: 'roadmap' },
    { name: 'Média', href: '#media', id: 'media' },
    { name: 'Whitepaper', href: '#whitepaper', id: 'whitepaper' },
  ];

  const buyLink = "https://web3.binance.com/fr/token/bsc/0xddf5d280948c0c9529ffa93471ae5fb924084444";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(targetId);
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60 py-2 shadow-2xl' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Top Left */}
          <div 
            className="flex items-center gap-3 group cursor-pointer select-none"
            onClick={(e) => handleNavClick(e as any, '#home')}
          >
             {/* Utilisation de la variable importée */}
             <img src={logoImg} alt="FC Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-lg filter brightness-110" />
             
             <div className="flex flex-col">
                <span className="font-serif font-bold text-lg md:text-xl text-white tracking-wide leading-none">
                  FrancCongolais
                </span>
                <span className="font-sans text-[10px] md:text-[10px] text-yellow-500 tracking-[0.2em] font-bold uppercase mt-1">
                  Monnaie Nationale
                </span>
             </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 font-serif tracking-wide rounded-md ${
                    activeSection === link.id 
                      ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full mb-1"></span>
                  )}
                </a>
              ))}
              <a 
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white text-sm font-bold font-serif tracking-wider uppercase rounded-sm shadow-lg shadow-blue-900/20 transition-all hover:shadow-blue-600/30 hover:-translate-y-0.5 border border-blue-500/50"
              >
                Acheter FC
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden absolute w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-4 py-3 border-l-2 text-base font-serif transition-all ${
                activeSection === link.id
                  ? 'border-yellow-500 bg-slate-800/50 text-white font-bold'
                  : 'border-transparent hover:border-blue-500 hover:bg-slate-800/30 text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 px-4">
            <a 
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-5 py-3 bg-blue-600 text-white font-serif font-bold uppercase tracking-wider rounded-sm shadow-lg"
            >
              Acheter FC
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;