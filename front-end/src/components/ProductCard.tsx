import React from "react";

type ProductProps = {
  title?: string;
  description?: React.ReactNode;
  price?: string;
  image: string;
  imageClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ProductCard = ({
  title,
  description,
  price,
  image,
  className,
  imageClassName,
  children, 
  ...props
}: ProductProps & { children?: React.ReactNode }) => {
  return (
    <div
      {...props}
      className={`p-3 hover:shadow-md transition cursor-pointer bg-white ${className || ""}`}
    >
      
      <div className="flex justify-center">
        <img
          src={image}
          alt={title || "product"}
          className={`h-20 object-contain ${imageClassName || ""}`}
        />
      </div>

      
      <div className="mt-2 text-sm flex flex-col items-start">
        {children ? (
          children 
        ) : (
          <>
            {title && <p className="font-medium">{title}</p>}
            {description && <p className="text-gray-600 text-xs">{description}</p>}
            {price && (
              <p className="text-gray-400 text-xs mt-1">
                From <br />
                <span className="text-[#8B96A5]">{price}</span>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
