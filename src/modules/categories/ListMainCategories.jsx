import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Edit, Trash2, Eye, Plus } from "lucide-react";
import axios from "axios";

export default function ManageMainCategory() {
  const navigate = useNavigate();

  const [dataCat, setDataCat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch Categories from API
  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/maincategory.php")
      .then((response) => {
        if (response.status === 200) {
          var apiOutput = response.data;
          setDataCat(apiOutput.data || []);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Search Function
  const filteredCategories = dataCat.filter((category) =>
    category.maincatname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Button Functions
  const handleView = (id) => navigate(`/categories/main/view/${id}`);
  const handleEdit = (id) => navigate(`/categories/main/edit/${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      console.log("Delete ID:", id);
      // DELETE API will go here
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Main Categories
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your main product categories
          </p>
        </div>

        <button
          // onClick={() => navigate("/categories/main/add")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Main Category
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search main categories..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Category Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Description
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {/* ID */}
                  <td className="py-4 px-4 text-gray-900 font-medium">
                    {category.id}
                  </td>

                  {/* Category Name */}
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {category.maincatname}
                  </td>

                  {/* Description */}
                  <td className="py-4 px-4 text-gray-700">
                    {category.maincatdesc}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-2">
                      {/* View */}
                      <button
                        // onClick={() => handleView(category.id)}
                        className="p-2 text-gold-600 hover:bg-gold-50 rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        // onClick={() => handleEdit(category.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        // onClick={() => handleDelete(category.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
