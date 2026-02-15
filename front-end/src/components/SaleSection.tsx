import React from "react";
import { useQuery } from "@tanstack/react-query";


export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  discountPercentage?: number | null;
  isDeal: boolean;
  category: { _id: string; name: string };
  slug: string;
  stock: number;
}

const SaleSectionArea: React.FC = () => {
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/v1/products/get-products");
      console.log("Responnse"+response)
      if (!response.ok) throw new Error("Failed to fetch products");
      const result = await response.json();
      console.log(result)
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // cache 5 minutes
  });

  if (isLoading) {
    return <p className="text-center mt-6">Loading products...</p>;
  }

  if (isError || !products || products.length === 0) {
    return <p className="text-center mt-6 text-red-500">Failed to load products.</p>;
  }

  // Filter only products marked as deals
  console.log("All products",products)
  const dealProducts = products.filter((p) => p.isDeal);
  console.log("DealProducts",dealProducts)

  if (dealProducts.length === 0) {
    return <p className="text-center mt-6 text-gray-500">No deals available right now.</p>;
  }

  return (
    <section className="w-full lg:max-w-[1180px] mx-4 lg:mx-auto bg-white rounded-md overflow-hidden border border-[#DEE2E7]">
      
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex py-4 gap-3">
            {dealProducts.map((item) => (
              <div
                key={item._id}
                className="flex-shrink-0 w-[140px] h-[180px] text-center border border-[#DEE2E7] rounded-md p-2"
              >
                <div className="relative mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-20 object-contain mt-3"
                  />
                </div>
                <p className="text-xs text-gray-700 mb-2">{item.name}</p>
                {item.discountPercentage != null && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-[#EB001B] bg-[#FFE3E3] rounded-full">
                    {item.discountPercentage}% OFF
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-6">
          {/* Left Info Panel */}
          <div className="col-span-1 bg-[#FFFF] p-2 flex flex-col justify-center border-r border-[#DEE2E7] ml-4">
            <h2 className="text-xl font-semibold text-[#1c1c1c] -mt-20">Deals and Offers</h2>
            <p className="text-xs text-gray-500 leading-[100%] mb-3">Electronic Equipments</p>
          </div>

          {/* Deals Grid */}
          <div className="col-span-5 grid grid-cols-5 divide-x divide-[#DEE2E7]">
            {dealProducts?.map((item) => (
              <div
                key={item._id}
                className="p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain mx-auto"
                  />
                </div>
                <p className="text-sm text-gray-800 mb-2">{item.name}</p>
                {item.discountPercentage != null && (
                  <span className="inline-block px-4 py-1 text-sm font-semibold text-[#EB001B] bg-[#FFE3E3] rounded-full">
                    {item.discountPercentage}% OFF
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleSectionArea;
