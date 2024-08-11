import { Link } from "@nextui-org/link";
import React from "react";

interface ButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void; // Add onClick as an optional prop
}

const Button: React.FC<ButtonProps> = ({
  href,
  className = "",
  children,
  onClick,
}) => (
  <Link
    className={`text-white font-bold py-2 px-4 rounded-md transition duration-300 ${className}`}
    href={href}
    onClick={(e) => {
      e.preventDefault(); // Prevent default action
      if (onClick) {
        onClick(); // Call onClick if provided
      }
    }}
  >
    {children}
  </Link>
);

export default Button;
