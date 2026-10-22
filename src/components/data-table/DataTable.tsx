import type { CSSProperties, ReactNode } from "react";
import styles from "./DataTable.module.css";

type LineProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type CellProps = {
  children: ReactNode;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function DataTableHeader({ children, className, style }: LineProps) {
  return (
    <div className={cx(styles.header, className)} style={style}>
      {children}
    </div>
  );
}

export function DataTableRow({ children, className, style }: LineProps) {
  return (
    <div className={cx(styles.row, className)} style={style}>
      {children}
    </div>
  );
}

export function DataTableCell({ children, className }: CellProps) {
  return <span className={cx(styles.cell, className)}>{children}</span>;
}
