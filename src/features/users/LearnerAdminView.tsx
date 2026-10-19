"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import styles from "./LearnerAdminView.module.css";

function statusBadge(status: string) {
  if (status === "active") {
    return { label: "利用中", className: styles.badgeActive };
  }
  if (status === "suspended") {
    return { label: "停止中", className: styles.badgeSuspended };
  }
  return null;
}

export function LearnerAdminView() {
  const learnerAdmin = useAppSelector((state) => state.learnerAdmin);
  const [searchText, setSearchText] = useState("");
  const [nativeLanguageId, setNativeLanguageId] = useState(learnerAdmin.selectedNativeLanguageId);
  const [statusId, setStatusId] = useState(learnerAdmin.selectedStatusId);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{learnerAdmin.title}</h1>
          <p className={styles.description}>{learnerAdmin.description}</p>
        </div>
        {learnerAdmin.showSampleDataBadge ? <p className={styles.sampleBadge}>サンプルデータ</p> : null}
      </header>

      <section className={styles.listCard}>
        <h2 className={styles.listHeading}>学習者一覧</h2>
        <div className={styles.filters}>
          <div className={styles.filterSearch}>
            <label className={styles.label} htmlFor="WELG0140-search">
              検索
            </label>
            <input
              id="WELG0140-search"
              className={styles.searchInput}
              type="text"
              value={searchText}
              placeholder={learnerAdmin.searchPlaceholder}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
          </div>
          <div className={styles.filterNative}>
            <label className={styles.label} htmlFor="WELG0140-native-language">
              母語
            </label>
            <select
              id="WELG0140-native-language"
              className={styles.select}
              value={nativeLanguageId}
              onChange={(event) => {
                setNativeLanguageId(event.target.value);
              }}
            >
              {learnerAdmin.nativeLanguageOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterStatus}>
            <label className={styles.label} htmlFor="WELG0140-status">
              状態
            </label>
            <select
              id="WELG0140-status"
              className={styles.select}
              value={statusId}
              onChange={(event) => {
                setStatusId(event.target.value);
              }}
            >
              {learnerAdmin.statusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className={styles.searchButton}>
            検索
          </button>
        </div>

        <div className={styles.table}>
          <div className={styles.headRow}>
            <span className={styles.cell}>ユーザー名</span>
            <span className={styles.cell}>メールアドレス</span>
            <span className={styles.cell}>母語</span>
            <span className={styles.cell}>登録日</span>
            <span className={styles.cell}>学習の進み具合</span>
            <span className={styles.cell}>最終学習日</span>
            <span className={styles.cell}>状態</span>
          </div>
          {learnerAdmin.learners.map((learner) => {
            const badge = statusBadge(learner.status);
            return (
              <div key={learner.id} className={styles.dataRow}>
                <span className={`${styles.cell} ${styles.nameCell}`}>{learner.name}</span>
                <span className={styles.cell}>{learner.email}</span>
                <span className={styles.cell}>{learner.nativeLanguage}</span>
                <span className={styles.cell}>{learner.registeredOn}</span>
                <span className={styles.progressCell}>
                  <span className={styles.track}>
                    <span className={styles.fill} style={{ width: `${learner.progressRate}%` }} />
                  </span>
                  <span className={styles.percent}>{learner.progressRate}%</span>
                </span>
                <span className={styles.cell}>{learner.lastStudiedOn}</span>
                <span className={styles.cell}>
                  {badge ? <span className={`${styles.statusBadge} ${badge.className}`}>{badge.label}</span> : null}
                </span>
              </div>
            );
          })}
        </div>
        {learnerAdmin.learners.length > 0 ? (
          <p className={styles.count}>1〜{learnerAdmin.learners.length}件を表示</p>
        ) : null}
      </section>
    </div>
  );
}
