import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit2, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";

export default function ManageProduct() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("male");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Convert category_id into gender
  const getGenderFromCategory = (catId) => {
    return catId === "1" ? "male" : "female";
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [activeTab]);

  const loadProducts = () => {
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");

    const fixedProducts = allProducts.map((prod) => ({
      ...prod,
      gender: getGenderFromCategory(prod.categories_id), // Auto gender
    }));

    const filtered = fixedProducts.filter(
      (prod) => prod.gender === activeTab
    );

    setProducts(filtered);
    console.log("Products:", filtered);
  };

  const loadCategories = () => {
    const allCategories = JSON.parse(
      localStorage.getItem("categories") || "[]"
    );

    const fixedCategories = allCategories.map((cat) => ({
      ...cat,
      gender: getGenderFromCategory(cat.categories_id),
      status: "active", 
    }));

    const filtered = fixedCategories.filter(
      (cat) => cat.gender === activeTab
    );

    setCategories(filtered);
    console.log("Subcategories:", filtered);
  };

  const handleView = (product) => {
    navigate(`/products/view/${product.id}`);
  };

  const handleEdit = (product) => {
    navigate(`/products/edit/${product.id}`);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const filtered = allProducts.filter(
      (p) => p.id !== selectedProduct.id
    );

    localStorage.setItem("products", JSON.stringify(filtered));
    setShowDeleteModal(false);
    loadProducts();
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        <p className="text-gray-600 mt-2">
          View, edit, and delete existing products
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("male")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "male"
                ? "border-gold-500 text-gold-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Male Products
          </button>

          <button
            onClick={() => setActiveTab("female")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "female"
                ? "border-gold-500 text-gold-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Female Products
          </button>
        </nav>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm">{product.categories_id}</td>

                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleEdit(product)}
                          className="text-gold-600 hover:text-gold-900"
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(product)}
                          className="text-red-600 hover:text-red-900"
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
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-bold">Delete Product</h3>
            <p className="text-gray-600">
              Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                Delete
              </button>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
