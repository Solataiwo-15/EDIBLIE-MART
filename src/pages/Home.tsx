import React, { useEffect, useState } from "react";
import "../index.css";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomerForm from "../components/CustomerForm";
import OrderForm from "../components/OrderForm";
import DeliveryOption from "../components/DeliveryOption";
import OverviewModal from "../components/OverviewModal";
import OrderInfo from "../components/OrderInfo";

export type OrderItem = {
  type: string;
  quantity: number;
  price: number | null; // added
};

export type OrderData = {
  name: string;
  phone: string;
  deliveryMethod: "pickup" | "delivery";
  address?: string;
  notes?: string;
  id?: string; // UUID from Supabase
  items: OrderItem[];
  total_price?: number; // added
};

const Home: React.FC = () => {
  const [formData, setFormData] = useState<OrderData>({
    name: "",
    phone: "",
    deliveryMethod: "pickup",
    address: "",
    notes: "",
    items: [{ type: "", quantity: 1, price: null }],
  });

  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderData | null>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);
  const [loading, setLoading] = useState(false); // loading state

  useEffect(() => {
    const fetchSubmitStatus = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("submit_enabled")
        .limit(1)
        .single();

      if (!error && data) setIsSubmitEnabled(data.submit_enabled);
    };

    fetchSubmitStatus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      // Calculate total_price
      const totalPrice = formData.items.reduce((sum, item) => {
        const price = item.price ?? 0;
        return sum + price * item.quantity;
      }, 0);

      // Save items as JSON for Postgres
      const orderToSave = {
        ...formData,
        items: JSON.stringify(formData.items),
        total_price: totalPrice, // ✅ added
      };

      const { data, error } = await supabase
        .from("orders")
        .insert([orderToSave])
        .select(); // return inserted row

      if (error) {
        console.error("Error submitting order:", error.message);
        toast.error("❌ Something went wrong while saving the order.");
        return;
      }

      const insertedOrder = data?.[0];

      setSubmittedOrder({
        ...formData,
        id: insertedOrder?.id,
        items: formData.items, // keep as object locally
        total_price: totalPrice, // ✅ keep locally
      });

      setIsOverviewOpen(true);

      // success toast
      toast.success("Order submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        deliveryMethod: "pickup",
        address: "",
        notes: "",
        items: [{ type: "", quantity: 1, price: null }],
      });
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-3xl lg:px-8 py-6 pt-16">
      <OrderInfo
        slaughterDate="Saturday, 13th Sept"
        orderDeadline="Thursday, 11th Sept 11:59 PM"
        cowHeadPrice="Ranges between ₦50,000 - ₦70,000"
        slotPrice="₦7,500"
        cowLegs="4 available(FCFS) Price ranges between ₦7,000 - ₦10,000"
        cowTailPrice="₦20,000 - ₦30,000"
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 rounded-xl shadow"
      >
        <CustomerForm formData={formData} handleChange={handleChange} />
        <OrderForm formData={formData} setFormData={setFormData} />
        <DeliveryOption formData={formData} handleChange={handleChange} />

        <button
          type="submit"
          disabled={!isSubmitEnabled || loading}
          className={`w-full py-2 rounded-lg text-white flex items-center justify-center ${
            isSubmitEnabled && !loading
              ? "bg-green-700 hover:bg-green-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Submit Order"
          )}
        </button>
      </form>

      {/* Overview Modal */}
      {isOverviewOpen && submittedOrder && (
        <OverviewModal
          order={submittedOrder}
          onClose={() => setIsOverviewOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
