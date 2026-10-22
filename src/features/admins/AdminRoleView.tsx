"use client";

import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { CardHeading } from "@/components/card-heading/CardHeading";
import { DataTableCell, DataTableHeader, DataTableRow } from "@/components/data-table/DataTable";
import { PageTitle } from "@/components/page-title/PageTitle";
import { SampleBadge } from "@/components/sample-badge/SampleBadge";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import type { PermissionRow } from "./types";
import styles from "./AdminRoleView.module.css";

const ACCOUNT_COLUMNS = "175px 259px 203px 84px 82px";

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
        <PageTitle
          title={adminRole.title}
          description={adminRole.description}
          descriptionClassName={styles.nowrap}
        />
        {adminRole.showSampleDataBadge ? <SampleBadge className={styles.sampleBadge} /> : null}
      </header>

      <Card className={styles.permissionCard}>
        <CardHeading className={styles.permissionHeading}>{adminRole.permissionHeading}</CardHeading>
        <p className={styles.note}>{adminRole.permissionNote}</p>
        <DataTableHeader className={styles.permissionHead} style={{ gridTemplateColumns: permissionColumns }}>
          <DataTableCell>操作</DataTableCell>
          {adminRole.roleColumns.map((column) => (
            <DataTableCell key={column.id}>{column.name}</DataTableCell>
          ))}
        </DataTableHeader>
        {adminRole.permissionRows.map((row) => (
          <DataTableRow
            key={row.id}
            className={styles.permissionRow}
            style={{ gridTemplateColumns: permissionColumns }}
          >
            <DataTableCell className={styles.actionCell}>{row.actionLabel}</DataTableCell>
            {adminRole.roleColumns.map((column) => {
              const mark = permissionMark(row, column.id);
              return (
                <DataTableCell key={column.id}>
                  {mark === "allowed" ? <StatusBadge tone="allowed" /> : null}
                  {mark === "denied" ? <span className={styles.deniedMark}>不可</span> : null}
                </DataTableCell>
              );
            })}
          </DataTableRow>
        ))}
      </Card>

      <Card className={styles.accountCard}>
        <div className={styles.accountHeader}>
          <CardHeading>{adminRole.accountHeading}</CardHeading>
          <Button variant="primary" className={styles.addButton} onClick={() => {}}>
            管理者を追加
          </Button>
        </div>
        <DataTableHeader className={styles.accountHead} style={{ gridTemplateColumns: ACCOUNT_COLUMNS }}>
          <DataTableCell>名前</DataTableCell>
          <DataTableCell>メールアドレス</DataTableCell>
          <DataTableCell>ロール</DataTableCell>
          <DataTableCell>状態</DataTableCell>
          <DataTableCell>操作</DataTableCell>
        </DataTableHeader>
        {adminRole.accounts.map((account) => (
          <DataTableRow key={account.id} className={styles.accountRow} style={{ gridTemplateColumns: ACCOUNT_COLUMNS }}>
            <DataTableCell className={styles.nameCell}>{account.name}</DataTableCell>
            <DataTableCell>{account.email}</DataTableCell>
            <DataTableCell>{account.roleName}</DataTableCell>
            <DataTableCell>
              {account.status === "active" ? <StatusBadge tone="active" className={styles.badgeActive} /> : null}
              {account.status === "suspended" ? (
                <StatusBadge tone="suspended" className={styles.badgeSuspended} />
              ) : null}
            </DataTableCell>
            <DataTableCell>
              <Button variant="secondary" className={styles.editButton} onClick={() => {}}>
                編集
              </Button>
            </DataTableCell>
          </DataTableRow>
        ))}
      </Card>
    </div>
  );
}
