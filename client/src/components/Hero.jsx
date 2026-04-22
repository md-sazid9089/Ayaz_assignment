import { ArrowRight, Play, Star } from 'lucide-react';

export default function Hero({ onGetStartedClick }) {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#F7B9C4]/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-[#533638]/5 rounded-full blur-[100px] -z-10"></div>

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-left animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-[#533638]/10 rounded-full mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#F7B9C4]"></span>
              <span className="text-sm font-bold text-[#533638]/70 tracking-wider uppercase">Smart Shopping Assistant</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 gradient-text">
              Track Prices <br />
              <span className="text-[#533638]">Save Money</span> <br />
              <span className="italic font-light">Effortlessly.</span>
            </h1>

            <p className="text-xl text-[#533638]/70 mb-10 max-w-xl leading-relaxed">
              Monitor your favorite products across the web. Get instant alerts when prices drop and never miss a deal again with our AI-powered tracking system.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <button 
                onClick={onGetStartedClick}
                className="btn-primary group text-lg"
              >
                Start Tracking Now
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
              </button>
              <button className="btn-secondary text-lg group">
                <div className="w-8 h-8 rounded-full bg-[#533638]/10 flex items-center justify-center transition-colors group-hover:bg-[#533638]/20">
                  <Play size={14} className="fill-[#533638] ml-0.5" />
                </div>
                See How It Works
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F5EDEC] bg-[#533638]/10 flex items-center justify-center text-[10px] font-bold">
                    User {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-[#F7B9C4] mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm font-semibold text-[#533638]/60">Trusted by 10,000+ smart shoppers</p>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative animate-fadeIn lg:block hidden">
            <div className="relative z-10 animate-float">
              <div className="bg-white p-4 rounded-[3rem] shadow-2xl shadow-[#533638]/10 border border-[#533638]/5">
                <img 
                  src="/hero_product_tracking_1776853859376.png" 
                  alt="Price Tracking Dashboard" 
                  className="rounded-[2.5rem] w-full"
                />
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-[#533638]/5 animate-float-delayed z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <ArrowRight className="text-green-600 rotate-45" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#533638]">Price Dropped!</p>
                  <p className="text-xs text-[#533638]/50">Saved $45.00 on Sony A7</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 bg-[#533638] p-6 rounded-3xl shadow-xl animate-float z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Star className="text-[#F7B9C4]" size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Top Rated App</p>
                  <p className="text-xs text-white/50">#1 Price Tracker 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
