import React from "react";
import { ShieldCheck, Headphones, Truck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure payment",
    desc: "Have you ever finally just",
  },
  {
    icon: Headphones,
    title: "Customer support",
    desc: "Have you ever finally just",
  },
  {
    icon: Truck,
    title: "Free delivery",
    desc: "Have you ever finally just",
  },
];

const CartExtraSection = () => {
  return (
    <section className="w-full flex px-5 py-3 ">
        <div className="w-full max-w-[880px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
        {features?.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 p-3 "
            >
              <div className="min-w-[42px] h-[42px] flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                <Icon className="w-4" />
              </div>

              <div>
                <h4 className="text-[15px] font-semibold text-gray-900">
                  {item.title}
                </h4>
                <p className="text-[13px] text-gray-500 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CartExtraSection;
