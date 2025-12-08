import { useState } from 'react';
import { Search, Filter, Eye, Package } from 'lucide-react';
import Modal from '../../components/Modal';

const initialOrders = [
  {
    id: '#MEN-1234',
    customer: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 98765 43211',
    products: [
      { name: 'Gold Necklace', quantity: 1, price: 32000 }
    ],
    total: 32000,
    status: 'Processing',
    paymentStatus: 'Paid',
    date: '2024-12-02',
    shippingAddress: '456 Park Street, Kolkata, West Bengal 700016'
  },
  {
    id: '#MEN-1235',
    customer: 'Vikram Singh',
    email: 'vikram@example.com',
    phone: '+91 98765 43213',
    products: [
      { name: 'Platinum Ring', quantity: 1, price: 28500 }
    ],
    total: 28500,
    status: 'Completed',
    paymentStatus: 'Paid',
    date: '2024-12-01',
    shippingAddress: '101 Connaught Place, New Delhi 110001'
  },
  {
    id: '#MEN-1236',
    customer: 'Arjun Patel',
    email: 'arjun@example.com',
    phone: '+91 98765 43214',
    products: [
      { name: 'Silver Cufflinks', quantity: 1, price: 4500 }
    ],
    total: 4500,
    status: 'Pending',
    paymentStatus: 'Pending',
    date: '2024-12-01',
    shippingAddress: '202 SG Highway, Ahmedabad, Gujarat 380001'
  },
];

export default function MensOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const viewOrder = (order) => {
    setViewingOrder(order);
    setIsViewModalOpen(true);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Men's Orders</h1>
        <p className="text-gray-600 mt-1">Manage men's product orders</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field pl-10"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{order.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">₹{order.total.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewOrder(order)}
                      className="text-gold-600 hover:text-gold-900"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No men's orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* View Order Modal */}
      {isViewModalOpen && (
        <Modal
          onClose={() => setIsViewModalOpen(false)}
          title="Order Details"
          size="lg"
        >
          {viewingOrder && (
            <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{viewingOrder.id}</h2>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(viewingOrder.status)}`}>
                  {viewingOrder.status}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  viewingOrder.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {viewingOrder.paymentStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Customer Name</h3>
                <p className="text-gray-900">{viewingOrder.customer}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Order Date</h3>
                <p className="text-gray-900">{viewingOrder.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-gray-900">{viewingOrder.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                <p className="text-gray-900">{viewingOrder.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
              <p className="text-gray-900">{viewingOrder.shippingAddress}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Products</h3>
              <div className="space-y-2">
                {viewingOrder.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-lg font-bold text-gray-900">Total Amount</p>
              <p className="text-2xl font-bold text-gold-600">₹{viewingOrder.total.toLocaleString()}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Order Status
              </label>
              <select
                value={viewingOrder.status}
                onChange={(e) => {
                  updateOrderStatus(viewingOrder.id, e.target.value);
                  setViewingOrder({ ...viewingOrder, status: e.target.value });
                }}
                className="input-field"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}
        </Modal>
      )}
    </div>
  );
}