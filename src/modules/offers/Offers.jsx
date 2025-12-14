import { useState, useEffect } from "react";
import { Search, Filter, Tag } from "lucide-react";
import axios from "axios";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const updateOfferStatus = (offerId, newStatus) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === offerId ? { ...offer, status: newStatus } : offer
      )
    );
  };

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      String(offer.id || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      String(offer.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      String(offer.code || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || offer.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
        <p className="text-gray-600 mt-1">View and Manage offers</p>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Offers</p>
          <h3 className="text-2xl font-bold">{offers.length}</h3>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Active Offers</p>
          <h3 className="text-2xl font-bold text-green-600">
            {offers.filter(o => o.status === 'Active').length}
          </h3>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Expired Offers</p>
          <h3 className="text-2xl font-bold text-red-600">
            {offers.filter(o => o.status === 'Expired').length}
          </h3>
        </div>
      </div> */}

      {/* Filters */}
      {/* <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
      </div> */}

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3">Offer ID</th>
              <th className="px-6 py-3">Offer Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Validity</th>
              <th className="px-6 py-3">Product ID</th>
              {/* <th className="px-6 py-3 text-center">Action</th> */}
            </tr>
          </thead>

          <tbody>
            {offers.map((offer, index) => (
              <tr
                key={offer.offer_id ?? index}
                className="border-b border-gray-200"
              >
                <td className="py-3 px-4 text-center align-middle font-semibold text-gray-700">
                  {offer.offer_id}
                </td>

                <td className="py-3 px-4 text-center align-middle font-semibold text-gray-700">{offer.offername}</td>

                <td className="py-3 px-4 text-center align-middle font-semibold text-gray-700">
                  {offer.offerdescription}
                </td>

                <td className="py-3 px-4 text-center align-middle font-semibold text-gray-700">
                  {new Date(offer.validity).toLocaleDateString()}
                </td>

                <td className="py-3 px-4 text-center align-middle font-semibold text-gray-700">{offer.productid}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {offers.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No offers available
          </div>
        )}
      </div>
    </div>
  );
}
