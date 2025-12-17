import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import axios from "axios";
import { useRef } from "react";

const AddMensProduct = () => {
  const productNameRef = useRef();
  const priceRef = useRef(null);
  const purityRef = useRef(null);
  const descRef = useRef(null);
  const subCatRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addMensProduct = () => {
    const ProductName = productNameRef.current.value;
    const Price = priceRef.current.value;
    const Purity = purityRef.current.value;
    const Description = descRef.current.value;
    const SubCatId = subCatRef.current.value;

    const formdata = new FormData();
    formdata.append("ProductName", ProductName);
    formdata.append("Price", Price);
    formdata.append("Purity", Purity);
    formdata.append("Description", Description);
    formdata.append("SubCatId", SubCatId);

    console.log(formdata);

    axios
      .post("http://localhost/Jewellerydb/addMenProducts.php", formdata)
      .then((Response) => {
        alert("Men Product Added Successfully");
      });
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    purity: "",
    description: "",
    subcat_id: "",
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
          <h1 className="text-3xl font-bold text-gray-900">
            Add Men's Product
          </h1>
          <p className="text-gray-600 mt-1">
            Create a new product for men's jewellery
          </p>
        </div>
      </div>

      {/* Form Card */}
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
              required
              ref={productNameRef}
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
              required
              ref={priceRef}
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
              required
              ref={purityRef}
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
  required
  ref={subCatRef}
>
  <option value="" disabled className="text-gray-400">
    Select Sub Category
  </option>

  <option value="1" className="text-gray-700">Rings</option>
  <option value="2" className="text-gray-700">Bracelets</option>
  <option value="3" className="text-gray-700">Chains</option>
  <option value="7" className="text-gray-700">Pendants</option>
  <option value="9" className="text-gray-700">Kadas</option>
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
            type="submit"
            className="btn-primary px-6 py-2"
            onClick={addMensProduct}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({
                name: "",
                price: "",
                purity: "",
                description: "",
                subcat_id: "",
              })
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

export default AddMensProduct;
