// src/components/OverviewModal.tsx
import React from "react";
import type { OrderData, OrderItem } from "../pages/Home";

interface Props {
  order: OrderData;
  onClose: () => void;
}

const OverviewModal: React.FC<Props> = ({ order, onClose }) => {
  // Ensure items is always an array
  const itemsArray: OrderItem[] =
    typeof order.items === "string" ? JSON.parse(order.items) : order.items;

  const accountDetails = "0043750696 (Access Bank) - TMC";

  // Prepare summary for copy/WhatsApp
  const orderSummary = `
  Order ID: ${order.id}
  Name: ${order.name}
  Phone: ${order.phone}
  Mode of Collection: ${order.deliveryMethod}
  ${
    order.deliveryMethod === "delivery"
      ? `Delivery Address: ${order.address}`
      : ""
  }
  Items:
  ${itemsArray.map((item) => `- ${item.type} x${item.quantity}`).join("\n")}
    `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(accountDetails);
    alert("Account details copied!");
  };

  const phoneNumber = "2348039436510"; // your number
  const message = `Hello Edible, 
    I just made an order. 
    • Order ID: ${order.id} 
    • Here's my payment receipt.`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto overflow-auto max-h-[90vh]">
        <div className="p-6 flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-center ">Order Overview</h2>
          <h4 className="text-xl font-medium text-center">{accountDetails}</h4>

          <div className="text-gray-700 space-y-2 text-sm sm:text-base">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
            <p>
              <strong>Mode of Collection:</strong> {order.deliveryMethod}
            </p>
            {order.deliveryMethod === "delivery" && (
              <p>
                <strong>Delivery Address:</strong> {order.address}
              </p>
            )}
            <div>
              <strong>Items:</strong>
              <ul className="list-disc list-inside ml-4">
                {itemsArray.map((item, idx) => (
                  <li key={idx}>
                    {item.type} x{item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-4">
            <button
              onClick={handleCopy}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Copy Account Details
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Proceed to WhatsApp
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewModal;
