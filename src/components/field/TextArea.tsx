"use client";

import styles from "./Field.module.css";

type TextAreaProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function TextArea({ id, value, onChange, className }: TextAreaProps) {
  return (
    <textarea
      id={id}
      className={cx(`${styles.control} ${styles.textarea}`, className)}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
}
