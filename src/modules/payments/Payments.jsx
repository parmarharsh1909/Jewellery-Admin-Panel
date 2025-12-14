import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import axios from "axios";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/Jewellerydb/payments.php")
      .then((response) => {
        if (response.status === 200) {
          setPayments(response.data.data || []);
        }
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-1">
          Track payment status and transactions
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-center">Purchase ID</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Payment ID</th>
                <th className="px-6 py-3 text-center">Date & Time</th>
                <th className="px-6 py-3 text-center">Product ID</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr
                    key={payment.purchase_id}
                    className="hover:bg-gray-50 text-center"
                  >
                    <td className="px-6 py-4">
                      {payment.purchase_id}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {payment.paymentid}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(payment.timestamp).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      {payment.productid}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                      No payments found
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
