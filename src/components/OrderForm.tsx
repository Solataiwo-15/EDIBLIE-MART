import React from "react";
import type { OrderData, OrderItem } from "../pages/Home";

export type Product = {
  name: string;
  price: number | null;
  effective_quantity_available: number;
};

interface Props {
  formData: OrderData;
  setFormData: React.Dispatch<React.SetStateAction<OrderData>>;
  products: Product[];
  loading: boolean;
}

const OrderForm: React.FC<Props> = ({
  formData,
  setFormData,
  products,
  loading,
}) => {
  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const newItems = [...formData.items];
    const currentItem = { ...newItems[index] };

    if (field === "type" && typeof value === "string") {
      const selectedProduct = products.find((p) => p.name === value);
      currentItem.type = value;
      currentItem.price = selectedProduct ? selectedProduct.price : null;
    } else if (field === "quantity") {
      currentItem.quantity = Number(value);
    }

    newItems[index] = currentItem;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { type: "", quantity: 1, price: null }],
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length === 1) return;
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Order Details
      </h2>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <>
          {formData.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3"
            >
              <select
                value={item.type}
                onChange={(e) =>
                  handleItemChange(index, "type", e.target.value)
                }
                required
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">Select Item</option>
                {products.map((product) => {
                  const isSoldOut = product.effective_quantity_available < 1;
                  const isCurrentlySelected = item.type === product.name;
                  return (
                    <option
                      key={product.name}
                      value={product.name}
                      disabled={isSoldOut && !isCurrentlySelected}
                      className={isSoldOut ? "text-gray-400" : ""}
                    >
                      {product.name}{" "}
                      {isSoldOut
                        ? "(Sold Out)"
                        : `(${product.effective_quantity_available} left)`}
                    </option>
                  );
                })}
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
              <span className="text-gray-700 font-medium min-w-[100px]">
                {item.price !== null && item.type
                  ? `₦${item.price}`
                  : item.type
                  ? "Price at venue"
                  : "-"}
              </span>
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
        </>
      )}
    </section>
  );
};

export default OrderForm;
