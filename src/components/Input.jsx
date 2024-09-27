import * as React from "react";

export default function Input({ type, name, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full p-2 border border-[#cccccc] rounded-md text-base focus:border-blue-500 outline-none"
    />
  );
}
