import { TrendingDown, BarChart3, Bell, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <TrendingDown size={40} className="text-accent" />,
      title: 'Price Tracking',
      description: 'Automatically track prices of your favorite products across multiple e-commerce platforms in real-time.',
    },
    {
      icon: <BarChart3 size={40} className="text-accent" />,
      title: 'Price History',
      description: 'View detailed price history charts to understand pricing trends and make informed purchasing decisions.',
    },
    {
      icon: <Bell size={40} className="text-accent" />,
      title: 'Smart Alerts',
      description: 'Receive instant email notifications when product prices drop below your target price.',
    },
    {
      icon: <Zap size={40} className="text-accent" />,
      title: 'Easy Dashboard',
      description: 'Manage all your tracked products in one beautiful, intuitive dashboard.',
    },
  ];

  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-primary text-opacity-60 max-w-2xl mx-auto">
            Everything you need to become a smarter shopper
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-light rounded-xl p-8 card-hover shadow-md border border-accent border-opacity-20"
            >
              <div className="mb-4 p-3 bg-accent bg-opacity-10 rounded-lg w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-primary text-opacity-60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
