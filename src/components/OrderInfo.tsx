// src/components/OrderInfo.tsx
import React from "react";
import { CalendarDays, Clock, Tag, Package } from "lucide-react";

type OrderInfoProps = {
  slaughterDate: string;
  orderDeadline: string;
  cowPrice: string;
  slotPrice: string;
  cowLegs: string;
  cowTailPrice: string;
};

const OrderInfo: React.FC<OrderInfoProps> = ({
  slaughterDate,
  orderDeadline,
  cowPrice,
  slotPrice,
  cowLegs,
  cowTailPrice,
}) => {
  return (
    <div className="mb-9 bg-yellow-100 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3 text-left max-w-md sm:max-w-xl mx-auto shadow mb-2">
      <div className="flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-gray-700" />
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Slaughter Date:</span> {slaughterDate}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-red-500" />
        <p className="text-sm sm:text-base">
          <span className="font-semibold text-red-600">Order Deadline:</span>{" "}
          {orderDeadline}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-gray-700" />
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Price per Slot:</span> {slotPrice}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-gray-700" />
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Cow Head Price:</span> {cowPrice}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-gray-700" />
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Cow Legs:</span> {cowLegs}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-gray-700" />
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Cow Tail Price:</span> {cowTailPrice}
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
