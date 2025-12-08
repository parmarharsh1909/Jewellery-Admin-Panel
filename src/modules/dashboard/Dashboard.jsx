import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign,
  Gem,
  Award,
  Eye
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const statsData = [
  { 
    title: 'Total Revenue', 
    value: '₹12,45,890', 
    change: '+12.5%', 
    icon: DollarSign, 
    color: 'gold',
    trend: 'up' 
  },
  { 
    title: 'Total Orders', 
    value: '1,234', 
    change: '+8.2%', 
    icon: ShoppingBag, 
    color: 'blue',
    trend: 'up' 
  },
  { 
    title: 'Products', 
    value: '456', 
    change: '+15', 
    icon: Package, 
    color: 'purple',
    trend: 'up' 
  },
  { 
    title: 'Customers', 
    value: '892', 
    change: '+23', 
    icon: Users, 
    color: 'green',
    trend: 'up' 
  },
];

const salesData = [
  { month: 'Jan', sales: 45000, orders: 120 },
  { month: 'Feb', sales: 52000, orders: 145 },
  { month: 'Mar', sales: 48000, orders: 132 },
  { month: 'Apr', sales: 61000, orders: 168 },
  { month: 'May', sales: 55000, orders: 150 },
  { month: 'Jun', sales: 67000, orders: 185 },
];

const categoryData = [
  { name: 'Rings', value: 35, sales: 425000 },
  { name: 'Necklaces', value: 25, sales: 312000 },
  { name: 'Bracelets', value: 15, sales: 198000 },
  { name: 'Earrings', value: 12, sales: 156000 },
  { name: 'Others', value: 13, sales: 154000 },
];

const topProducts = [
  { id: 1, name: 'Diamond Solitaire Ring', category: 'Ring', sales: 45, revenue: '₹4,56,000', image: '💍' },
  { id: 2, name: 'Gold Chain Necklace', category: 'Necklace', sales: 38, revenue: '₹3,42,000', image: '📿' },
  { id: 3, name: 'Pearl Bracelet', category: 'Bracelet', sales: 32, revenue: '₹2,89,000', image: '📿' },
  { id: 4, name: 'Emerald Earrings', category: 'Earrings', sales: 28, revenue: '₹2,54,000', image: '💎' },
  { id: 5, name: 'Platinum Band', category: 'Ring', sales: 25, revenue: '₹2,35,000', image: '💍' },
];

const recentOrders = [
  { id: '#ORD-1234', customer: 'Priya Sharma', product: 'Diamond Ring', amount: '₹45,000', status: 'Completed', date: '2024-12-02' },
  { id: '#ORD-1235', customer: 'Rahul Kumar', product: 'Gold Necklace', amount: '₹32,000', status: 'Processing', date: '2024-12-02' },
  { id: '#ORD-1236', customer: 'Anita Desai', product: 'Pearl Earrings', amount: '₹18,500', status: 'Pending', date: '2024-12-01' },
  { id: '#ORD-1237', customer: 'Vikram Singh', product: 'Silver Bracelet', amount: '₹12,000', status: 'Completed', date: '2024-12-01' },
];

const COLORS = ['#d4af37', '#bf9d32', '#9f832a', '#806922', '#69571c'];

export default function Dashboard() {
  const [period, setPeriod] = useState('month');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input-field"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last period
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#d4af37" strokeWidth={2} name="Sales (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
            <Award className="w-5 h-5 text-gold-500" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center text-2xl">
                    {product.image}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Eye className="w-5 h-5 text-gold-500" />
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gold-300 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.product}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
