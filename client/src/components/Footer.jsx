import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">PriceTracker</h3>
            <p className="text-accent text-opacity-70">
              Smart price tracking for smarter shopping
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-accent transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-accent transition-colors duration-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors duration-300">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-accent transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors duration-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <p className="text-accent text-opacity-70 mb-2">
              Email: hello@pricetracker.com
            </p>
            <p className="text-accent text-opacity-70">
              Support available 24/7
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent border-opacity-20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-accent text-opacity-70 text-center md:text-left mb-4 md:mb-0">
              &copy; {currentYear} Product Price Tracking System. All rights reserved.
            </p>
            <div className="flex items-center text-accent">
              Made with
              <Heart size={18} className="mx-2 fill-accent" />
              for smart shoppers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
