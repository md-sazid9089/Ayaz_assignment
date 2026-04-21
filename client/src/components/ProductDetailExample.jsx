import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProductPriceHistory from './ProductPriceHistory';

/**
 * ProductDetailPage - Example component showing ProductPriceHistory integration
 * This demonstrates how to use the ProductPriceHistory component with real data
 * 
 * This is a sample component for reference. You can integrate ProductPriceHistory
 * into your Dashboard or any other component following this pattern.
 */
const ProductDetailExample = ({ onBack = () => {} }) => {
  // Sample product data - in a real app, this would come from your API
  const productData = {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-cancelling headphones with 30-hour battery',
    currentPrice: 89.99,
    targetPrice: 79.99,
    imageUrl: '🎧',
    lastUpdateDate: 'Today at 2:30 PM',
    status: 'Price Drop Alert',
    priceChangePercent: 15,
  };

  // Sample price history data
  const priceHistoryData = [
    { date: 'Apr 10', price: 99.99 },
    { date: 'Apr 12', price: 97.50 },
    { date: 'Apr 14', price: 95.25 },
    { date: 'Apr 16', price: 92.75 },
    { date: 'Apr 18', price: 94.00 },
    { date: 'Apr 20', price: 90.50 },
    { date: 'Apr 22', price: 89.99 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#533638] hover:text-[#6b4b4d] font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{productData.imageUrl}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
              <p className="text-gray-600 mt-1">{productData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Current Price */}
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-600 text-sm font-medium mb-2">Current Price</p>
            <p className="text-3xl font-bold text-[#533638]">
              ${productData.currentPrice.toFixed(2)}
            </p>
          </div>

          {/* Target Price */}
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-600 text-sm font-medium mb-2">Target Price</p>
            <p className="text-3xl font-bold text-blue-600">
              ${productData.targetPrice.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Save ${(productData.currentPrice - productData.targetPrice).toFixed(2)}
            </p>
          </div>

          {/* Price Change */}
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-600 text-sm font-medium mb-2">Price Change</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-green-600">
                -{productData.priceChangePercent}%
              </p>
            </div>
            <p className="text-xs text-green-600 mt-2">from last week</p>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-600 text-sm font-medium mb-2">Status</p>
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
              {productData.status}
            </span>
          </div>
        </div>

        {/* Price History Chart - Main Component */}
        <div className="mb-8">
          <ProductPriceHistory
            productName={productData.name}
            currentPrice={productData.currentPrice}
            targetPrice={productData.targetPrice}
            lastUpdateDate={productData.lastUpdateDate}
            priceHistory={priceHistoryData}
            priceChangePercent={productData.priceChangePercent}
          />
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price Alert Settings */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Price Alert Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notify when price drops to:</span>
                <span className="font-semibold text-[#533638]">$79.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notify when price reaches:</span>
                <span className="font-semibold text-[#533638]">Max alert</span>
              </div>
              <button className="w-full mt-4 bg-[#533638] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#6b4b4d] transition-colors">
                Edit Alert Settings
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Details</h3>
            <div className="space-y-3">
              <div className="border-b pb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Category</p>
                <p className="text-gray-800">Electronics › Headphones</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Last Checked</p>
                <p className="text-gray-800">Today at 2:30 PM</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Tracking Since</p>
                <p className="text-gray-800">April 10, 2024</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Source</p>
                <p className="text-gray-800">Amazon.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailExample;
