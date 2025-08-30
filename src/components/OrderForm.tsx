import React from "react";
import type { OrderData, OrderItem } from "../pages/Home";

interface Props {
  formData: OrderData;
  setFormData: React.Dispatch<React.SetStateAction<OrderData>>;
}

const OrderForm: React.FC<Props> = ({ formData, setFormData }) => {
  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { type: "", quantity: 1 }],
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length === 1) return; // always keep at least one row
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Order Details
      </h2>

      {formData.items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3"
        >
          <select
            value={item.type}
            onChange={(e) => handleItemChange(index, "type", e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="">Select Item</option>
            <option value="Half slot Inu eran">Half slot Inu eran</option>
            <option value="Half slot Beef">Half slot Beef</option>
            <option value="Half slot Ike">Half slot Ike</option>
            <option value="Half slot Ige">Half slot Ige</option>
            <option value="Half slot Agemawo">Half slot Agemawo</option>
            <option value="1 slot Beef">1 slot Beef</option>
            <option value="1 slot Agemawo">1 slot Agemawo</option>
            <option value="1 slot Agemawo + inu eran">
              1 slot Agemawo + Inu
            </option>
            <option value="1 slot Ige">1 slot Ige</option>
            <option value="Cow Leg">Cow Leg</option>
            <option value="Half Cow Tail">Half Cow Tail</option>
            <option value="Full Cow Tail">Full Cow Tail</option>
            <option value="Half Cow Head">Half Cow Head</option>
            <option value="Full Cow Head">Full Cow Head</option>
          </select>

          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", parseInt(e.target.value))
            }
            className="w-full sm:w-24 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />

          {formData.items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        + Add Item
      </button>
    </section>
  );
};

export default OrderForm;
