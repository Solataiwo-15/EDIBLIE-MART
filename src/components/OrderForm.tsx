import React from "react";
import type { OrderData, OrderItem } from "../pages/Home";

// price mapping (null means price varies / excluded from total)
const ITEM_PRICES: Record<string, number | null> = {
  "Half slot Inu eran": 3750,
  "Half slot Beef": 3750,
  "Half slot Abonu": 3750,
  "Half slot Ijase": 3750,
  "Half slot Ike": 3750,
  "Half slot Ige": 3750,
  "Half slot Agemawo": 3750,
  "1 slot Beef": 7500,
  "1 slot Abonu": 7500,
  "1 slot Ijase": 7500,
  "1 slot Agemawo": 7500,
  "1 slot Agemawo + inu eran": 7500,
  "1 slot Ijase + inu eran": 7500,
  "1 slot Abonu + inu eran": 7500,
  "1 slot Ige": 7500,
  "Cow Leg": null,
  "Half Cow Tail": null,
  "Full Cow Tail": null,
  "Half Cow Head": null,
  "Full Cow Head": null,
};

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

    // auto-attach price when type changes
    if (field === "type" && typeof value === "string") {
      newItems[index].price = ITEM_PRICES[value] ?? null;
    }

    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { type: "", quantity: 1, price: null }],
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
          {/* Item type */}
          <select
            value={item.type}
            onChange={(e) => handleItemChange(index, "type", e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="">Select Item</option>
            {Object.keys(ITEM_PRICES).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          {/* Quantity */}
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

          {/* Price display */}
          <span className="text-gray-700 font-medium min-w-[100px]">
            {item.type
              ? ITEM_PRICES[item.type] !== null
                ? `₦${ITEM_PRICES[item.type]}`
                : "Price at venue"
              : "-"}
          </span>

          {/* Remove button */}
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

      {/* Add Item button */}
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
