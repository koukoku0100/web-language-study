"use client";

import { useState } from "react";
import { formatMonthDay, formatYearMonthDay } from "@/features/calendar-date/calendarDate";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { CardHeading } from "@/components/card-heading/CardHeading";
import { DataTableCell, DataTableHeader, DataTableRow } from "@/components/data-table/DataTable";
import { FieldLabel } from "@/components/field/FieldLabel";
import { SelectField } from "@/components/field/SelectField";
import { TextInput } from "@/components/field/TextInput";
import { ListCount } from "@/components/list-count/ListCount";
import { PageTitle } from "@/components/page-title/PageTitle";
import { ProgressBar } from "@/components/progress-bar/ProgressBar";
import { SampleBadge } from "@/components/sample-badge/SampleBadge";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import styles from "./LearnerAdminView.module.css";

const LEARNER_COLUMNS = "117px 172px 99px 99px 135px 99px 82px";

export function LearnerAdminView() {
  const learnerAdmin = useAppSelector((state) => state.learnerAdmin);
  const [searchText, setSearchText] = useState("");
  const [nativeLanguageId, setNativeLanguageId] = useState(learnerAdmin.selectedNativeLanguageId);
  const [statusId, setStatusId] = useState(learnerAdmin.selectedStatusId);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <PageTitle
          title={learnerAdmin.title}
          description={learnerAdmin.description}
          descriptionClassName={styles.nowrap}
        />
        {learnerAdmin.showSampleDataBadge ? <SampleBadge className={styles.sampleBadge} /> : null}
      </header>

      <Card className={styles.listCard}>
        <CardHeading className={styles.listHeading}>学習者一覧</CardHeading>
        <div className={styles.filters}>
          <div className={styles.filterSearch}>
            <FieldLabel htmlFor="WELG0140-search">検索</FieldLabel>
            <TextInput
              id="WELG0140-search"
              className={styles.searchInput}
              value={searchText}
              placeholder={learnerAdmin.searchPlaceholder}
              onChange={setSearchText}
            />
          </div>
          <div className={styles.filterNative}>
            <FieldLabel htmlFor="WELG0140-native-language">母語</FieldLabel>
            <SelectField
              id="WELG0140-native-language"
              className={styles.full}
              value={nativeLanguageId}
              options={learnerAdmin.nativeLanguageOptions}
              onChange={setNativeLanguageId}
            />
          </div>
          <div className={styles.filterStatus}>
            <FieldLabel htmlFor="WELG0140-status">状態</FieldLabel>
            <SelectField
              id="WELG0140-status"
              className={styles.full}
              value={statusId}
              options={learnerAdmin.statusOptions}
              onChange={setStatusId}
            />
          </div>
          <Button variant="primary" className={styles.searchButton} onClick={() => {}}>
            検索
          </Button>
        </div>

        <DataTableHeader style={{ gridTemplateColumns: LEARNER_COLUMNS }}>
          <DataTableCell>ユーザー名</DataTableCell>
          <DataTableCell>メールアドレス</DataTableCell>
          <DataTableCell>母語</DataTableCell>
          <DataTableCell>登録日</DataTableCell>
          <DataTableCell>学習の進み具合</DataTableCell>
          <DataTableCell>最終学習日</DataTableCell>
          <DataTableCell>状態</DataTableCell>
        </DataTableHeader>
        {learnerAdmin.learners.map((learner) => (
          <DataTableRow key={learner.id} style={{ gridTemplateColumns: LEARNER_COLUMNS }}>
            <DataTableCell className={styles.nameCell}>{learner.name}</DataTableCell>
            <DataTableCell>{learner.email}</DataTableCell>
            <DataTableCell>{learner.nativeLanguage}</DataTableCell>
            <DataTableCell>{formatYearMonthDay(learner.registeredOn)}</DataTableCell>
            <DataTableCell className={styles.progressCell}>
              <ProgressBar variant="fixed" rate={learner.progressRate} />
              <span className={styles.percent}>{learner.progressRate}%</span>
            </DataTableCell>
            <DataTableCell>{formatMonthDay(learner.lastStudiedOn)}</DataTableCell>
            <DataTableCell>
              {learner.status === "active" || learner.status === "suspended" ? (
                <StatusBadge tone={learner.status} />
              ) : null}
            </DataTableCell>
          </DataTableRow>
        ))}
        <ListCount count={learnerAdmin.learners.length} className={styles.count} />
      </Card>
    </div>
  );
}
