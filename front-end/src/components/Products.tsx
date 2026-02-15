import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductListCard from "./ProductListCard";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
}

const Products = () => {
  const [view, setView] = useState<"grid" | "list">("list");

  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/v1/products/get-products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const result = await response.json();
      return result.data as Product[];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p>Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p>Failed to load products</p>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* 🔹 TOP TOOLBAR */}
      <div className="w-full bg-white border border-[#E6E6E6] rounded-lg px-4 py-3 mb-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-600">
            {products?.length ?? 0} Products
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("grid")}
            className={`border p-2 rounded ${
              view === "grid"
                ? "bg-blue-500 text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            🔳
          </button>

          <button
            onClick={() => setView("list")}
            className={`border p-2 rounded ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            ☰
          </button>
        </div>
      </div>

      {/* 🔹 PRODUCT LIST */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {products?.map((product) => (
          <ProductListCard
            key={product._id}
            _id={product._id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            image={product.image}
            description={product.description}
            view={view}   // 👈 pass view
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
