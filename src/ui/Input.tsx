import { ChangeEvent } from "react";
import styles from "./Input.module.scss"

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
        <label className={styles.labeltext} htmlFor={id}>{label}</label>
        <input
        className={styles.input}
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
      <label className={styles.labeltext} htmlFor={id}>{label}</label>
      <input className={styles.input}
        id={id}
        value={value}
        onChange={onChange}
        type="number"
        placeholder={placeholder}
      />
    </div>
  );
}
