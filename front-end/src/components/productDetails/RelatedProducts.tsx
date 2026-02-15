import bag from "../../assets/Layout/alibaba/Image/cloth/bag.png";
import watch from "../../assets/Image/tech/watchimage.png";
import headset from "../../assets/Layout/alibaba/Image/tech/headset.png";
import pent from "../../assets/Layout/alibaba/Image/cloth/pent.png";
import mug from "../../assets/Layout/alibaba/Image/tech/mug.png";
import homeappliance from "../../assets/Image/interior/homeappliance.png";

interface Product {
  id: number;
  name: string;
  priceRange: string;
  image: string;
}

export default function RelatedProducts() {
  const products: Product[] = [
    { id: 1, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: bag },
    { id: 2, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: watch },
    { id: 3, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: headset },
    { id: 4, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: pent },
    { id: 5, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: mug },
    { id: 6, name: "Xiaomi Redmi 8 Original", priceRange: "$32.00-$40.00", image: homeappliance },
  ];

  return (
    <div className="w-full bg-white shadow-md py-6 sm:py-8 rounded-md">
      <div className="w-full max-w-[1180px] mx-auto px-8 sm:px-6">
        <h2 className="text-2xl  sm:px-0 sm:text-2xl font-semibold mb-6 text-[#1C1C1C]">
          Related products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {products?.map((product) => (
            <div key={product.id} className="cursor-pointer group">
              {/* Image Container */}
              <div className="w-full aspect-square bg-[#EEEEEE] rounded-md flex items-center justify-center p-4 sm:p-6 mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                  style={{ filter: 'contrast(1.1)' }}
                />
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-sm sm:text-base text-[#1C1C1C] mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  {product.priceRange}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}