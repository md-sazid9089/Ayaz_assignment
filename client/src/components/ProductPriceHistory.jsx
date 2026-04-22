import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingDown, Calendar, ArrowRight, Target, Info } from 'lucide-react';

const ProductPriceHistory = ({
  productName = 'Sony WH-1000XM5',
  currentPrice = 348.00,
  targetPrice = 300.00,
  lastUpdateDate = 'Today at 2:30 PM',
  priceHistory = [
    { date: 'Apr 10', price: 399.99 },
    { date: 'Apr 12', price: 380.50 },
    { date: 'Apr 14', price: 375.25 },
    { date: 'Apr 16', price: 362.75 },
    { date: 'Apr 18', price: 364.00 },
    { date: 'Apr 20', price: 350.50 },
    { date: 'Apr 22', price: 348.00 },
  ],
  priceChangePercent = 12.5,
}) => {
  const savingsNeeded = currentPrice < targetPrice ? 0 : (currentPrice - targetPrice).toFixed(2);
  const percentToTarget = ((currentPrice - targetPrice) / currentPrice * 100).toFixed(1);
  const priceDropped = priceChangePercent > 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#533638] text-white p-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
            {payload[0].payload.date}
          </p>
          <p className="text-xl font-black font-['Outfit']">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[3rem] border border-[#533638]/5 shadow-[0_20px_50px_rgba(83,54,56,0.05)] p-8 md:p-10 w-full group overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#F7B9C4] text-[#533638] text-[10px] font-black uppercase tracking-widest rounded-full">
              Price History
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-[#533638]/40 uppercase tracking-widest">
              <Calendar size={12} />
              Last updated: {lastUpdateDate}
            </span>
          </div>
          <h2 className="text-3xl font-black text-[#533638] font-['Outfit']">{productName}</h2>
        </div>

        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-[#533638]/40 uppercase tracking-widest mb-1">Current</p>
            <p className="text-3xl font-black text-[#533638] font-['Outfit']">${currentPrice.toFixed(2)}</p>
          </div>
          <div className="w-[1px] bg-[#533638]/10"></div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-[#533638]/40 uppercase tracking-widest mb-1">Target</p>
            <p className="text-3xl font-black text-[#F7B9C4] font-['Outfit']">${targetPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#F5EDEC] p-6 rounded-[2rem] border border-[#533638]/5 flex items-center justify-between group/stat hover:bg-[#533638] hover:text-white transition-all duration-500">
          <div>
            <p className="text-[10px] font-bold text-[#533638]/40 group-hover/stat:text-white/40 uppercase tracking-widest mb-1">Price Drop</p>
            <p className="text-2xl font-black font-['Outfit']">-{priceChangePercent}%</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#533638] shadow-sm group-hover/stat:scale-110 transition-transform">
            <TrendingDown size={24} />
          </div>
        </div>
        <div className="bg-[#533638] p-6 rounded-[2rem] text-white flex items-center justify-between group/stat hover:bg-[#F7B9C4] hover:text-[#533638] transition-all duration-500">
          <div>
            <p className="text-[10px] font-bold text-white/40 group-hover/stat:text-[#533638]/40 uppercase tracking-widest mb-1">Distance to Target</p>
            <p className="text-2xl font-black font-['Outfit']">{percentToTarget}%</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover/stat:bg-[#533638] group-hover/stat:text-white transition-all duration-500">
            <Target size={24} />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#F5EDEC]/30 rounded-[2.5rem] p-6 md:p-8 border border-[#533638]/5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-bold text-[#533638]/40 uppercase tracking-widest">
            12-Day Price Trajectory
          </h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#533638]/60">
              <span className="w-2.5 h-2.5 rounded-full bg-[#533638]"></span> Price
            </div>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceHistory}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#533638" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#533638" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#533638" strokeOpacity={0.05} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#533638', opacity: 0.4, fontSize: 10, fontWeight: 700 }}
                dy={15}
              />
              <YAxis 
                hide
                domain={['dataMin - 20', 'dataMax + 20']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#533638', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#533638" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={1500}
                activeDot={{ r: 8, strokeWidth: 0, fill: '#F7B9C4' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insight Footer */}
      <div className="mt-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 p-6 bg-white border border-[#533638]/5 rounded-3xl flex items-start gap-4">
          <div className="p-3 bg-[#F7B9C4]/20 text-[#533638] rounded-xl">
            <Info size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#533638] mb-1">Smart Insight</p>
            <p className="text-xs text-[#533638]/60 leading-relaxed font-medium">
              {priceDropped 
                ? `Price is down by ${priceChangePercent}%! You're getting closer to your $${targetPrice} target. We'll alert you the moment it hits.`
                : `Price has slightly increased. History suggests a drop might occur in the next 3-5 days. Stay tuned!`
              }
            </p>
          </div>
        </div>
        <button className="w-full md:w-auto px-8 py-4 bg-[#533638] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#F7B9C4] hover:text-[#533638] transition-all duration-300 shadow-xl group/btn">
          SET ALERT
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ProductPriceHistory;
