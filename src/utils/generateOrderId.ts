// generateOrderId.ts
export const generateOrderId = (): string => {
  // Get last order number from localStorage
  const last = localStorage.getItem("lastOrderNumber");
  const orderNumber = last ? parseInt(last) + 1 : 1;

  // Save it back for next order
  localStorage.setItem("lastOrderNumber", orderNumber.toString());

  // Pad with zeros to 3 digits
  const padded = orderNumber.toString().padStart(3, "0");

  return `#EDM${padded}`;
};
