import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className = "", ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          "px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-300 focus:border-gray-600 w-full",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
