import React from "react";

export function Button({ children, onClick, className = "", type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-cyan-500 hover:bg-blue-600 text-black font-semibold rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
