import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function Card({ children, className }: CardProps) {
  return <section className={cx(styles.card, className)}>{children}</section>;
}
