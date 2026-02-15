import blueheart from "../assets/Layout/Brand/blueheart.png";
import { Link } from "react-router-dom";

type ProductListCardProps = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  view: "grid" | "list";
};

const ProductListCard = ({
  name,
  slug,
  price,
  image,
  description,
  view,
}: ProductListCardProps) => {

  // 🔹 GRID VIEW
  if (view === "grid") {
    return (
      <div className="border border-[#E6E6E6] rounded-lg p-4 bg-white hover:shadow-md transition">
        <Link to={`/product/${slug}`}>
          <div className="w-full h-[180px] flex items-center justify-center mb-3">
            <img
              src={image}
              alt={name}
              className="max-h-full object-contain"
            />
          </div>

          <h3 className="text-sm font-medium mb-2">{name}</h3>

          <p className="text-lg font-semibold mb-2">${price}</p>

          <p className="text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        </Link>
      </div>
    );
  }

  // 🔹 LIST VIEW (your existing layout simplified)
  return (
    <div className="flex items-start gap-5 w-full border border-[#E6E6E6] rounded-lg p-5 bg-white hover:shadow-md transition">

      <div className="w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-base font-medium mb-2">{name}</h3>

        <p className="text-xl font-semibold mb-2">${price}</p>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {description}
        </p>

        <Link
          to={`/product/${slug}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View details
        </Link>
      </div>

      <button className="border border-gray-300 bg-white rounded-md w-10 h-10 flex items-center justify-center hover:bg-gray-50">
        <img src={blueheart} alt="wishlist" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductListCard;
