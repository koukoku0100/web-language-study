import styles from "./ListCount.module.css";

type ListCountProps = {
  count: number;
  className?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function ListCount({ count, className }: ListCountProps) {
  if (count < 1) {
    return null;
  }
  return <p className={cx(styles.count, className)}>1〜{count}件を表示</p>;
}
