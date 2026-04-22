import { useState, useEffect } from 'react';
import { Menu, X, TrendingDown, LayoutDashboard } from 'lucide-react';

export default function Navbar({ onGetStartedClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#about' },
  ];

  const handleSignInClick = () => {
    if (onGetStartedClick) {
      onGetStartedClick();
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div 
          className={`flex justify-between items-center px-6 lg:px-10 h-16 rounded-3xl transition-all duration-500 ${
            scrolled 
              ? 'glass shadow-lg shadow-[#533638]/5' 
              : 'bg-transparent'
          }`}
        >
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-[#533638] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-300 shadow-lg shadow-[#533638]/20">
              <TrendingDown className="text-[#F7B9C4]" size={22} />
            </div>
            <span className="text-2xl font-['Outfit'] font-black text-[#533638] tracking-tighter">
              PEPTA
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#533638]/70 hover:text-[#533638] transition-all duration-300 font-bold text-xs uppercase tracking-widest relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F7B9C4] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleSignInClick}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#533638] text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#F7B9C4] hover:text-[#533638] hover:shadow-lg hover:shadow-[#533638]/10 hover:-translate-y-0.5 active:scale-95"
            >
              <LayoutDashboard size={16} />
              COMMAND CENTER
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#533638] hover:bg-[#533638]/5 rounded-xl transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-6 right-6 mt-4 transition-all duration-500 origin-top ${
            isOpen 
              ? 'opacity-100 scale-100 visible' 
              : 'opacity-0 scale-95 invisible'
          }`}
        >
          <div className="glass rounded-[2rem] p-6 shadow-2xl shadow-[#533638]/10 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm font-black text-[#533638]/80 hover:text-[#533638] py-2 uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={handleSignInClick}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#533638] text-white rounded-2xl font-black text-xs uppercase tracking-widest"
            >
              <LayoutDashboard size={18} />
              COMMAND CENTER
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
