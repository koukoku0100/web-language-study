import type { ReactNode } from "react";
import styles from "./CardHeading.module.css";

type CardHeadingProps = {
  children: ReactNode;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function CardHeading({ children, className }: CardHeadingProps) {
  return <h2 className={cx(styles.heading, className)}>{children}</h2>;
}
