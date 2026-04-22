import { useState, useEffect } from 'react';
import { Menu, X, Bell, LayoutDashboard } from 'lucide-react';

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
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-[#533638] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
              <Bell className="text-[#F7B9C4]" size={22} />
            </div>
            <span className="text-2xl font-['Outfit'] font-bold text-[#533638] tracking-tight">
              PriceTracker
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#533638]/70 hover:text-[#533638] transition-all duration-300 font-medium text-[15px] relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#533638] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleSignInClick}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#533638] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#533638]/20 hover:-translate-y-0.5"
            >
              <LayoutDashboard size={18} />
              Sign In
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
                className="block text-lg font-medium text-[#533638]/80 hover:text-[#533638] py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={handleSignInClick}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#533638] text-white rounded-2xl font-bold"
            >
              <LayoutDashboard size={20} />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
