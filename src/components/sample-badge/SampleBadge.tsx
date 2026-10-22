import styles from "./SampleBadge.module.css";

type SampleBadgeProps = {
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function SampleBadge({ className }: SampleBadgeProps) {
  return <p className={cx(styles.badge, className)}>サンプルデータ</p>;
}
