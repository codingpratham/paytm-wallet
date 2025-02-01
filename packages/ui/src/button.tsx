"use client";

import { ReactNode } from "react";
import './css/button-style.css'



interface ButtonProps {
  children: ReactNode;
  onClick:()=> void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick} type="button"  className="custom-button"
    >
      {children}
    </button>
  );
};
