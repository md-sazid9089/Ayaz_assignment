import { Link2, Target, Mail } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: <Link2 size={32} className="text-white" />,
      title: 'Add Product Link',
      description: 'Simply paste the product link from your favorite e-commerce website and add it to your tracker.',
    },
    {
      number: 2,
      icon: <Target size={32} className="text-white" />,
      title: 'Set Target Price',
      description: 'Define the price at which you want to purchase the product. We\'ll monitor it for you.',
    },
    {
      number: 3,
      icon: <Mail size={32} className="text-white" />,
      title: 'Get Notified',
      description: 'Receive an instant email notification when the price drops to your target price or below.',
    },
  ];

  return (
    <section id="about" className="bg-light py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg text-primary text-opacity-60 max-w-2xl mx-auto">
            Three simple steps to start saving money
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Step Number Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-full top-1/2 transform -translate-y-1/2 w-8 h-1 bg-accent -ml-4">
                      <div className="absolute right-0 w-2 h-2 bg-accent transform translate-y-1/2"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step Title and Description */}
              <h3 className="text-2xl font-bold text-primary mb-3">
                Step {step.number}: {step.title}
              </h3>
              <p className="text-primary text-opacity-60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-xl p-8 border-2 border-accent border-opacity-30 text-center">
          <p className="text-primary text-lg">
            <span className="font-semibold">No credit card required.</span> Start tracking prices
            for free today and unlock incredible savings!
          </p>
        </div>
      </div>
    </section>
  );
}
