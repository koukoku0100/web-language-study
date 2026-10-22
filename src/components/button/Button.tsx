"use client";

import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  variant: "primary" | "secondary";
  type?: "button";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function Button({ variant, type = "button", children, className, onClick }: ButtonProps) {
  return (
    <button type={type} className={cx(`${styles.button} ${styles[variant]}`, className)} onClick={onClick}>
      {children}
    </button>
  );
}
