import { useState } from 'react';
import { 
  LogOut, Menu, X, Plus, Edit2, Trash2, Bell, User, 
  Home, Package, AlertCircle, Settings, Search, 
  TrendingDown, ExternalLink, Filter, ChevronRight,
  TrendingUp, Activity, PieChart
} from 'lucide-react';
import ProductDetailExample from './ProductDetailExample';

export default function Dashboard({ userEmail, onSignOut }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productURL, setProductURL] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editURL, setEditURL] = useState('');
  const [editTargetPrice, setEditTargetPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample product data with more realistic details
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Sony WH-1000XM5 Wireless Headphones',
      url: 'https://amazon.com/sony-wh1000xm5',
      image: '🎧',
      currentPrice: 348.00,
      oldPrice: 399.99,
      targetPrice: 300.00,
      status: 'watching',
      lastUpdate: '2 hours ago',
      history: [399, 380, 360, 348]
    },
    {
      id: 2,
      name: 'Apple MacBook Pro M3 Max',
      url: 'https://apple.com/macbook-pro',
      image: '💻',
      currentPrice: 2499.00,
      oldPrice: 2499.00,
      targetPrice: 2200.00,
      status: 'watching',
      lastUpdate: '5 hours ago',
      history: [2499, 2499, 2499, 2499]
    },
    {
      id: 3,
      name: 'Logitech MX Master 3S',
      url: 'https://amazon.com/mx-master-3s',
      image: '🖱️',
      currentPrice: 89.00,
      oldPrice: 99.00,
      targetPrice: 85.00,
      status: 'price-drop',
      lastUpdate: '10 mins ago',
      history: [99, 99, 95, 89]
    },
  ]);

  // If a product is selected, show the detail view
  if (selectedProduct) {
    return <ProductDetailExample onBack={() => setSelectedProduct(null)} />;
  }

  // Calculate summary stats
  const totalProducts = products.length;
  const priceDrops = products.filter(p => p.status === 'price-drop').length;
  const potentialSavings = products.reduce((acc, p) => acc + (p.oldPrice - p.currentPrice), 0).toFixed(2);

  // Validate form
  const validateForm = (url, price) => {
    const newErrors = {};
    if (!url.trim()) newErrors.url = 'Product URL is required';
    if (!price) {
      newErrors.price = 'Target price is required';
    } else if (isNaN(price) || price < 0) {
      newErrors.price = 'Please enter a valid price';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate product name from URL
  const generateProductName = (url) => {
    try {
      const hostname = new URL(url).hostname.replace('www.', '').split('.')[0];
      return `${hostname.charAt(0).toUpperCase() + hostname.slice(1)} Product`;
    } catch {
      return 'New Product';
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!validateForm(productURL, targetPrice)) return;

    const newProduct = {
      id: Date.now(),
      name: generateProductName(productURL),
      url: productURL,
      image: ['🛍️', '💼', '🎁', '📦', '🏷️'][Math.floor(Math.random() * 5)],
      currentPrice: parseFloat((Math.random() * 500 + 20).toFixed(2)),
      oldPrice: parseFloat((Math.random() * 500 + 20).toFixed(2)),
      targetPrice: parseFloat(targetPrice),
      status: Math.random() > 0.7 ? 'price-drop' : 'watching',
      lastUpdate: 'Just now',
      history: [200, 190, 185]
    };

    setProducts([newProduct, ...products]);
    setProductURL('');
    setTargetPrice('');
    setErrors({});
  };

  const handleEditProduct = (product) => {
    setEditingId(product.id);
    setEditURL(product.url);
    setEditTargetPrice(product.targetPrice.toString());
  };

  const handleSaveEdit = (id) => {
    if (!validateForm(editURL, editTargetPrice)) return;
    setProducts(products.map(p =>
      p.id === id ? { ...p, url: editURL, targetPrice: parseFloat(editTargetPrice) } : p
    ));
    setEditingId(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const navItems = [
    { label: 'Dashboard', icon: <Home size={22} /> },
    { label: 'Inventory', icon: <Package size={22} /> },
    { label: 'Price Alerts', icon: <Activity size={22} /> },
    { label: 'Analytics', icon: <PieChart size={22} /> },
    { label: 'Settings', icon: <Settings size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F5EDEC] flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col w-72 bg-[#533638] text-white transition-all duration-300`}>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#F7B9C4] rounded-xl flex items-center justify-center">
              <TrendingDown size={24} className="text-[#533638]" />
            </div>
            <span className="text-2xl font-black tracking-tight font-['Outfit']">PEPTA</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  activeTab === item.label
                    ? 'bg-white/10 text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={activeTab === item.label ? 'text-[#F7B9C4]' : ''}>{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F7B9C4] flex items-center justify-center text-[#533638] font-bold">
                {userEmail?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate">{userEmail.split('@')[0]}</p>
                <p className="text-xs text-white/40 truncate">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-sm font-bold"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-6 left-6 z-50 p-3 bg-[#533638] text-white rounded-2xl shadow-xl"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-[#533638] h-full p-8 shadow-2xl flex flex-col">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-8 right-8 text-white/60 hover:text-white">
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-[#F7B9C4] rounded-xl flex items-center justify-center">
                <TrendingDown size={24} className="text-[#533638]" />
              </div>
              <span className="text-2xl font-black text-white font-['Outfit']">PEPTA</span>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { setActiveTab(item.label); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                    activeTab === item.label ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth px-6 md:px-12 py-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#533638] mb-2 font-['Outfit']">
              Dashboard <span className="text-[#F7B9C4]">.</span>
            </h1>
            <p className="text-[#533638]/60 font-medium">Welcome back, {userEmail.split('@')[0]}! Here's what's happening.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#533638]/40" size={18} />
              <input 
                type="text" 
                placeholder="Search products..."
                className="pl-11 pr-4 py-3 bg-white border border-[#533638]/5 rounded-2xl w-64 focus:outline-none focus:ring-2 focus:ring-[#F7B9C4]/30 transition-all font-medium"
              />
            </div>
            <button className="p-3 bg-white border border-[#533638]/5 rounded-2xl text-[#533638]/60 hover:bg-[#F7B9C4] hover:text-[#533638] transition-all duration-300 relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Tracked Items', value: totalProducts, icon: <Package className="text-white" />, color: 'bg-[#533638]', trend: '+2 this week' },
            { label: 'Price Drops', value: priceDrops, icon: <TrendingDown className="text-[#533638]" />, color: 'bg-[#F7B9C4]', trend: 'Active now' },
            { label: 'Total Savings', value: `$${potentialSavings}`, icon: <TrendingUp className="text-white" />, color: 'bg-[#533638]/80', trend: 'Saved this month' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-[#533638]/5 shadow-[0_10px_30px_rgba(83,54,56,0.03)] hover:shadow-[0_20px_40px_rgba(83,54,56,0.06)] transition-all duration-500 group">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-[#533638]/5 text-[#533638]/60 rounded-full uppercase tracking-wider">
                  {stat.trend}
                </span>
              </div>
              <p className="text-sm font-bold text-[#533638]/40 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-[#533638] font-['Outfit']">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Action & Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Add Product Section */}
          <div className="lg:col-span-1">
            <div className="bg-[#533638] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-6 font-['Outfit']">Track New Product</h2>
                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-1">Product URL</label>
                    <input
                      type="text"
                      placeholder="Paste link from Amazon, eBay..."
                      value={productURL}
                      onChange={(e) => {
                        setProductURL(e.target.value);
                        if (errors.url) setErrors(prev => ({ ...prev, url: '' }));
                      }}
                      className={`w-full px-5 py-4 bg-white/10 border-2 rounded-2xl text-white placeholder-white/30 focus:outline-none transition-all ${
                        errors.url ? 'border-red-400' : 'border-white/5 focus:border-[#F7B9C4]/50'
                      }`}
                    />
                    {errors.url && <p className="text-red-400 text-xs mt-2 font-bold">{errors.url}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-1">Target Price ($)</label>
                    <input
                      type="number"
                      placeholder="e.g. 99.99"
                      step="0.01"
                      value={targetPrice}
                      onChange={(e) => {
                        setTargetPrice(e.target.value);
                        if (errors.price) setErrors(prev => ({ ...prev, price: '' }));
                      }}
                      className={`w-full px-5 py-4 bg-white/10 border-2 rounded-2xl text-white placeholder-white/30 focus:outline-none transition-all ${
                        errors.price ? 'border-red-400' : 'border-white/5 focus:border-[#F7B9C4]/50'
                      }`}
                    />
                    {errors.price && <p className="text-red-400 text-xs mt-2 font-bold">{errors.price}</p>}
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#F7B9C4] text-[#533638] rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 shadow-xl active:scale-95">
                    <Plus size={20} />
                    START TRACKING
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Product List Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#533638] font-['Outfit']">Tracked Products</h2>
              <div className="flex gap-2">
                <button className="p-2.5 bg-white border border-[#533638]/5 rounded-xl text-[#533638]/60 hover:bg-[#F5EDEC] transition-all">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="bg-white/50 border-2 border-dashed border-[#533638]/10 rounded-[2.5rem] p-20 text-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-sm">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-[#533638] mb-2">No products yet</h3>
                <p className="text-[#533638]/60 font-medium">Add your first product to start tracking prices.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white p-6 rounded-[2.5rem] border border-[#533638]/5 shadow-[0_10px_30px_rgba(83,54,56,0.02)] hover:shadow-[0_20px_50px_rgba(83,54,56,0.08)] transition-all duration-500 group cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Product Image/Icon */}
                      <div className="w-full md:w-32 h-32 bg-[#F5EDEC] rounded-[2rem] flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                        {product.image}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-black text-[#533638] truncate pr-4 font-['Outfit']">{product.name}</h3>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleEditProduct(product); }} 
                              className="p-2 bg-[#F5EDEC] text-[#533638]/60 hover:bg-[#533638] hover:text-white rounded-xl transition-all"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }} 
                              className="p-2 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-6">
                          <p className="text-sm font-medium text-[#533638]/40 truncate">{product.url}</p>
                          <a 
                            href={product.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#F7B9C4] hover:text-[#533638] transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>

                        {/* Pricing and Status */}
                        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                          <div>
                            <p className="text-[10px] font-bold text-[#533638]/30 uppercase tracking-widest mb-1">Current Price</p>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-[#533638]">${product.currentPrice.toFixed(2)}</span>
                              {product.oldPrice > product.currentPrice && (
                                <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-lg flex items-center gap-1">
                                  <TrendingDown size={14} />
                                  -{((1 - product.currentPrice / product.oldPrice) * 100).toFixed(0)}%
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-[#533638]/30 uppercase tracking-widest mb-1">Target Price</p>
                            <span className="text-2xl font-black text-[#F7B9C4]">${product.targetPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex-1 flex justify-end items-center">
                            <span className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border ${
                              product.status === 'price-drop'
                                ? 'bg-green-50 text-green-600 border-green-100'
                                : 'bg-[#F5EDEC] text-[#533638]/40 border-[#533638]/5'
                            }`}>
                              {product.status === 'price-drop' ? '🎉 Price Reached!' : '👁️ Tracking'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
