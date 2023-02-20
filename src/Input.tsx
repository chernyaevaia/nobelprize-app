import React, { ChangeEvent } from "react";

export interface InputProps {
  placeholder?: string;
  id?: string;
  label?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number";
}

export function Input({
  placeholder,
  id,
  label,
  value,
  onChange,
  type,
}: InputProps) {
  if (type === "text") {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
        />
      </div>
    );
  }
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type="number"
        placeholder={placeholder}
      />
    </div>
  );
}
