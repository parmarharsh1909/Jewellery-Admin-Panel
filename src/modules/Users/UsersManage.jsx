import { useState } from "react";
import { Search, Filter, Eye, Users as UsersIcon } from "lucide-react";
import Modal from "../../components/Modal";
import axios from "axios";
import { useEffect } from "react";

export default function users() {
  const [users, setusers] = useState(initialusers);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewinguser, setViewinguser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const viewuser = (user) => {
    setViewinguser(user);
    setIsViewModalOpen(true);
  };

  const filteredusers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Fetch Users from API
  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/users.php")
      .then((response) => {
        if (response.status === 200) {
          const apiData = response.data.data || [];
          setusers(apiData);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">users</h1>
        <p className="text-gray-600 mt-1">
          Manage user accounts and information
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total users</p>
          <h3 className="text-2xl font-bold text-gray-900">{users.length}</h3>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Active users</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {users.filter((c) => c.status === "active").length}
          </h3>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <h3 className="text-2xl font-bold text-gray-900">
            ₹{users.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
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

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Password
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredusers.map((customer) => (
                <tr key={users.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold">
                        {users.name.charAt(0)}
                      </div> */}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {users.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {users.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {users.Password}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{users.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{customer.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {customer.address}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewuser(users)}
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

        {filteredusers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* View Users Modal */}
      {isViewModalOpen && (
        <Modal
          onClose={() => setIsViewModalOpen(false)}
          title="User Details"
          size="lg"
        >
          {viewingCustomer && (
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {viewinguser.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {viewingCustomer.name}
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      viewingCustomer.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {viewingCustomer.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-900">{viewingCustomer.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-900">{viewingCustomer.phone}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Address
                  </h3>
                  <p className="text-gray-900">{viewingCustomer.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Total Orders
                  </h3>
                  <p className="text-gray-900">{viewingCustomer.totalOrders}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Total Spent
                  </h3>
                  <p className="text-gray-900">
                    ₹{viewingCustomer.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Wishlist Items
                  </h3>
                  <p className="text-gray-900">{viewingCustomer.wishlist}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Member Since
                  </h3>
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
