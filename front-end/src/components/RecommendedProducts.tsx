import React from "react";
import { ProductCard } from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";

// Define the Product type according to your backend
export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  isRecommended:boolean
}

const RecommendedProducts: React.FC = () => {
  // Fetch products dynamically
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/v1/products/get-products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const result = await response.json();
      return result.data as Product[];
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  if (isLoading) {
    return <p className="text-center mt-6">Loading products...</p>;
  }

  if (isError || !products) {
    return <p className="text-center mt-6 text-red-500">Failed to load products.</p>;
  }

  const RecommendedProducts = products.filter((p) => p.isRecommended);
  

  return (
    <section className="w-full max-w-[1180px] mx-auto mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1c1c1c] mb-4 sm:mb-6">
        Recommended items
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {RecommendedProducts?.map((item) => (
          <ProductCard
            key={item._id}
            image={item.image}
            price={`Rs ${item.price}`}
            description={item.name}
            className="border border-[#DEE2E7] rounded-lg p-3 sm:p-4 
                       flex flex-col items-center
                       hover:shadow-lg hover:border-[#DEE2E7] 
                       transition-all duration-200 cursor-pointer
                       h-full"
            imageClassName="w-full aspect-square object-contain mb-3"
          >
            <div className="flex flex-col items-start w-full mt-auto">
              <p className="text-[#000000] font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                Rs {item.price}
              </p>
              <p className="text-[#000000] leading-none text-base sm:text-sm">
                {item.name}
              </p>
            </div>
          </ProductCard>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
