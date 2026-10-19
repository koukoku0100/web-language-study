import type { ReactNode } from "react";
import { AdminShell } from "@/features/admin-shell/AdminShell";
import styles from "./layout.module.css";

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.frame}>
      <AdminShell />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
