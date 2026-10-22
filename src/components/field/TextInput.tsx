"use client";

import styles from "./Field.module.css";

type TextInputProps = {
  id: string;
  type?: "text" | "password";
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onCompositionStart?: (value: string) => void;
  onCompositionEnd?: (value: string) => void;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function TextInput({
  id,
  type = "text",
  value,
  placeholder,
  onChange,
  onCompositionStart,
  onCompositionEnd,
  className,
}: TextInputProps) {
  return (
    <input
      id={id}
      className={cx(`${styles.control} ${styles.textInput}`, className)}
      type={type}
      value={value}
      placeholder={placeholder}
      onCompositionStart={(event) => {
        onCompositionStart?.(event.currentTarget.value);
      }}
      onCompositionEnd={(event) => {
        onCompositionEnd?.(event.currentTarget.value);
      }}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
}
