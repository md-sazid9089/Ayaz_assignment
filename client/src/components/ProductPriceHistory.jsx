import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingDown, Calendar } from 'lucide-react';

/**
 * ProductPriceHistory Component
 * Displays a product's price history over time with an interactive line chart
 * 
 * Props:
 * - productName: string (name of the product)
 * - currentPrice: number (current price of the product)
 * - targetPrice: number (target price user wants to reach)
 * - lastUpdateDate: string (date of last price update)
 * - priceHistory: array of objects with { date, price } structure
 * - priceChangePercent: number (percentage change from previous week)
 */
const ProductPriceHistory = ({
  productName = 'Wireless Headphones',
  currentPrice = 89.99,
  targetPrice = 79.99,
  lastUpdateDate = 'Today at 2:30 PM',
  priceHistory = [
    { date: 'Apr 10', price: 99.99 },
    { date: 'Apr 12', price: 97.50 },
    { date: 'Apr 14', price: 95.25 },
    { date: 'Apr 16', price: 92.75 },
    { date: 'Apr 18', price: 94.00 },
    { date: 'Apr 20', price: 90.50 },
    { date: 'Apr 22', price: 89.99 },
  ],
  priceChangePercent = 15,
}) => {
  // Calculate the savings amount
  const savings = currentPrice < targetPrice ? 0 : (currentPrice - targetPrice).toFixed(2);
  const percentToTarget = ((currentPrice - targetPrice) / currentPrice * 100).toFixed(1);

  // Determine if price dropped (for styling)
  const priceDropped = priceChangePercent > 0;

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.date}
          </p>
          <p className="text-sm font-bold text-[#533638]">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      {/* Product Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{productName}</h2>
        
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Current Price */}
          <div className="bg-gradient-to-br from-[#F5EDEC] to-[#F7B9C4] rounded-lg p-4 border border-[#F7B9C4]">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Current Price
            </p>
            <p className="text-2xl font-bold text-[#533638]">
              ${currentPrice.toFixed(2)}
            </p>
          </div>

          {/* Target Price & Savings */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Target Price
            </p>
            <p className="text-2xl font-bold text-blue-700">
              ${targetPrice.toFixed(2)}
            </p>
            {savings > 0 && (
              <p className="text-xs text-blue-600 mt-1">
                Save ${savings} more
              </p>
            )}
          </div>

          {/* Last Update */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Last Update
            </p>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-600" />
              <p className="text-sm font-medium text-gray-700">
                {lastUpdateDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Price Trend (Last 12 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#6B7280' }}
              domain={['dataMin - 5', 'dataMax + 5']}
              label={{
                value: 'Price ($)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#6B7280' },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#533638"
              strokeWidth={3}
              dot={{ fill: '#F7B9C4', r: 6 }}
              activeDot={{ r: 8, fill: '#533638' }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {priceDropped ? (
            <TrendingDown size={20} className="text-blue-600" />
          ) : (
            <TrendingDown size={20} className="text-orange-600" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">
            Price Movement
          </p>
          {priceDropped ? (
            <p className="text-sm text-gray-700">
              The product price has <span className="font-bold text-green-600">dropped by {priceChangePercent}%</span> compared 
              to last week. You're <span className="font-bold">{percentToTarget}%</span> away from your target price.
            </p>
          ) : (
            <p className="text-sm text-gray-700">
              The product price has <span className="font-bold text-orange-600">increased by {Math.abs(priceChangePercent)}%</span> compared 
              to last week. You're <span className="font-bold">{percentToTarget}%</span> away from your target price.
            </p>
          )}
        </div>
      </div>

      {/* Action Hint */}
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-xs text-gray-600">
          💡 <span className="font-medium">Tip:</span> Set a price alert to get notified when the price reaches your target.
        </p>
      </div>
    </div>
  );
};

export default ProductPriceHistory;
