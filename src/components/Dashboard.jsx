import { LogOut, Home, BarChart3, Settings } from 'lucide-react';

export default function Dashboard({ userEmail, onSignOut }) {
  return (
    <div className="min-h-screen bg-light">
      {/* Dashboard Navbar */}
      <nav className="bg-primary shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">PriceTracker</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-accent font-medium hidden md:block">
                Welcome, {userEmail}!
              </span>
              <button
                onClick={onSignOut}
                className="flex items-center space-x-2 text-white hover:text-accent transition-colors duration-300"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg text-primary text-opacity-60">
            You have successfully signed in to the Product Price Tracking System
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary text-opacity-60 text-sm font-semibold">
                  PRODUCTS TRACKED
                </p>
                <p className="text-4xl font-bold text-primary mt-2">0</p>
              </div>
              <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
                <BarChart3 size={32} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-accent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary text-opacity-60 text-sm font-semibold">
                  PRICE DROPS
                </p>
                <p className="text-4xl font-bold text-primary mt-2">0</p>
              </div>
              <div className="bg-accent bg-opacity-10 p-4 rounded-lg">
                <Home size={32} className="text-accent" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary text-opacity-60 text-sm font-semibold">
                  POTENTIAL SAVINGS
                </p>
                <p className="text-4xl font-bold text-primary mt-2">$0</p>
              </div>
              <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
                <Settings size={32} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Ready to Start Tracking Prices?
          </h2>
          <p className="text-lg text-primary text-opacity-60 mb-8 max-w-2xl mx-auto">
            Add your first product link to get started with price monitoring. Click the button below to begin.
          </p>
          <button className="btn-primary text-lg">
            + Add Your First Product
          </button>
        </div>

        {/* Dashboard Guide */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">📊 Dashboard Features</h3>
            <ul className="space-y-3 text-primary text-opacity-70">
              <li className="flex items-start">
                <span className="text-accent font-bold mr-3">✓</span>
                <span>Track unlimited products across e-commerce platforms</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent font-bold mr-3">✓</span>
                <span>View real-time price updates and historical trends</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent font-bold mr-3">✓</span>
                <span>Receive email alerts when prices drop</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent font-bold mr-3">✓</span>
                <span>Manage your tracked products in one place</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">🚀 Quick Tips</h3>
            <ul className="space-y-3 text-primary text-opacity-70">
              <li className="flex items-start">
                <span className="text-accent font-bold mr-3">1.</span>
                <span>Add product links from Amazon, eBay, or any e-commerce site</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent font-bold mr-3">2.</span>
                <span>Set your target price for notifications</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent font-bold mr-3">3.</span>
                <span>Enable email alerts to stay informed</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent font-bold mr-3">4.</span>
                <span>Review your savings in the analytics dashboard</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
