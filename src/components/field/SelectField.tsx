"use client";

import styles from "./Field.module.css";

export type SelectOption = {
  id: string;
  label: string;
};

type SelectFieldProps = {
  id: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function SelectField({ id, value, options, onChange, className }: SelectFieldProps) {
  return (
    <select
      id={id}
      className={cx(`${styles.control} ${styles.select}`, className)}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
