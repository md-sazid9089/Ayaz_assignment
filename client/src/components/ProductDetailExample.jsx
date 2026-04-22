import React from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck, Clock, Tag, Globe, Settings2, BellRing, Share2, Calendar } from 'lucide-react';
import ProductPriceHistory from './ProductPriceHistory';

const ProductDetailExample = ({ onBack = () => {} }) => {
  // Sample product data
  const productData = {
    id: 1,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, and 30-hour battery life.',
    currentPrice: 348.00,
    oldPrice: 399.99,
    targetPrice: 300.00,
    imageUrl: '🎧',
    lastUpdateDate: 'Today at 2:30 PM',
    status: 'Significant Drop',
    priceChangePercent: 12.5,
    category: 'Electronics › Headphones',
    trackingSince: 'April 10, 2024',
    source: 'Amazon.com'
  };

  const priceHistoryData = [
    { date: 'Apr 10', price: 399.99 },
    { date: 'Apr 12', price: 380.50 },
    { date: 'Apr 14', price: 375.25 },
    { date: 'Apr 16', price: 362.75 },
    { date: 'Apr 18', price: 364.00 },
    { date: 'Apr 20', price: 350.50 },
    { date: 'Apr 22', price: 348.00 },
  ];

  return (
    <div className="min-h-screen bg-[#F5EDEC] selection:bg-[#F7B9C4]">
      {/* Premium Header */}
      <div className="bg-[#533638] text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/5 to-transparent opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F7B9C4] rounded-full blur-[100px] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-white/60 hover:text-[#F7B9C4] font-bold mb-10 transition-all duration-300"
          >
            <div className="p-2 bg-white/5 rounded-xl group-hover:bg-[#F7B9C4] group-hover:text-[#533638] transition-all">
              <ArrowLeft size={18} />
            </div>
            Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/10 text-[#F7B9C4] text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                  {productData.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  <ShieldCheck size={12} />
                  Verified Track
                </span>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-5xl shadow-2xl border border-white/10">
                  {productData.imageUrl}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black font-['Outfit'] leading-tight mb-2">
                    {productData.name}
                  </h1>
                  <p className="text-white/60 max-w-2xl font-medium text-lg leading-relaxed">
                    {productData.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="p-4 bg-white/5 hover:bg-[#F7B9C4] hover:text-[#533638] rounded-2xl transition-all duration-300 border border-white/5 shadow-xl group">
                <Share2 size={22} className="group-hover:scale-110 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-[#F7B9C4] text-[#533638] rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-white transition-all duration-300 shadow-2xl active:scale-95">
                <ExternalLink size={18} />
                VIEW ON STORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20 pb-20">
        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Current Price', value: `$${productData.currentPrice}`, icon: <Tag />, color: 'bg-white', text: 'text-[#533638]' },
            { label: 'Market Drop', value: `-${productData.priceChangePercent}%`, icon: <Clock />, color: 'bg-[#533638]', text: 'text-white' },
            { label: 'Potential Savings', value: `$${(productData.oldPrice - productData.currentPrice).toFixed(2)}`, icon: <Globe />, color: 'bg-[#F7B9C4]', text: 'text-[#533638]' },
            { label: 'Alert Status', value: 'Active', icon: <BellRing />, color: 'bg-white', text: 'text-[#533638]' },
          ].map((stat, idx) => (
            <div key={idx} className={`${stat.color} p-8 rounded-[2.5rem] border border-[#533638]/5 shadow-[0_15px_35px_rgba(83,54,56,0.05)] hover:-translate-y-2 transition-all duration-500`}>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-xl ${stat.text === 'text-white' ? 'bg-white/10' : 'bg-[#533638]/5'}`}>
                  {React.cloneElement(stat.icon, { size: 20, className: stat.text })}
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#F7B9C4]"></div>
              </div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${stat.text === 'text-white' ? 'opacity-40' : 'opacity-40'}`}>
                {stat.label}
              </p>
              <h3 className={`text-3xl font-black font-['Outfit'] ${stat.text}`}>
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Chart Area */}
          <div className="lg:col-span-2">
            <ProductPriceHistory
              productName={productData.name}
              currentPrice={productData.currentPrice}
              targetPrice={productData.targetPrice}
              lastUpdateDate={productData.lastUpdateDate}
              priceHistory={priceHistoryData}
              priceChangePercent={productData.priceChangePercent}
            />
          </div>

          {/* Sidebar Config & Details */}
          <div className="space-y-8">
            {/* Alert Settings Card */}
            <div className="bg-[#533638] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Settings2 className="text-[#F7B9C4]" size={24} />
                  <h2 className="text-2xl font-black font-['Outfit']">Alert Engine</h2>
                </div>
                
                <div className="space-y-6 mb-10">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Target Price Notification</p>
                    <p className="text-xl font-bold font-['Outfit'] text-[#F7B9C4]">${productData.targetPrice.toFixed(2)}</p>
                  </div>
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Drop Sensitivity</p>
                    <p className="text-xl font-bold font-['Outfit'] text-white">Any Change {'>'} 5%</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-white text-[#533638] rounded-2xl font-black text-sm hover:bg-[#F7B9C4] transition-all duration-300 shadow-xl active:scale-95">
                  CONFIGURE ENGINE
                </button>
              </div>
            </div>

            {/* Product Meta Card */}
            <div className="bg-white p-10 rounded-[3rem] border border-[#533638]/5 shadow-[0_15px_35px_rgba(83,54,56,0.03)]">
              <h3 className="text-xl font-black text-[#533638] font-['Outfit'] mb-8">Metadata</h3>
              <div className="space-y-6">
                {[
                  { label: 'Storefront', value: productData.source, icon: <Globe size={14} /> },
                  { label: 'Scan Frequency', value: 'Every 4 Hours', icon: <Clock size={14} /> },
                  { label: 'Tracking Start', value: productData.trackingSince, icon: <Calendar size={14} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-[#533638]/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[#533638]/40">{item.icon}</span>
                      <span className="text-xs font-bold text-[#533638]/40 uppercase tracking-widest">{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-[#533638]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailExample;
