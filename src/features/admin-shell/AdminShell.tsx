"use client";

import { memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import styles from "./AdminShell.module.css";

const PATH_BY_SCREEN_ID: Record<string, string> = {
  WELG0110: "/dashboard",
  WELG0120: "/courses",
  WELG0130: "/questions",
  WELG0140: "/users",
  WELG0150: "/admins",
};

const SCREEN_ID_BY_PATH: Record<string, string> = Object.fromEntries(
  Object.entries(PATH_BY_SCREEN_ID).map(([screenId, path]) => [path, screenId]),
);

function AdminShellBase() {
  const shell = useAppSelector((state) => state.adminShell);
  const pathname = usePathname();
  const router = useRouter();
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
              onClick={() => {
                const path = PATH_BY_SCREEN_ID[item.screenId];
                if (path) {
                  router.push(path);
                }
              }}
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
        <button type="button" className={styles.logout} onClick={() => {}}>
          ログアウト
        </button>
      </div>
    </aside>
  );
}

export const AdminShell = memo(AdminShellBase);
