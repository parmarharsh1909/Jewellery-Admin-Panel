import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import axios from "axios";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/feedback.php")
      .then((response) => {
        if (response.status === 200) {
          setFeedbacks(response.data.data || []);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
        <p className="text-gray-600 mt-1">
          View customer feedback and reviews
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-center">ID</th>
                <th className="px-6 py-3 text-center">User Name</th>
                <th className="px-6 py-3 text-center">Email</th>
                <th className="px-6 py-3 text-center">Product Name</th>
                <th className="px-6 py-3 text-center">Rating</th>
                <th className="px-6 py-3 text-center">Message</th>
                <th className="px-6 py-3 text-center">Date</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb) => (
                  <tr
                    key={fb.id}
                    className="hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-4">{fb.id}</td>
                    <td className="px-6 py-4">{fb.user_name}</td>
                    <td className="px-6 py-4">{fb.user_email}</td>
                    <td className="px-6 py-4">{fb.product_name}</td>
                    <td className="px-6 py-4">{fb.rating}</td>
                    <td className="px-6 py-4">{fb.message}</td>
                    <td className="px-6 py-4">
                      {new Date(fb.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                      No feedback found
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
