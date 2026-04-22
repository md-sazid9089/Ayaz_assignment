import { TrendingDown, BarChart3, Bell, Zap, Shield, Globe } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <TrendingDown size={28} />,
      title: 'Real-time Tracking',
      description: 'Our engine monitors price changes every hour across thousands of e-commerce platforms.',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Insightful Analytics',
      description: 'Beautifully visualized historical data helps you predict the best time to buy.',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: <Bell size={28} />,
      title: 'Smart Notifications',
      description: 'Receive instant email and push alerts the moment a price hits your target.',
      color: 'bg-[#F7B9C4]/20 text-[#533638]',
    },
    {
      icon: <Zap size={28} />,
      title: 'Lightning Fast',
      description: 'Add any product link and start tracking in seconds. No complex setup required.',
      color: 'bg-orange-50 text-orange-600',
    },
    {
      icon: <Shield size={28} />,
      title: 'Private & Secure',
      description: 'Your tracking lists and personal data are encrypted and never shared.',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: <Globe size={28} />,
      title: 'Global Support',
      description: 'Track products from Amazon, eBay, Walmart, and hundreds of local retailers.',
      color: 'bg-cyan-50 text-cyan-600',
    },
  ];

  return (
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[15rem] font-bold text-[#533638]/[0.02] select-none pointer-events-none whitespace-nowrap">
        FEATURES
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-[#533638] mb-6 tracking-tight">
            Elevate Your <br />
            <span className="gradient-text">Shopping Strategy</span>
          </h2>
          <p className="text-xl text-[#533638]/60 max-w-2xl mx-auto leading-relaxed">
            Harness the power of data to make informed purchasing decisions and save thousands annually.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-premium group"
            >
              <div className={`mb-8 w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#533638] mb-4 group-hover:text-[#F7B9C4] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-[#533638]/60 leading-relaxed text-lg">
                {feature.description}
              </p>
              
              <div className="mt-8 pt-8 border-t border-[#533638]/5 flex items-center gap-2 text-sm font-bold text-[#533638]/40 group-hover:text-[#533638] transition-colors duration-300 cursor-pointer">
                LEARN MORE <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ size, className }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
