export default function Hero() {
  return (
    <section id="home" className="bg-light py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
          Track Product Prices Smartly
          <br />
          <span className="text-accent">and Never Miss a Deal</span>
        </h1>

        <p className="text-lg md:text-xl text-primary text-opacity-70 mb-8 max-w-3xl mx-auto leading-relaxed">
          Monitor product prices from your favorite e-commerce websites, view detailed price
          history, and receive instant email alerts when prices drop. Take control of your
          shopping experience with our intelligent price tracking system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="btn-primary text-lg">
            Get Started
          </button>
          <button className="btn-secondary text-lg">
            Learn More
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-12">
          <svg className="mx-auto w-full max-w-2xl text-accent opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
              className="fill-current"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
