import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit, Trash2, Eye, Plus } from "lucide-react";

export default function ManageMensProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/mensProduct.php")
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data || []);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  /* ================= ACTIONS ================= */
  const handleView = (id) => console.log("View:", id);
  const handleEdit = (id) => console.log("Edit:", id);
  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      console.log("Delete:", id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Men's Products
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage men's collection products
          </p>
        </div>

        <button
          onClick={() => navigate("/products/mens/add")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Product
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Description
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Sub Category
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Price
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Purity
                </th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                currentProducts.map((product, index) => {
                  /* ✅ SAME SAFE KEY LOGIC */
                  const uniqueKey =
                    product.id ??
                    product.product_id ??
                    `${product.product_name}-${index}`;

                  const productId =
                    product.id ?? product.product_id;

                  return (
                    <tr
                      key={uniqueKey}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      {/* Product Name */}
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {product.product_name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {product.subcategory_name}
                        </div>
                      </td>

                      {/* Description */}
                      <td className="py-4 px-4 text-gray-700">
                        {product.description}
                      </td>

                      {/* Sub Category */}
                      <td className="py-4 px-4 text-gray-700">
                        {product.subcategory_name}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-gray-700">
                        ₹{Number(product.price).toLocaleString()}
                      </td>

                      {/* Purity */}
                      <td className="py-4 px-4 text-gray-700">
                        {product.purity}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleView(productId)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => handleEdit(productId)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(productId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, products.length)} of{" "}
              {products.length} products
            </p>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
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
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
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
