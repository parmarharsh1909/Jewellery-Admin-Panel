import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const AddWomensProduct = () => {
  const productNameRef = useRef();
  const priceRef = useRef(null);
  const purityRef = useRef(null);
  const descRef = useRef(null);
  const subCatRef = useRef(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    purity: "",
    description: "",
    subcat_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addWomensProduct = () => {
    const formdata = new FormData();
    formdata.append("ProductName", productNameRef.current.value);
    formdata.append("Price", priceRef.current.value);
    formdata.append("Purity", purityRef.current.value);
    formdata.append("Description", descRef.current.value);
    formdata.append("SubCatId", subCatRef.current.value);

    axios
      .post("http://localhost/Jewellerydb/addWomenProducts.php", formdata)
      .then(() => {
        alert("Women Product Added Successfully");
        navigate(-1);
      })
      .catch((err) => console.log("API ERROR:", err));
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
          <h1 className="text-3xl font-bold text-gray-900">
            Add Women's Product
          </h1>
          <p className="text-gray-600 mt-1">
            Create a new product for women's jewellery
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="card max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter product name"
              ref={productNameRef}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter price"
              ref={priceRef}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purity *
            </label>
            <input
              type="text"
              name="purity"
              value={formData.purity}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter purity"
              ref={purityRef}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Sub Category *
            </label>
            <select
              name="subcat_id"
              value={formData.subcat_id}
              onChange={handleChange}
              className={`input-field ${
                formData.subcat_id === "" ? "text-gray-400" : "text-gray-800"
              }`}
              ref={subCatRef}
              required
            >
              <option value="" disabled>
                Select Sub Category
              </option>
              <option value="4">Necklaces</option>
              <option value="5">Earrings</option>
              <option value="6">Bangles</option>
              <option value="8">Nose Pins</option>
              <option value="10">Anklets</option>
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
            placeholder="Enter product description"
            ref={descRef}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            className="btn-primary px-6 py-2"
            onClick={addWomensProduct}
          >
            Submit
          </button>

          <button
            className="btn-secondary px-6 py-2"
            onClick={() =>
              setFormData({
                name: "",
                price: "",
                purity: "",
                description: "",
                subcat_id: "",
              })
            }
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWomensProduct;
