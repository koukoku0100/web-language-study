import type { ReactNode } from "react";
import styles from "./Field.module.css";

type FieldLabelProps = {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function FieldLabel({ children, htmlFor, className }: FieldLabelProps) {
  return (
    <label className={cx(styles.label, className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
