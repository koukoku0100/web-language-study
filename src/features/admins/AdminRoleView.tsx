"use client";

import { useAppSelector } from "@/store/hooks";
import type { PermissionRow } from "./types";
import styles from "./AdminRoleView.module.css";

function permissionMark(row: PermissionRow, roleId: string) {
  const cell = row.cells.find((item) => item.roleId === roleId);
  if (!cell) {
    return null;
  }
  if (cell.value === "allowed" || cell.value === "denied") {
    return cell.value;
  }
  return null;
}

function statusBadge(status: string) {
  if (status === "active") {
    return { label: "利用中", className: styles.badgeActive };
  }
  if (status === "suspended") {
    return { label: "停止中", className: styles.badgeSuspended };
  }
  return null;
}

function roleColumnTemplate(count: number) {
  if (count === 3) {
    return "346px 149px 149px 159px";
  }
  if (count <= 0) {
    return "346px";
  }
  const base = Math.floor(457 / count);
  const remainder = 457 - base * count;
  const widths = Array.from({ length: count }, (_, index) =>
    index === count - 1 ? base + remainder : base,
  );
  return ["346px", ...widths.map((width) => `${width}px`)].join(" ");
}

export function AdminRoleView() {
  const adminRole = useAppSelector((state) => state.adminRole);
  const permissionColumns = roleColumnTemplate(adminRole.roleColumns.length);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{adminRole.title}</h1>
          <p className={styles.description}>{adminRole.description}</p>
        </div>
        {adminRole.showSampleDataBadge ? <p className={styles.sampleBadge}>サンプルデータ</p> : null}
      </header>

      <section className={styles.permissionCard}>
        <h2 className={styles.cardHeading}>{adminRole.permissionHeading}</h2>
        <p className={styles.note}>{adminRole.permissionNote}</p>
        <div className={styles.permissionHead} style={{ gridTemplateColumns: permissionColumns }}>
          <span className={styles.cell}>操作</span>
          {adminRole.roleColumns.map((column) => (
            <span key={column.id} className={styles.cell}>
              {column.name}
            </span>
          ))}
        </div>
        {adminRole.permissionRows.map((row) => (
          <div
            key={row.id}
            className={styles.permissionRow}
            style={{ gridTemplateColumns: permissionColumns }}
          >
            <span className={`${styles.cell} ${styles.actionCell}`}>{row.actionLabel}</span>
            {adminRole.roleColumns.map((column) => {
              const mark = permissionMark(row, column.id);
              return (
                <span key={column.id} className={styles.cell}>
                  {mark === "allowed" ? <span className={styles.allowedBadge}>可</span> : null}
                  {mark === "denied" ? <span className={styles.deniedMark}>不可</span> : null}
                </span>
              );
            })}
          </div>
        ))}
      </section>

      <section className={styles.accountCard}>
        <div className={styles.accountHeader}>
          <h2 className={styles.cardHeading}>{adminRole.accountHeading}</h2>
          <button type="button" className={styles.addButton}>
            管理者を追加
          </button>
        </div>
        <div className={styles.accountHead}>
          <span className={styles.cell}>名前</span>
          <span className={styles.cell}>メールアドレス</span>
          <span className={styles.cell}>ロール</span>
          <span className={styles.cell}>状態</span>
          <span className={styles.cell}>操作</span>
        </div>
        {adminRole.accounts.map((account) => {
          const badge = statusBadge(account.status);
          return (
            <div key={account.id} className={styles.accountRow}>
              <span className={`${styles.cell} ${styles.nameCell}`}>{account.name}</span>
              <span className={styles.cell}>{account.email}</span>
              <span className={styles.cell}>{account.roleName}</span>
              <span className={styles.cell}>
                {badge ? <span className={`${styles.statusBadge} ${badge.className}`}>{badge.label}</span> : null}
              </span>
              <span className={styles.cell}>
                <button type="button" className={styles.editButton}>
                  編集
                </button>
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}
