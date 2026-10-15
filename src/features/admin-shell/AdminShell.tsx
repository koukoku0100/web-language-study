"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import styles from "./AdminShell.module.css";

const SCREEN_ID_BY_PATH: Record<string, string> = {
  "/dashboard": "WELG0110",
  "/courses": "WELG0120",
  "/questions": "WELG0130",
  "/users": "WELG0140",
  "/admins": "WELG0150",
};

function AdminShellBase() {
  const shell = useAppSelector((state) => state.adminShell);
  const pathname = usePathname();
  const activeScreenId = SCREEN_ID_BY_PATH[pathname] ?? null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <p className={styles.productName}>{shell.productName}</p>
        <p className={styles.productDescription}>{shell.productDescription}</p>
      </div>
      <nav className={styles.nav} aria-label="メニュー">
        {shell.navItems.map((item) => {
          const selected = item.screenId === activeScreenId;
          return (
            <button
              key={item.screenId}
              type="button"
              className={selected ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
              aria-current={selected ? "page" : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className={styles.footer}>
        <p className={styles.adminName}>{shell.currentAdmin.name}</p>
        <p className={styles.adminRole}>{shell.currentAdmin.roleLabel}</p>
        <p className={styles.adminEmail}>{shell.currentAdmin.email}</p>
        <button type="button" className={styles.logout}>
          ログアウト
        </button>
      </div>
    </aside>
  );
}

export const AdminShell = memo(AdminShellBase);
