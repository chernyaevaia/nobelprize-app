import { ChangeEvent } from "react";
import { Option } from "./types";

export interface DropdownProps {
  label?: string;
  id?: string;
  options: Option[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export function Dropdown({
  label,
  id,
  options,
  onChange,
  value,
}: DropdownProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={onChange}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={value === option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
