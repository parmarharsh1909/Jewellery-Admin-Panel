import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Upload, X } from "lucide-react";

const AddMensProduct = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const productNameRef = useRef();
  const priceRef = useRef();
  const purityRef = useRef();
  const descRef = useRef();
  const subCatRef = useRef();
  const imgRef = useRef();

  const handleImageChange = () => {
    const file = imgRef.current.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addMensProduct = () => {
    const ProductName = productNameRef.current.value.trim();
    const Price = priceRef.current.value;
    const Purity = purityRef.current.value.trim();
    const Description = descRef.current.value.trim();
    const SubCatId = subCatRef.current.value;

    if (!ProductName || !Price || !Purity || !SubCatId) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formdata = new FormData();
    formdata.append("ProductName", ProductName);
    formdata.append("Price", Price);
    formdata.append("Purity", Purity);
    formdata.append("Description", Description);
    formdata.append("SubCatId", SubCatId);
    formdata.append("ProductImg", imageFile);

    axios
      .post("http://localhost/Jewellerydb/addMenProducts.php", formdata)
      .then(() => {
        alert("Men Product Added Successfully");
        // navigate(-1);
        setTimeout(() => navigate("/products/mens/manage"), 1500);
      })
      .catch(() => alert("Error adding product"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold">Add Men's Product</h1>
      </div>

      {/* SINGLE CARD */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT FORM */}
          <div className="md:col-span-2 space-y-4">
            <input
              ref={productNameRef}
              className="input-field"
              placeholder="Product Name *"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                ref={priceRef}
                type="number"
                className="input-field"
                placeholder="Price (₹) *"
              />

              <input
                ref={purityRef}
                className="input-field"
                placeholder="Purity *"
              />
            </div>

            <select ref={subCatRef} className="input-field">
              <option value="">Select Sub Category *</option>
              <option value="1">Rings</option>
              <option value="2">Bracelets</option>
              <option value="3">Chains</option>
            </select>

            <textarea
              ref={descRef}
              rows="4"
              className="input-field"
              placeholder="Description"
            />
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <h3 className="font-semibold mb-2">Product Image</h3>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  className="w-full h-56 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                    imgRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed rounded-lg cursor-pointer hover:border-yellow-500">
                <Upload className="mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Upload Product Image</p>
                <input
                  ref={imgRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={addMensProduct}
            disabled={loading}
            className="btn-primary px-6 py-2"
          >
            {loading ? "Saving..." : "Submit"}
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

export default AddMensProduct;
