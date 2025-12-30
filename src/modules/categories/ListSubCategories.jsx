import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [dataCat, setDataCat] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/subcategory.php")
      .then((response) => {
        if (response.status === 200) {
          const apiOutput = response.data;
          setDataCat(apiOutput.data || []);
        }
      });
  }, []);

  // const handleView = (id) => console.log("View:", id);
  // const handleEdit = (id) => console.log("Edit:", id);
  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this?")) {
  //     console.log("Delete:", id);
  //   }
  // };

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this sub category?")) {
      return;
    }

    const formData = new FormData();
    formData.append("id", id);

    axios
      .post("http://localhost/Jewellerydb/deleteSubCategory.php", formData)
      .then((response) => {
        const json = response.data;

        if (json.status === true || json.status === "true") {
          alert(json.message);

          setDataCat((prev) => prev.filter((item) => item.id !== id));
        } else {
          alert(json.message || "Delete failed");
        }
      })
      .catch(() => alert("Error deleting category"));
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sub category</h1>
          <p className="text-gray-600 mt-1">Manage your sub category here</p>
        </div>
        <button
          onClick={() => navigate("/categories/sub/add")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Sub category
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Category ID
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {dataCat.length > 0 ? (
                dataCat.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {item.name}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-gray-700">
                      {item.description}
                    </td>

                    <td className="py-4 px-4 text-gray-700">
                      {item.categories_id}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          // onClick={() => handleView(item.id)}
                          className="p-2 text-gold-600 hover:bg-gold-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          // onClick={() => handleEdit(item.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 font-medium"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
