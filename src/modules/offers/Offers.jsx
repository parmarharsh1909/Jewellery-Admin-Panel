import { useState, useEffect } from "react";
import { Search, Filter, Tag, Plus } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
export default function Offers() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const updateOfferStatus = (offerId, newStatus) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === offerId ? { ...offer, status: newStatus } : offer,
      ),
    );
  };

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      String(offer.offer_id || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      String(offer.offername || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      String(offer.promocode || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || offer.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOffers = filteredOffers.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/offers.php")
      .then((response) => {
        if (response.status === 200) {
          setOffers(response.data.data || []);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
          <p className="text-gray-600 mt-1">
            View and manage all available offers
          </p>
        </div>

        <button
          onClick={() => navigate("/offers/add")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Offer
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field pl-10"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Offer Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Validity</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentOffers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No offers found
                  </td>
                </tr>
              ) : (
                currentOffers.map((offer, index) => (
                  <tr
                    key={offer.offer_id ?? index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 font-medium text-gray-800">
                      {offer.offer_id}
                    </td>

                    <td className="py-4 px-4 text-gray-700">
                      {offer.promocode}
                    </td>

                    <td className="py-4 px-4 text-gray-900 font-medium">
                      {offer.offername}
                    </td>

                    <td className="py-4 px-4 text-gray-600">
                      {offer.offerdescription}
                    </td>

                    <td className="py-4 px-4 text-gray-700">
                      {offer.validity}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          offer.status,
                        )}`}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        {/* Edit */}
                        <Link
                          to={`/offers/edit/${offer.offer_id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit size={18} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => console.log("Delete", offer.offer_id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredOffers.length)} of{" "}
              {filteredOffers.length}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === i + 1
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "border-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
