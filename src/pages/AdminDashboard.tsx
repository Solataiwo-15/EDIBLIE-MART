import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import type { Order, OrderItem } from "../utils/types";

interface Props {
  setIsAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminDashboard: React.FC<Props> = ({ setIsAdminLoggedIn }) => {
  const navigate = useNavigate();
  //   const [activeTab, setActiveTab] = useState<"orders" | "customers">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAdminLoggedIn(false);
    navigate("/admin-login");
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from<"orders", Order>("orders")
      .select("*");

    if (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
      return;
    }

    if (data) {
      const parsedOrders = data.map((order) => ({
        ...order,
        items:
          typeof order.items === "string"
            ? (JSON.parse(order.items) as OrderItem[])
            : order.items,
      }));
      setOrders(parsedOrders);
    }

    setLoading(false);
  };

  const fetchSubmitSetting = async () => {
    const { data, error } = await supabase
      .from("settings")
      .select("submit_enabled")
      .single();

    if (error) {
      console.error("Error fetching setting:", error);
      return;
    }

    setIsSubmitEnabled(data?.submit_enabled ?? true);
  };

  const toggleSubmit = async () => {
    const newValue = !isSubmitEnabled;
    setIsSubmitEnabled(newValue);

    const { error: updateError } = await supabase
      .from("settings")
      .update({ submit_enabled: !isSubmitEnabled })
      .eq("id", 1); // assuming you only have one row with id = 1

    if (updateError) {
      console.error("Error updating setting:", updateError);
    } else {
      setIsSubmitEnabled(!isSubmitEnabled);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchSubmitSetting();
  }, []);

  const exportOrdersAsPDF = () => {
    // @ts-expect-error using jsPDF from window because TypeScript doesn't know about it
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const headers = [
      ["Order ID", "Name", "Phone", "Mode of Collection", "Address", "Items"],
    ];

    const rows = orders.map((order) => [
      order.id,
      order.name,
      order.phone,
      order.deliveryMethod,
      order.address || "-",
      order.items.map((item) => `${item.type} x${item.quantity}`).join(", "),
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
      startY: 20,
      theme: "grid",
    });

    doc.text("Orders Report", 14, 15);
    doc.save("orders.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <header className="mt-10 left-0 w-full flex justify-between items-center px-4 py-2">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Tabs
      <nav className="flex justify-center gap-8 mt-6 border-b pb-3">
        {["orders", "customers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "orders" | "customers")}
            className={`capitalize px-6 py-2 rounded-md text-lg font-medium ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav> */}

      {/* Page Content */}
      <main className="flex-1 pt-5 px-6">
        <>
          {/* Action buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={exportOrdersAsPDF}
              className="bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700"
            >
              Download Orders
            </button>
            <button
              onClick={toggleSubmit}
              className={`${
                isSubmitEnabled
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white py-2 px-5 rounded`}
            >
              {isSubmitEnabled ? "Submissions Enabled" : "Submissions Disabled"}
            </button>
          </div>

          {/* Title */}
          <h2 className="text-left text-xl font-semibold mb-6">Orders</h2>
          {loading ? (
            <p className="text-left">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-left">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Order ID</th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Phone</th>
                    <th className="py-2 px-4 text-left">Mode of Collection</th>
                    <th className="py-2 px-4 text-left">Address</th>
                    <th className="py-2 px-4 text-left">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-b-0">
                      <td className="py-2 px-4">{order.id}</td>
                      <td className="py-2 px-4">{order.name}</td>
                      <td className="py-2 px-4">{order.phone}</td>
                      <td className="py-2 px-4">{order.deliveryMethod}</td>
                      <td className="py-2 px-4">{order.address || "-"}</td>
                      <td className="py-2 px-4">
                        {order.items
                          .map((item) => `${item.type} x${item.quantity}`)
                          .join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      </main>
    </div>
  );
};

export default AdminDashboard;
