import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Eye, Package } from "lucide-react";
import Modal from "../../components/Modal";

export default function MensOrders() {
  const [orders, setOrders] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/getorders.php")
      .then((response) => {
        if (response.status === 200) {
          const apiData = response.data.data || [];
          setOrders(apiData);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  const viewOrder = (order) => {
    setViewingOrder(order);
    setIsViewModalOpen(true);
  };

  const filteredOrders = orders.filter((order) => {
    const orderNumber = order.order_number?.toString().toLowerCase() || "";
    const customerName = order.customer_name?.toLowerCase() || "";
    const status = order.status?.toLowerCase() || "";

    const matchesSearch =
      orderNumber.includes(searchTerm.toLowerCase()) ||
      customerName.includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || status === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });
  const handleStatusChange = (orderId, newStatus) => {
    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("order_status", newStatus);

    axios
      .post("http://localhost/Jewellerydb/updateOrderStatus.php", formData)
      .then((response) => {
        if (response.data.status) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.order_id === orderId
                ? { ...order, order_status: newStatus }
                : order,
            ),
          );
        }
      })
      .catch((err) => console.log("UPDATE ERROR:", err));
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage product orders</p>
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
              placeholder="Search orders..."
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
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order Status
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment Id
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Shipping address
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order date
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th> */}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{order.order_id}</td>
                  <td className="px-6 py-4">{order.user_id}</td>
                  <td className="px-6 py-4">{order.product_id}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">{order.price}</td>
                  <td className="px-6 py-4">{order.total_price}</td>
                  <td>
                    <select
                      name="order_status"
                      id="order_status"
                      value={order.order_status}
                      onChange={(e) =>
                        handleStatusChange(order.order_id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">{order.payment_status}</td>
                  <td className="px-6 py-4">{order.payment_id}</td>
                  {/* <td className="px-6 py-4">{order.shipping_address}</td> */}
                  <td className="px-6 py-4">{order.order_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isViewModalOpen && (
        <Modal
          onClose={() => setIsViewModalOpen(false)}
          title="Order Details"
          size="lg"
        >
          {viewingOrder && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">
                {viewingOrder.order_number}
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <strong>Name:</strong> {viewingOrder.customer}
                </div>
                <div>
                  <strong>Email:</strong> {viewingOrder.email}
                </div>
                <div>
                  <strong>Phone:</strong> {viewingOrder.phone}
                </div>
                <div>
                  <strong>Date:</strong> {viewingOrder.order_date}
                </div>
              </div>

              <div>
                <strong>Product:</strong> {viewingOrder.product_name}
                <br />
                <strong>Subcategory:</strong> {viewingOrder.subcategory_name}
              </div>

              <div>
                <strong>Quantity:</strong> {viewingOrder.quantity}
                <br />
                <strong>Total:</strong> ₹
                {viewingOrder.total_price.toLocaleString()}
              </div>

              <div>
                <strong>Address:</strong>
                <p>{viewingOrder.address}</p>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
