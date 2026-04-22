import { TrendingDown, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Dashboard', href: '#' },
        { name: 'Price Alerts', href: '#' },
        { name: 'Features', href: '#features' },
        { name: 'Global Stores', href: '#' },
      ],
    },
    {
      title: 'Intelligence',
      links: [
        { name: 'Market Insights', href: '#' },
        { name: 'Price History', href: '#' },
        { name: 'Saving Calculator', href: '#' },
        { name: 'API Access', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Our Mission', href: '#' },
        { name: 'Privacy Matrix', href: '#' },
        { name: 'Terms of Power', href: '#' },
        { name: 'Support Deck', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-[#533638] pt-24 pb-12 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F7B9C4]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#F7B9C4] rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <TrendingDown className="text-[#533638]" size={28} />
              </div>
              <span className="text-3xl font-['Outfit'] font-black tracking-tighter text-white">PEPTA</span>
            </div>
            <p className="text-white/40 text-lg mb-10 max-w-sm leading-relaxed font-medium">
              The world's most sophisticated price intelligence engine. Engineered to track, analyze, and optimize your global purchasing power.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#F7B9C4] hover:text-[#533638] transition-all duration-500 border border-white/5 group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-black mb-8 text-[#F7B9C4] uppercase tracking-[0.3em]">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className="text-white/40 hover:text-[#F7B9C4] transition-all duration-300 flex items-center gap-3 group text-sm font-bold">
                      <span className="w-1 h-1 rounded-full bg-[#F7B9C4] scale-0 group-hover:scale-150 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 font-bold text-[10px] uppercase tracking-widest text-center md:text-left">
            &copy; {currentYear} PEPTA INTELLIGENCE. ALL RIGHTS SECURED.
          </p>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest">
            ENGINEERED WITH <Heart size={14} className="text-[#F7B9C4] fill-[#F7B9C4] animate-pulse" /> FOR <a href="#" className="text-white hover:text-[#F7B9C4] transition-colors">AYAZ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
