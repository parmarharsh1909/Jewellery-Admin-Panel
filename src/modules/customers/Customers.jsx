import { useState } from 'react';
import { Search, Filter, Eye, Users as UsersIcon } from 'lucide-react';
import Modal from '../../components/Modal';

const initialCustomers = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    totalOrders: 12,
    totalSpent: 456000,
    status: 'active',
    joinDate: '2024-01-15',
    wishlist: 5
  },
  {
    id: 2,
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 98765 43211',
    address: '456 Park Street, Kolkata, West Bengal 700016',
    totalOrders: 8,
    totalSpent: 285000,
    status: 'active',
    joinDate: '2024-03-20',
    wishlist: 3
  },
  {
    id: 3,
    name: 'Anita Desai',
    email: 'anita@example.com',
    phone: '+91 98765 43212',
    address: '789 Marine Drive, Mumbai, Maharashtra 400002',
    totalOrders: 15,
    totalSpent: 678000,
    status: 'active',
    joinDate: '2023-11-10',
    wishlist: 8
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const viewCustomer = (customer) => {
    setViewingCustomer(customer);
    setIsViewModalOpen(true);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage customer accounts and information</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Customers</p>
          <h3 className="text-2xl font-bold text-gray-900">{customers.length}</h3>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Active Customers</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {customers.filter(c => c.status === 'active').length}
          </h3>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <h3 className="text-2xl font-bold text-gray-900">
            ₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search customers..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{customer.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{customer.totalOrders}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">₹{customer.totalSpent.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{customer.joinDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewCustomer(customer)}
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

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* View Customer Modal */}
      {isViewModalOpen && (
        <Modal
          onClose={() => setIsViewModalOpen(false)}
          title="Customer Details"
          size="lg"
        >
          {viewingCustomer && (
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {viewingCustomer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{viewingCustomer.name}</h2>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  viewingCustomer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {viewingCustomer.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-gray-900">{viewingCustomer.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                <p className="text-gray-900">{viewingCustomer.phone}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                <p className="text-gray-900">{viewingCustomer.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Orders</h3>
                <p className="text-gray-900">{viewingCustomer.totalOrders}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Spent</h3>
                <p className="text-gray-900">₹{viewingCustomer.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Wishlist Items</h3>
                <p className="text-gray-900">{viewingCustomer.wishlist}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Member Since</h3>
                <p className="text-gray-900">{viewingCustomer.joinDate}</p>
              </div>
            </div>
          </div>
        )}
        </Modal>
      )}
    </div>
  );
}
