import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const AddOffers = () => {
  const navigate = useNavigate();

  // refs
  const promoRef = useRef();
  const nameRef = useRef();
  const discountRef = useRef();
  const descRef = useRef();
  const validityRef = useRef();
  const statusRef = useRef();

  const addOffer = () => {
  const promocode = promoRef.current.value.trim();
  const offername = nameRef.current.value.trim();
  const discount_value = discountRef.current.value;
  const offerdescription = descRef.current.value.trim();
  const validity = validityRef.current.value;
  const status = statusRef.current.value;

  // ✅ Validation
  if (!promocode || !offername || !discount_value || !validity) {
    alert("Please fill all required fields");
    return;
  }

  if (discount_value <= 0 || discount_value > 100) {
    alert("Discount must be between 1 and 100");
    return;
  }

  const formdata = new FormData();
  formdata.append("promocode", promocode);
  formdata.append("offername", offername);
  formdata.append("discount_value", discount_value);
  formdata.append("offerdescription", offerdescription);
  formdata.append("validity", validity);
  formdata.append("status", status);

  axios
    .post("http://localhost/Jewellerydb/addoffer.php", formdata)
    .then((res) => {
      console.log(res.data);

      if (res.data.status) {
        alert("Offer Added Successfully");
        setTimeout(() => navigate("/offers"), 1500);
      } else {
        alert(res.data.error || "Failed to add offer");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Server error");
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Add Offer</h1>
          <p className="text-gray-600 mt-1">
            Create a new offer for your products
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="card max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Promo Code */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Promo Code *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter promo code"
              ref={promoRef}
            />
          </div>

          {/* Offer Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Offer Name *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter offer name"
              ref={nameRef}
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Discount (%) *
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="Enter discount"
              ref={discountRef}
            />
          </div>

          {/* Validity */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Validity (Days) *
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="Enter validity"
              ref={validityRef}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status *
            </label>
            <select className="input-field" ref={statusRef}>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            rows={4}
            className="input-field"
            placeholder="Enter offer description"
            ref={descRef}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            className="btn-primary px-6 py-2"
            onClick={addOffer}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-secondary px-6 py-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOffers;