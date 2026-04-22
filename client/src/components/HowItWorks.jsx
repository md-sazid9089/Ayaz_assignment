import { Link2, Target, Mail, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <Link2 size={32} />,
      title: 'Find Your Product',
      description: 'Copy the URL of any product you want to track from your favorite online store.',
    },
    {
      number: '02',
      icon: <Target size={32} />,
      title: 'Set Your Price',
      description: 'Tell us how much you want to pay. We\'ll monitor the price around the clock.',
    },
    {
      number: '03',
      icon: <Mail size={32} />,
      title: 'Get Instant Alerts',
      description: 'The moment the price drops to your target, we\'ll send you a notification.',
    },
  ];

  return (
    <section id="about" className="py-32 bg-[#F5EDEC]">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left Content */}
          <div className="lg:w-1/3 text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#533638] mb-8 leading-tight">
              Start Saving in <br />
              <span className="text-[#F7B9C4]">Three Simple</span> Steps
            </h2>
            <p className="text-lg text-[#533638]/60 mb-10 leading-relaxed">
              We've simplified price tracking so you can focus on what matters most: getting the products you love at the prices you want.
            </p>
            <button className="btn-primary group">
              Try It Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>

          {/* Right Content - Timeline */}
          <div className="lg:w-2/3 grid gap-12 relative">
            {/* Vertical Line for Desktop */}
            <div className="absolute left-[40px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#533638]/20 via-[#F7B9C4] to-[#533638]/20 hidden md:block"></div>

            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-10 relative items-start group">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-[#533638]/5 flex items-center justify-center text-[#533638] transition-all duration-500 group-hover:bg-[#533638] group-hover:text-white group-hover:-rotate-12">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#F7B9C4] rounded-full flex items-center justify-center text-xs font-bold text-[#533638]">
                    {step.number}
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-[#533638] mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {step.title}
                  </h3>
                  <p className="text-lg text-[#533638]/60 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Call to Action Card */}
        <div className="mt-32 glass rounded-[3rem] p-12 text-center border-2 border-[#F7B9C4]/30 shadow-2xl shadow-[#533638]/5 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#F7B9C4]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#533638]/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-[#533638] mb-6 italic">"The smartest way to shop online."</h3>
            <p className="text-xl text-[#533638]/60 mb-10 max-w-2xl mx-auto font-medium">
              Join thousands of users who are already saving money on every purchase.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-bold text-[#533638]">1.2M+ Products Tracked</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#F7B9C4]"></div>
                <span className="font-bold text-[#533638]">$15M Total Saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
