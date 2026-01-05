import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Save, Upload } from "lucide-react";

export default function EditWomensProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    product_name: "",
    description: "",
    subcategory_name: "",
    price: "",
    purity: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  /* ================= FETCH SINGLE PRODUCT ================= */
  useEffect(() => {
    axios
      .get(`http://localhost/Jewellerydb/getWomensProductById.php?id=${id}`)
      .then((res) => {
        const data = res.data.data;
        if (data) {
          setForm({
            product_name: data.product_name,
            description: data.description,
            subcategory_name: data.subcategory_name,
            price: data.price,
            purity: data.purity,
          });

          setImagePreview(
            `http://localhost/Jewellerydb/Uploads/Womens/${data.image}`
          );
        }
      })
      .catch(() => alert("Failed to fetch product"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* ================= UPDATE ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("product_name", form.product_name);
    formData.append("description", form.description);
    formData.append("subcategory_name", form.subcategory_name);
    formData.append("price", form.price);
    formData.append("purity", form.purity);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    axios
      .post(
        "http://localhost/Jewellerydb/updateWomensProduct.php",
        formData
      )
      .then((res) => {
        if (res.data.status === true || res.data.status === "true") {
          alert("Product updated successfully");
          navigate(-1);
        } else {
          alert(res.data.message || "Update failed");
        }
      })
      .catch(() => alert("Error updating product"));
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading product...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg border hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Women's Product
          </h1>
          <p className="text-gray-600 text-sm">
            Update product details
          </p>
        </div>
      </div>

      {/* ================= FORM CARD ================= */}
      <form
        onSubmit={handleSubmit}
        className="card space-y-5"
      >
        {/* Image */}
        <div>
          <label className="font-medium text-gray-700">Product Image</label>
          <div className="mt-2 flex items-center gap-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-20 w-20 rounded object-cover border"
              />
            )}

            <label className="flex items-center gap-2 cursor-pointer text-blue-600">
              <Upload size={18} />
              Change Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="product_name"
            value={form.product_name}
            onChange={handleChange}
            className="input mt-1"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="input mt-1"
            required
          />
        </div>

        {/* Sub Category */}
        <div>
          <label className="font-medium text-gray-700">
            Sub Category
          </label>
          <input
            type="text"
            name="subcategory_name"
            value={form.subcategory_name}
            onChange={handleChange}
            className="input mt-1"
            required
          />
        </div>

        {/* Price & Purity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input mt-1"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Purity
            </label>
            <input
              type="text"
              name="purity"
              value={form.purity}
              onChange={handleChange}
              className="input mt-1"
              required
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-primary flex items-center gap-2"
          >
            <Save size={18} />
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}