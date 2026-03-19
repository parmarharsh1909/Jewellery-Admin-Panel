import { useState, useEffect } from "react";
import axios from "axios";
import { Award } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [statsData, setStatsData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // ✅ STATS API
    axios
      .get("http://localhost/Jewellerydb/dashboard.php")
      .then((res) => {
        const data = res.data;

        setStatsData([
          {
            title: "Main Categories",
            value: data.totalMainCategories,
            color: "blue",
          },
          {
            title: "Sub Categories",
            value: data.totalSubCategories,
            color: "green",
          },
          { title: "Products", value: data.totalProducts, color: "purple" },
          { title: "Users", value: data.totalUsers, color: "pink" },
          { title: "Orders", value: data.totalOrders, color: "yellow" },
          { title: "Offers", value: data.totalOffers, color: "red" },
        ]);
      })
      .catch((err) => console.log(err));

    // ✅ GRAPH API (Product vs Price)
    axios
      .get("http://localhost/Jewellerydb/dashboardgraph.php")
      .then((res) => {
        const products = res.data.data;

        const chartData = products.map((item) => ({
          name: item.product_name,
          price: parseInt(item.price),
        }));

        setGraphData(chartData);
      })
      .catch((err) => console.log("GRAPH ERROR:", err));
  }, []);

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
  };
  const CustomXAxisTick = ({ x, y, payload }) => {
    const words = payload.value.split(" ");

    return (
      <g transform={`translate(${x},${y})`}>
        <text textAnchor="middle" fontSize="11">
          {words.slice(0, 3).map((word, index) => (
            <tspan key={index} x="0" dy={index === 0 ? 0 : 12}>
              {word}
            </tspan>
          ))}
        </text>
      </g>
    );
  };
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* ✅ STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {statsData.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex justify-between">
              <div>
                <p>{stat.title}</p>
                <h2 className="text-2xl font-bold ">{stat.value}</h2>
              </div>
              <div className={`p-3 rounded ${colorClasses[stat.color]}`}>
                <Award />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ GRAPH: Product vs Price */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Product Price Chart</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              height={80}
              tick={<CustomXAxisTick />}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#d4af37" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
