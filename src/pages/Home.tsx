import React, { useEffect, useState, useCallback } from "react"; // Add useCallback
import "../index.css";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomerForm from "../components/CustomerForm";
import OrderForm, { type Product } from "../components/OrderForm";
import DeliveryOption from "../components/DeliveryOption";
import OverviewModal from "../components/OverviewModal";
import OrderInfo from "../components/OrderInfo";

export type OrderItem = {
  type: string;
  quantity: number;
  price: number | null;
};

export type OrderData = {
  name: string;
  phone: string;
  deliveryMethod: "pickup" | "delivery";
  address?: string;
  notes?: string;
  id?: string;
  items: OrderItem[];
  total_price?: number;
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

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    const { data, error } = await supabase.rpc("get_sellable_products");
    if (error) {
      console.error("Error fetching products:", error);
      toast.error("Could not load product list.");
    } else {
      setProducts(data);
    }
    setProductsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();

    const fetchSubmitStatus = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("submit_enabled")
        .limit(1)
        .single();
      if (!error && data) setIsSubmitEnabled(data.submit_enabled);
    };
    fetchSubmitStatus();
  }, [fetchProducts]);

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
    setLoading(true);

    if (formData.items.some((item) => !item.type)) {
      toast.error("❌ Please select a product for all items.");
      setLoading(false);
      return;
    }

    try {
      for (const item of formData.items) {
        const productInfo = products.find((p) => p.name === item.type);
        if (
          !productInfo ||
          productInfo.effective_quantity_available < item.quantity
        ) {
          throw new Error(`Not enough stock for "${item.type}".`);
        }
      }

      const totalPrice = formData.items.reduce((sum, item) => {
        const price = item.price ?? 0;
        return sum + price * item.quantity;
      }, 0);

      const orderToSave = {
        ...formData,
        items: JSON.stringify(formData.items),
        total_price: totalPrice,
      };

      const { data: insertedOrder, error: insertError } = await supabase
        .from("orders")
        .insert([orderToSave])
        .select()
        .single();

      if (insertError) throw new Error(insertError.message);

      for (const item of formData.items) {
        const { data: responseMessage, error: rpcError } = await supabase.rpc(
          "process_order_decrement",
          {
            p_name: item.type,
            order_quantity: item.quantity,
          }
        );

        if (rpcError || responseMessage?.includes("Failure")) {
          toast.error(
            `CRITICAL ERROR: Order saved but failed to update inventory for ${item.type}. Please contact support.`
          );
        }
      }

      await fetchProducts();

      setSubmittedOrder({
        ...formData,
        id: insertedOrder?.id,
        items: formData.items,
        total_price: totalPrice,
      });

      setIsOverviewOpen(true);
      toast.success("Order submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        deliveryMethod: "pickup",
        address: "",
        notes: "",
        items: [{ type: "", quantity: 1, price: null }],
      });
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";
      if (error instanceof Error) errorMessage = error.message;
      console.error("Error submitting order:", errorMessage);
      toast.error(`❌ Order Failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-3xl lg:px-8 py-6 pt-16">
      <OrderInfo
        slaughterDate="Saturday, 1st Nov"
        orderDeadline="Thursday, 31th Nov 11:59 PM"
        cowHeadPrice="Ranges between ₦50,000 - ₦70,000"
        slotPrice="₦7,500"
        cowLegs="4 available(FCFS) Price ranges between ₦7,000 - ₦9,000"
        cowTailPrice="₦20,000 - ₦30,000"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 rounded-xl shadow"
      >
        <CustomerForm formData={formData} handleChange={handleChange} />
        <OrderForm
          formData={formData}
          setFormData={setFormData}
          products={products}
          loading={productsLoading}
        />
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
          {loading ? "Submitting..." : "Submit Order"}
        </button>
      </form>

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
