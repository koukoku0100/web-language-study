import styles from "./StatusBadge.module.css";

export type StatusTone = "published" | "draft" | "private" | "active" | "suspended" | "allowed";

const LABEL: Record<StatusTone, string> = {
  published: "公開",
  draft: "下書き",
  private: "非公開",
  active: "利用中",
  suspended: "停止中",
  allowed: "可",
};

type StatusBadgeProps = {
  tone: StatusTone;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function StatusBadge({ tone, className }: StatusBadgeProps) {
  return <span className={cx(`${styles.badge} ${styles[tone]}`, className)}>{LABEL[tone]}</span>;
}
