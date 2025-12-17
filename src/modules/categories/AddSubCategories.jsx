import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import axios from "axios";
import { useRef } from "react";

const AddSubCategories = () => {
  const catNameREf = useRef();
  const descREf = useRef(null);
  const mainCatREf = useRef(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addSubCategory = () => {
    const CatName = catNameREf.current.value;
    const CatDescription = descREf.current.value;
    const MainCatId = mainCatREf.current.value;
    // alert(CatName + "" + CatDescription + "" + MainCatId);

    const formdata = new FormData();
    formdata.append("CatName", CatName);
    formdata.append("CatDescription", CatDescription);
    formdata.append("MainCatId", MainCatId);

    console.log(formdata);

    axios
      .post("http://localhost/Jewellerydb/addSubCategory.php", formdata)
      .then((Response) => {
        alert("Sub Category Added Successfully");
      });
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maincat_id: "",
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Sub Category</h1>
          <p className="text-gray-600 mt-1">
            Create a new sub category for your products
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Category Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter sub category name"
              required
              ref={catNameREf}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Main Category *
            </label>

            <select
              name="maincat_id"
              value={formData.maincat_id}
              onChange={handleChange}
              className={`input-field ${
                formData.maincat_id === "" ? "text-gray-400" : "text-gray-800"
              }`}
              required
              ref={mainCatREf}
            >
              <option value="" disabled className="text-gray-400">
                Select Main Category
              </option>

              <option value="1" className="text-gray-700">
                Men Jewellery
              </option>

              <option value="2" className="text-gray-700">
                Women Jewellery
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field"
            placeholder="Enter sub category description"
            ref={descREf}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="btn-primary px-6 py-2"
            onClick={addSubCategory}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({ name: "", description: "", mainCategories: "" })
            }
            className="btn-secondary px-6 py-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddSubCategories;
