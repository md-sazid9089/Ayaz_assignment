import { Bell, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#' },
        { name: 'Trackers', href: '#' },
        { name: 'Chrome Extension', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-[#533638] pt-24 pb-12 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#F7B9C4] rounded-2xl flex items-center justify-center">
                <Bell className="text-[#533638]" size={24} />
              </div>
              <span className="text-3xl font-['Outfit'] font-bold tracking-tight text-white">PriceTracker</span>
            </div>
            <p className="text-white/60 text-lg mb-8 max-w-sm leading-relaxed">
              The world's most advanced price tracking engine. Helping shoppers save millions by monitoring prices across the global web.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#F7B9C4] hover:text-[#533638] transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, i) => (
            <div key={i}>
              <h4 className="text-xl font-bold mb-8 text-[#F7B9C4]">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F7B9C4]/0 group-hover:bg-[#F7B9C4] transition-all"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 font-medium text-center md:text-left">
            &copy; {currentYear} PriceTracker. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/40 font-medium">
            Made with <Heart size={16} className="text-[#F7B9C4] fill-[#F7B9C4]" /> by <a href="#" className="text-white hover:text-[#F7B9C4] transition-colors">Ayaz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
