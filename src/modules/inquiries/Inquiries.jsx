import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import axios from "axios";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/inquiries.php")
      .then((response) => {
        if (response.status === 200) {
          setInquiries(response.data.data || []);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-600 mt-1">
          View customer inquiries and messages
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-center">Inquiry ID</th>
                <th className="px-6 py-3 text-center">Username</th>
                <th className="px-6 py-3 text-center">Email</th>
                <th className="px-6 py-3 text-center">Mobile</th>
                <th className="px-6 py-3 text-center">Product Name</th>
                <th className="px-6 py-3 text-center">Message</th>
                <th className="px-6 py-3 text-center">Date</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <tr
                    key={inq.inquiry_id}
                    className="hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-4">{inq.inquiry_id}</td>
                    <td className="px-6 py-4">{inq.username}</td>
                    <td className="px-6 py-4">{inq.email}</td>
                    <td className="px-6 py-4">{inq.mobile}</td>
                    <td className="px-6 py-4">{inq.product_name}</td>
                    <td className="px-6 py-4">{inq.message}</td>
                    <td className="px-6 py-4">
                      {new Date(inq.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                      No inquiries found
                    </h3>
                    <p className="text-gray-600">
                      Data not available from API
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
