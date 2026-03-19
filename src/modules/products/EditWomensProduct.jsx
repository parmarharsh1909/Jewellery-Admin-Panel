import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const EditWomensProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const nameRef = useRef();
  const priceRef = useRef();
  const purityRef = useRef();
  const subcatRef = useRef();
  const offerRef = useRef();
  const descRef = useRef();
  const imgRef = useRef();
  const [offers, setOffers] = useState([]);

  const [oldImage, setOldImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const formData = new FormData();
    formData.append("id", id);

    axios
      .post("http://localhost/Jewellerydb/getWomenProduct.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          const data = res.data.data;

          nameRef.current.value = data.product_name;
          priceRef.current.value = data.price;
          purityRef.current.value = data.purity;
          subcatRef.current.value = data.sub_catid;
          offerRef.current.value = data.offer_id || "";
          descRef.current.value = data.description || "";

          setOldImage(data.image);
        }
      })
      .catch(() => alert("Failed to load product"));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const updateProduct = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("product_name", nameRef.current.value.trim());
    formData.append("price", priceRef.current.value);
    formData.append("purity", purityRef.current.value.trim());
    formData.append("sub_catid", subcatRef.current.value);
    formData.append("description", descRef.current.value.trim());
    formData.append("offer_id", offerRef.current.value);
    formData.append("offer_id", offerRef.current.value);

    if (imgRef.current.files[0]) {
      formData.append("image", imgRef.current.files[0]);
    }

    axios
      .post("http://localhost/Jewellerydb/updateWomenProduct.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          alert("Product Updated Successfully");
          navigate("/products/womens/manage");
        } else {
          alert("Update Failed");
        }
      })
      .catch(() => alert("Server Error"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/fetchoffers.php")
      .then((response) => {
        if (response.status === 200) {
          setOffers(response.data.data || []);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Link
          to="/products/mens/manage"
          className="p-2 rounded hover:bg-gray-100"
        >
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Edit Women's Product</h1>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            <input
              ref={nameRef}
              className="input-field"
              placeholder="Product Name *"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                ref={priceRef}
                type="number"
                className="input-field"
                placeholder="Price *"
              />
              <input
                ref={purityRef}
                className="input-field"
                placeholder="Purity *"
              />
            </div>

            <select ref={subcatRef} className="input-field">
              <option value="">Select Sub Category *</option>
              <option value="4">Necklaces</option>
              <option value="5">Earrings</option>
              <option value="6">Bangles</option>
            </select>

            <label className="block text-sm font-medium">Choose an Offer</label>
            <select ref={offerRef} className="input-field">
              <option value="">No Offer</option>
              {offers.map((offer) => (
                <option key={offer.offer_id} value={offer.offer_id}>
                  {offer.offername}
                </option>
              ))}
            </select>

            <textarea
              ref={descRef}
              rows="4"
              className="input-field"
              placeholder="Description"
            />
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="font-semibold mb-2">Product Image</h3>

            <div className="border-2 border-dashed rounded-lg p-2">
              <img
                src={
                  preview
                    ? preview
                    : oldImage
                      ? `http://localhost/Jewellerydb/uploads/womens/${oldImage}`
                      : ""
                }
                alt="Product"
                className="w-full h-56 object-cover rounded"
              />

              <input
                ref={imgRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={updateProduct}
            disabled={loading}
            className="btn-primary px-6 py-2"
          >
            {loading ? "Updating..." : "Update"}
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

export default EditWomensProduct;
