import React from "react";

type OrderInfoProps = {
  slaughterDate: string;
  orderDeadline: string;
  cowHeadPrice: string;
  slotPrice: string;
  cowLegs: string;
  cowTailPrice: string;
};

const OrderInfo: React.FC<OrderInfoProps> = ({
  slaughterDate,
  orderDeadline,
  cowHeadPrice,
  slotPrice,
  cowLegs,
  cowTailPrice,
}) => {
  return (
    <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3 text-left max-w-md sm:max-w-xl mx-auto shadow mb-4">
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Slaughter Date:</span> {slaughterDate}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-base">
          <span className="font-semibold text-red-600">Order Deadline:</span>{" "}
          {orderDeadline}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Price per Slot:</span> {slotPrice}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Cow Head Price:</span> {cowHeadPrice}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Cow Legs:</span> {cowLegs}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Cow Tail Price:</span> {cowTailPrice}
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
