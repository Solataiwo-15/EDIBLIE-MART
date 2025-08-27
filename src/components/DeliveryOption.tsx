// src/components/DeliveryOption.tsx
import React from "react";
import type { OrderData } from "../pages/Home";

interface Props {
  formData: OrderData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeliveryOption: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Delivery Option</h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="deliveryMethod"
            value="pickup"
            checked={formData.deliveryMethod === "pickup"}
            onChange={handleChange}
            className="w-5 h-5 accent-green-600"
          />
          <span className="text-gray-700 font-medium">Pickup</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="deliveryMethod"
            value="delivery"
            checked={formData.deliveryMethod === "delivery"}
            onChange={handleChange}
            className="w-5 h-5 accent-green-600"
          />
          <span className="text-gray-700 font-medium">Home Delivery</span>
        </label>

        {formData.deliveryMethod === "delivery" && (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Delivery Address"
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DeliveryOption;
