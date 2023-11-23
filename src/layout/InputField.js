import React from "react";


const InputField = ({ type, placeholder, onChange }) => (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border rounded w-32"
    />
  );
export  default InputField