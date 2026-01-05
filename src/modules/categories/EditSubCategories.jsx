import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const EditSubCategories = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    maincat_id: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch sub-category data
  useEffect(() => {
    var formData = new FormData();
    formData.append("id", id);

    axios
      .post("http://localhost/Jewellerydb/getSubCategory.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setFormData({
            name: res.data.data.name,
            maincat_id: res.data.data.maincat_id,
            description: res.data.data.description,
          });
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Update sub-category
  const updateSubCategory = () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", formData.name);
    formData.append("maincat_id", formData.maincat_id);
    formData.append("description", formData.description);
    axios
      .post("http://localhost/Jewellerydb/updateSubCategory.php", fd)
      .then((res) => {
        if (res.data.status === "true") {
          alert("Sub Category Updated Successfully");
          navigate("/categories/sub/list");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Edit Sub Category</h1>
          <p className="text-gray-600">Update sub category details</p>
        </div>
      </div>

      {/* Form */}
      <div className="card max-w-3xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sub Category Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter sub category name"
            />
          </div>

          {/* Main Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Main Category *
            </label>
            <select
              name="maincat_id"
              value={formData.maincat_id}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Main Category</option>
              <option value="1">Men Jewellery</option>
              <option value="2">Women Jewellery</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter description"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button onClick={updateSubCategory} className="btn-primary px-6 py-2">
            Update
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary px-6 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategories;
