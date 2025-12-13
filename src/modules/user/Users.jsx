import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit, Trash2, Eye, Plus } from "lucide-react";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // API data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Fetch users from API
  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/Users.php")
      .then((response) => {
        if (response.status === 200) {
          const apiData = response.data.data || [];
          setUsers(apiData);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  // Pagination calculation
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentusers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Actions
  const handleView = (id) => console.log("View:", id);
  const handleEdit = (id) => console.log("Edit:", id);
  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      console.log("Delete:", id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage users</h1>
          <p className="text-gray-600 mt-1">View and manage users</p>
        </div>

        {/* <button
          onClick={() => navigate("/products/mens/add")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Product
        </button> */}
      </div>

      {/* users Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Password
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Phone
                </th>

                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  address
                </th>

                <th className="py-3 px-4 text-right font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentusers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No user found
                  </td>
                </tr>
              ) : (
                currentusers.map((users) => (
                  <tr
                    key={users.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    {/* users + Image */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-gray-900">
                            {users.name}
                          </div>
                        </div>
                        
                      </div>
                    </td>
                    <td><div className="text-sm text-gray-600">
                          {users.email}
                        </div></td>
                    <td className="py-4 px-4 text-gray-700">
                      {users.password}
                    </td>
                    {/* Category */}
                    <td className="py-4 px-4 text-gray-700">{users.phone}</td>

                    {/* Price */}
                    <td className="py-4 px-4 text-gray-700">{users.address}</td>

                    {/* Stock */}
                    {/* <td className="py-4 px-4 text-gray-700">
                      {product.purity}
                    </td> */}

                    {/* Status */}
                    {/* <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>
                    </td> */}

                    {/* Created At */}
                    {/* <td className="py-4 px-4 text-gray-600">
                      {product.maincategory_name}
                    </td> */}

                    {/* Actions */}
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleView(product.id)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleEdit(product.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, users.length)} of {users.length} Users
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === i + 1
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "border-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
