import { useState } from 'react';
import { LogOut, Menu, X, Plus, Edit2, Trash2, Bell, User, Home, Package, AlertCircle, Settings } from 'lucide-react';

export default function Dashboard({ userEmail, onSignOut }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productURL, setProductURL] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editURL, setEditURL] = useState('');
  const [editTargetPrice, setEditTargetPrice] = useState('');
  const [errors, setErrors] = useState({});

  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      url: 'amazon.com/product/headphones',
      image: '🎧',
      currentPrice: 149.99,
      targetPrice: 99.99,
      status: 'watching',
    },
    {
      id: 2,
      name: 'USB-C Cable 3M',
      url: 'ebay.com/product/cable',
      image: '🔌',
      currentPrice: 12.99,
      targetPrice: 8.99,
      status: 'watching',
    },
    {
      id: 3,
      name: 'Mechanical Keyboard RGB',
      url: 'newegg.com/product/keyboard',
      image: '⌨️',
      currentPrice: 89.99,
      targetPrice: 69.99,
      status: 'price-drop',
    },
  ]);

  // Calculate summary stats
  const totalProducts = products.length;
  const priceDrops = products.filter(p => p.status === 'price-drop').length;
  const activeAlerts = products.filter(p => p.currentPrice > p.targetPrice).length;

  // Validate form
  const validateForm = (url, price) => {
    const newErrors = {};

    if (!url.trim()) {
      newErrors.url = 'Product URL is required';
    }

    if (!price) {
      newErrors.price = 'Target price is required';
    } else if (isNaN(price) || price < 0) {
      newErrors.price = 'Please enter a valid price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate product name from URL (simple)
  const generateProductName = (url) => {
    const parts = url.split('/');
    const productPart = parts[parts.length - 1] || parts[parts.length - 2];
    return productPart.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Handle add product
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!validateForm(productURL, targetPrice)) {
      return;
    }

    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: generateProductName(productURL),
      url: productURL,
      image: ['🛍️', '💼', '🎁', '📦', '🏷️'][Math.floor(Math.random() * 5)],
      currentPrice: parseFloat((Math.random() * 500 + 20).toFixed(2)),
      targetPrice: parseFloat(targetPrice),
      status: Math.random() > 0.7 ? 'price-drop' : 'watching',
    };

    setProducts([newProduct, ...products]);
    setProductURL('');
    setTargetPrice('');
    setErrors({});
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingId(product.id);
    setEditURL(product.url);
    setEditTargetPrice(product.targetPrice.toString());
  };

  // Handle save edit
  const handleSaveEdit = (id) => {
    if (!validateForm(editURL, editTargetPrice)) {
      return;
    }

    setProducts(products.map(p =>
      p.id === id
        ? {
            ...p,
            url: editURL,
            targetPrice: parseFloat(editTargetPrice),
          }
        : p
    ));

    setEditingId(null);
    setEditURL('');
    setEditTargetPrice('');
    setErrors({});
  };

  // Handle delete product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const navItems = [
    { label: 'Dashboard', icon: <Home size={20} /> },
    { label: 'Tracked Products', icon: <Package size={20} /> },
    { label: 'Alerts', icon: <AlertCircle size={20} /> },
    { label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-light">
      {/* Top Navbar */}
      <nav className="bg-primary shadow-md sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-white hover:text-accent transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="text-2xl font-bold text-white">PriceTracker</span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 text-white hover:text-accent transition-colors">
                <Bell size={20} />
              </button>
              <button className="hidden md:flex items-center space-x-2 text-white hover:text-accent transition-colors">
                <User size={20} />
              </button>
              <button
                onClick={onSignOut}
                className="flex items-center space-x-2 text-white hover:text-accent transition-colors"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed md:relative md:flex md:w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } w-64 min-h-screen z-40`}
        >
          <div className="w-full p-6">
            <div className="mb-8">
              <span className="text-sm font-semibold text-primary text-opacity-60 uppercase tracking-wide">Menu</span>
            </div>

            <nav className="space-y-3">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    index === 0
                      ? 'bg-accent bg-opacity-20 text-primary font-semibold'
                      : 'text-primary hover:bg-light'
                  }`}
                >
                  <span className="text-primary">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-12 p-4 bg-light rounded-lg border border-accent border-opacity-20">
              <p className="text-sm text-primary text-opacity-70">
                👤 Signed in as<br />
                <span className="font-semibold text-primary">{userEmail}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Welcome back! 👋</h1>
            <p className="text-lg text-primary text-opacity-60">
              Manage your tracked products and stay updated with price changes.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary text-opacity-60 text-sm font-semibold">TRACKED PRODUCTS</p>
                  <p className="text-4xl font-bold text-primary mt-2">{totalProducts}</p>
                </div>
                <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
                  <Package size={32} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-accent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary text-opacity-60 text-sm font-semibold">PRICE DROPS</p>
                  <p className="text-4xl font-bold text-primary mt-2">{priceDrops}</p>
                </div>
                <div className="bg-accent bg-opacity-10 p-4 rounded-lg">
                  <AlertCircle size={32} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary text-opacity-60 text-sm font-semibold">ACTIVE ALERTS</p>
                  <p className="text-4xl font-bold text-primary mt-2">{activeAlerts}</p>
                </div>
                <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
                  <Bell size={32} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Add Product Form */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Add a New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-primary mb-2">Product URL</label>
                  <input
                    type="text"
                    placeholder="https://amazon.com/product/..."
                    value={productURL}
                    onChange={(e) => {
                      setProductURL(e.target.value);
                      if (errors.url) setErrors(prev => ({ ...prev, url: '' }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 font-medium text-primary placeholder-primary placeholder-opacity-40 transition-all duration-300 focus:outline-none ${
                      errors.url
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-light hover:border-accent focus:border-primary'
                    }`}
                  />
                  {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Target Price ($)</label>
                  <input
                    type="number"
                    placeholder="99.99"
                    step="0.01"
                    value={targetPrice}
                    onChange={(e) => {
                      setTargetPrice(e.target.value);
                      if (errors.price) setErrors(prev => ({ ...prev, price: '' }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 font-medium text-primary placeholder-primary placeholder-opacity-40 transition-all duration-300 focus:outline-none ${
                      errors.price
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-light hover:border-accent focus:border-primary'
                    }`}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
              </div>
              <button type="submit" className="btn-primary w-full md:w-auto flex items-center justify-center space-x-2">
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Your Tracked Products</h2>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-primary text-opacity-60">No products tracked yet. Add one to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map(product => (
                  <div key={product.id} className="border-2 border-light rounded-lg p-4 hover:border-accent transition-all duration-300">
                    {editingId === product.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-primary mb-2">Product URL</label>
                            <input
                              type="text"
                              value={editURL}
                              onChange={(e) => {
                                setEditURL(e.target.value);
                                if (errors.url) setErrors(prev => ({ ...prev, url: '' }));
                              }}
                              className="w-full px-4 py-2 rounded-lg border-2 border-light focus:border-primary text-primary"
                            />
                            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-primary mb-2">Target Price ($)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={editTargetPrice}
                              onChange={(e) => {
                                setEditTargetPrice(e.target.value);
                                if (errors.price) setErrors(prev => ({ ...prev, price: '' }));
                              }}
                              className="w-full px-4 py-2 rounded-lg border-2 border-light focus:border-primary text-primary"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveEdit(product.id)}
                            className="btn-primary px-4 py-2 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="btn-secondary px-4 py-2 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display Mode
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 mb-4 md:mb-0">
                          <div className="flex items-start space-x-4">
                            <div className="text-4xl">{product.image}</div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-primary">{product.name}</h3>
                              <p className="text-sm text-primary text-opacity-60 break-all">{product.url}</p>
                              <div className="mt-2 flex items-center space-x-4">
                                <div>
                                  <span className="text-xs text-primary text-opacity-60">Current Price:</span>
                                  <p className="text-lg font-bold text-primary">${product.currentPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                  <span className="text-xs text-primary text-opacity-60">Target Price:</span>
                                  <p className="text-lg font-bold text-accent">${product.targetPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                  <span className="text-xs text-primary text-opacity-60">Status:</span>
                                  <p className={`text-sm font-semibold mt-1 px-3 py-1 rounded-full ${
                                    product.status === 'price-drop'
                                      ? 'bg-accent bg-opacity-20 text-accent'
                                      : 'bg-primary bg-opacity-10 text-primary'
                                  }`}>
                                    {product.status === 'price-drop' ? '🎉 Price Drop!' : '👁️ Watching'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary bg-opacity-10 text-primary hover:bg-opacity-20 transition-all duration-300"
                          >
                            <Edit2 size={18} />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
                          >
                            <Trash2 size={18} />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
