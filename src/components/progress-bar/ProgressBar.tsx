import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  variant: "fluid" | "fixed";
  rate: number;
};

export function ProgressBar({ variant, rate }: ProgressBarProps) {
  const trackClass = variant === "fluid" ? styles.fluid : styles.fixed;
  const fillClass = variant === "fluid" ? styles.fluidFill : styles.fixedFill;
  return (
    <div className={trackClass}>
      <div className={fillClass} style={{ width: `${rate}%` }} />
    </div>
  );
}
