import React from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
  type?: "button" | "submit" | "reset"; 
  bgColor?: string; 
  textColor?: string; 
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      // className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      // {...props}
      className={cn(
        "px-4 py-2 rounded-lg",
        bgColor,
        textColor,
        className // ✅ Now properly overrides
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
