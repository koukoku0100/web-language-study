import styles from "./PageTitle.module.css";

type PageTitleProps = {
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function PageTitle({ title, description, titleClassName, descriptionClassName }: PageTitleProps) {
  return (
    <div>
      <h1 className={cx(styles.title, titleClassName)}>{title}</h1>
      <p className={cx(styles.description, descriptionClassName)}>{description}</p>
    </div>
  );
}
